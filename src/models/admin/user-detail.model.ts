import { type Observable, observable } from "@legendapp/state";
import type {
	Session as BetterAuthSession,
	User as BetterAuthUser,
} from "better-auth/types";
import { router } from "expo-router";
import { authClient } from "~/lib/auth-client";
import { toast } from "~/lib/sonner/sonner";
import type { ApiStatus } from "~/utils/api";

// Role options for user management
export const ROLE_OPTIONS = [
	{ label: "User", value: "user" },
	{ label: "Admin", value: "admin" },
];

// Ban duration options in days
export const BAN_DURATIONS = [
	{ label: "1 day", value: "1" },
	{ label: "3 days", value: "3" },
	{ label: "7 days", value: "7" },
	{ label: "14 days", value: "14" },
	{ label: "30 days", value: "30" },
	{ label: "90 days", value: "90" },
	{ label: "Permanent", value: "permanent" },
];

// Extended user interface with admin-specific fields
export interface User extends BetterAuthUser {
	banned?: boolean;
	banReason?: string;
	banExpires?: string;
	lastLogin?: string;
	role?: string;
}

// Extended session type to include additional fields from Better Auth
interface ExtendedBetterAuthSession extends BetterAuthSession {
	userAgent?: string;
	ipAddress?: string;
}

// Extended session interface with display fields
export interface Session extends BetterAuthSession {
	device?: string;
	location?: string;
	lastActive?: string;
	current?: boolean;
	expired?: boolean;
}

/**
 * UserDetailModel handles user management operations for admin interface
 * Manages user data, sessions, and form state
 */
export class UserDetailModel {
	obs: Observable<{
		// Data state
		status: ApiStatus;
		user?: User | null;
		sessions: Session[];
		sessionsStatus: ApiStatus;
		error?: string | null;

		// Update operations status
		updateStatus: ApiStatus;

		// Email operations status
		resendVerificationStatus: ApiStatus;
		resetPasswordStatus: ApiStatus;

		// Session operations status
		revokeSessionStatus: ApiStatus;
		revokeAllSessionsStatus: ApiStatus;

		// UI state for modals
		banUserOpen: boolean;
		deleteUserOpen: boolean;
	}>;

	// Form data observable for all form fields
	formData$: Observable<{
		name: string;
		email: string;
		role: string;
		banReason: string;
		banDuration: string;
	}>;

	constructor() {
		this.obs = observable({
			// Data state
			status: "idle" as ApiStatus,
			user: null as User | null,
			sessions: [] as Session[],
			sessionsStatus: "idle" as ApiStatus,
			error: null as string | null,

			// Update operations status
			updateStatus: "idle" as ApiStatus,

			// Email operations status
			resendVerificationStatus: "idle" as ApiStatus,
			resetPasswordStatus: "idle" as ApiStatus,

			// Session operations status
			revokeSessionStatus: "idle" as ApiStatus,
			revokeAllSessionsStatus: "idle" as ApiStatus,

			// UI state for modals only
			banUserOpen: false,
			deleteUserOpen: false,
		});

		this.formData$ = observable({
			name: "",
			email: "",
			role: "user",
			banReason: "",
			banDuration: "",
		});
	}

	// =============================================================================
	// DATA FETCHING METHODS
	// =============================================================================

	/**
	 * Fetches user data by ID
	 */
	async fetchUserById({ id }: { id: string }): Promise<void> {
		this.obs.status.set("loading");
		this.obs.error.set(null);

		try {
			const { data, error } = await authClient.admin.listUsers({
				query: {
					filterField: "id",
					filterValue: id,
					filterOperator: "eq",
					limit: 1,
				},
			});

			if (error) {
				throw new Error(error.message);
			}

			const user = data?.users?.[0];
			if (!user) {
				throw new Error("User not found");
			}

			this.obs.status.set("success");
			this.obs.user.set(user as User);
			this.initializeFormData(user as User);
		} catch (error) {
			const errorMessage = this.getErrorMessage(error, "Failed to fetch user");
			this.obs.status.set("error");
			this.obs.user.set(null);
			this.obs.error.set(errorMessage);
			toast.error(errorMessage);
		}
	}

	/**
	 * Fetches user sessions by user ID
	 */
	async fetchUserSessionsById({ id }: { id: string }): Promise<void> {
		this.obs.sessionsStatus.set("loading");

		try {
			const { data, error } = await authClient.admin.listUserSessions({
				userId: id,
			});

			if (error) {
				throw new Error(error.message || "Failed to fetch user sessions");
			}

			const sessions: Session[] = this.transformSessions(data?.sessions || []);
			this.obs.sessions.set(sessions);
			this.obs.sessionsStatus.set("success");
		} catch (error) {
			const errorMessage = this.getErrorMessage(
				error,
				"Failed to load sessions",
			);
			this.obs.sessionsStatus.set("error");
			this.obs.error.set(errorMessage);
			toast.error(errorMessage);
		}
	}

	// =============================================================================
	// USER MANAGEMENT METHODS
	// =============================================================================

	/**
	 * Updates user data
	 */
	async updateUser({
		userId,
		updates,
	}: {
		userId: string;
		updates: Partial<User>;
	}): Promise<void> {
		try {
			const { error } = await authClient.admin.updateUser({
				userId,
				data: updates,
			});

			if (error) {
				throw new Error(error.message);
			}

			await this.fetchUserById({ id: userId });
			toast.success("User updated successfully");
		} catch (error) {
			const errorMessage = this.getErrorMessage(error, "Failed to update user");
			toast.error(errorMessage);
			throw error;
		}
	}

	/**
	 * Updates user role
	 */
	async updateUserRole({
		userId,
		role,
	}: {
		userId: string;
		role: string;
	}): Promise<void> {
		try {
			const { error } = await authClient.admin.setRole({
				userId,
				role: role as "user" | "admin",
			});

			if (error) {
				throw new Error(error.message);
			}

			await this.fetchUserById({ id: userId });
			toast.success("User role updated successfully");
		} catch (error) {
			const errorMessage = this.getErrorMessage(
				error,
				"Failed to update user role",
			);
			toast.error(errorMessage);
			throw error;
		}
	}

	/**
	 * Deletes user using Better Auth removeUser API
	 */
	async deleteUser({ userId }: { userId: string }): Promise<void> {
		try {
			const { error } = await authClient.admin.removeUser({
				userId,
			});

			if (error) {
				throw new Error(error.message);
			}

			toast.success("User deleted successfully");
			router.back();
		} catch (error) {
			const errorMessage = this.getErrorMessage(error, "Failed to delete user");
			toast.error(errorMessage);
			throw error;
		}
	}

	// =============================================================================
	// SESSION MANAGEMENT METHODS
	// =============================================================================

	/**
	 * Revokes a specific user session
	 */
	async revokeSingleSession({
		userId,
		sessionId,
	}: {
		userId: string;
		sessionId: string;
	}): Promise<void> {
		this.obs.revokeSessionStatus.set("loading");

		try {
			const { error } = await authClient.admin.revokeUserSession({
				sessionToken: sessionId,
			});

			if (error) {
				throw new Error(error.message);
			}

			this.obs.revokeSessionStatus.set("success");
			await this.fetchUserSessionsById({ id: userId });
			toast.success("Session revoked successfully");
		} catch (error) {
			const errorMessage = this.getErrorMessage(
				error,
				"Failed to revoke session",
			);
			this.obs.revokeSessionStatus.set("error");
			toast.error(errorMessage);
			throw error;
		}
	}

	/**
	 * Revokes all user sessions
	 */
	async revokeAllSessions({ userId }: { userId: string }): Promise<void> {
		this.obs.revokeAllSessionsStatus.set("loading");

		try {
			const { error } = await authClient.admin.revokeUserSessions({
				userId,
			});

			if (error) {
				throw new Error(error.message);
			}

			this.obs.revokeAllSessionsStatus.set("success");
			await this.fetchUserSessionsById({ id: userId });
			toast.success("All sessions revoked successfully");
		} catch (error) {
			const errorMessage = this.getErrorMessage(
				error,
				"Failed to revoke all sessions",
			);
			this.obs.revokeAllSessionsStatus.set("error");
			toast.error(errorMessage);
			throw error;
		}
	}

	// =============================================================================
	// EMAIL METHODS
	// =============================================================================

	/**
	 * Resends verification email
	 */
	async resendVerificationEmail({ email }: { email: string }): Promise<void> {
		this.obs.resendVerificationStatus.set("loading");

		try {
			const { error } = await authClient.sendVerificationEmail({ email });

			if (error) {
				throw new Error(error.message);
			}

			this.obs.resendVerificationStatus.set("success");
			toast.success("Verification email sent successfully");
		} catch (error) {
			const errorMessage = this.getErrorMessage(
				error,
				"Failed to send verification email",
			);
			this.obs.resendVerificationStatus.set("error");
			toast.error(errorMessage);
		}
	}

	/**
	 * Sends password reset email
	 */
	async resetPassword({ email }: { email: string }): Promise<void> {
		this.obs.resetPasswordStatus.set("loading");

		try {
			const { error } = await authClient.forgetPassword({ email });

			if (error) {
				throw new Error(error.message);
			}

			this.obs.resetPasswordStatus.set("success");
			toast.success("Password reset email sent successfully");
		} catch (error) {
			const errorMessage = this.getErrorMessage(
				error,
				"Failed to send password reset email",
			);
			this.obs.resetPasswordStatus.set("error");
			toast.error(errorMessage);
		}
	}

	// =============================================================================
	// UI STATE METHODS
	// =============================================================================

	setBanUserOpen(open: boolean): void {
		this.obs.banUserOpen.set(open);
	}

	setDeleteUserOpen(open: boolean): void {
		this.obs.deleteUserOpen.set(open);
	}

	// =============================================================================
	// FORM STATE METHODS
	// =============================================================================

	setFormData(
		updates: Partial<{
			name: string;
			email: string;
			role: string;
			banReason: string;
			banDuration: string;
		}>,
	): void {
		this.formData$.assign(updates);
	}

	/**
	 * Initializes form data when user is loaded
	 */
	initializeFormData(user: User): void {
		this.formData$.set({
			name: user.name || "",
			email: user.email,
			role: user.role || "user",
			banReason: "",
			banDuration: "",
		});
	}

	// =============================================================================
	// ACTION HANDLERS
	// =============================================================================

	/**
	 * Handles user ban form submission
	 */
	async handleBanUser(): Promise<void> {
		const { banReason, banDuration } = this.formData$.peek();
		const { user } = this.obs.peek();
		if (!banReason.trim() || !user?.id) {
			return;
		}

		this.obs.updateStatus.set("loading");
		try {
			let banExpiresIn: number | undefined;

			if (banDuration && banDuration !== "permanent") {
				const days = parseInt(banDuration);
				banExpiresIn = 60 * 60 * 24 * days; // Convert days to seconds
			}

			const { error } = await authClient.admin.banUser({
				userId: user.id,
				banReason: banReason.trim(),
				...(banExpiresIn && { banExpiresIn }),
			});

			if (error) {
				throw new Error(error.message);
			}

			await this.fetchUserById({ id: user.id });
			this.resetBanForm();
			this.obs.updateStatus.set("success");
			toast.success("User banned successfully");
		} catch (error) {
			const errorMessage = this.getErrorMessage(error, "Failed to ban user");
			this.obs.updateStatus.set("error");
			toast.error(errorMessage);
		}
	}

	/**
	 * Handles user unban action
	 */
	async handleUnbanUser(): Promise<void> {
		const { user } = this.obs.peek();
		if (!user?.id) return;

		this.obs.updateStatus.set("loading");
		try {
			const { error } = await authClient.admin.unbanUser({
				userId: user.id,
			});

			if (error) {
				throw new Error(error.message);
			}

			await this.fetchUserById({ id: user.id });
			this.obs.updateStatus.set("success");
			toast.success("User unbanned successfully");
		} catch (error) {
			const errorMessage = this.getErrorMessage(error, "Failed to unban user");
			this.obs.updateStatus.set("error");
			toast.error(errorMessage);
		}
	}

	/**
	 * Handles user deletion
	 */
	async handleDeleteUser(): Promise<void> {
		const { user } = this.obs.peek();
		if (!user?.id) return;

		this.obs.updateStatus.set("loading");
		try {
			await this.deleteUser({ userId: user.id });
			this.obs.deleteUserOpen.set(false);
			this.obs.updateStatus.set("success");
		} catch (_error) {
			this.obs.updateStatus.set("error");
		}
	}

	/**
	 * Handles single session revocation
	 */
	async handleSessionRevoke({
		userId,
		sessionId,
	}: {
		userId: string;
		sessionId: string;
	}): Promise<void> {
		await this.revokeSingleSession({ userId, sessionId });
	}

	/**
	 * Handles all sessions revocation
	 */
	async handleAllSessionsRevoke({ userId }: { userId: string }): Promise<void> {
		await this.revokeAllSessions({ userId });
	}

	/**
	 * Handles resend verification email
	 */
	async handleResendVerification(): Promise<void> {
		const { user } = this.obs.peek();
		if (user?.email) {
			await this.resendVerificationEmail({ email: user.email });
		}
	}

	/**
	 * Handles reset password
	 */
	async handleResetPassword(): Promise<void> {
		const { user } = this.obs.peek();
		if (user?.email) {
			await this.resetPassword({ email: user.email });
		}
	}

	/**
	 * Handles save all form changes
	 */
	async handleSaveChanges(): Promise<void> {
		const formData = this.formData$.peek();
		const { user } = this.obs.peek();
		if (!user?.id) return;

		const changes = this.getFormChanges(user, formData);

		if (changes.length === 0) {
			toast.info("No changes to save");
			return;
		}

		this.obs.updateStatus.set("loading");
		try {
			for (const change of changes) {
				await change();
			}
			this.obs.updateStatus.set("success");
		} catch (_error) {
			this.obs.updateStatus.set("error");
		}
	}

	// =============================================================================
	// UTILITY METHODS
	// =============================================================================

	/**
	 * Transforms session data from API to display format
	 */
	private transformSessions(sessions: BetterAuthSession[]): Session[] {
		const now = new Date();
		const currentSessionId = this.findCurrentSessionId(sessions);

		return sessions.map((session) => {
			const expiresAt = session.expiresAt ? new Date(session.expiresAt) : null;
			const isExpired = expiresAt ? now > expiresAt : false;
			const isCurrent = currentSessionId === session.id;

			return {
				...session,
				device: this.parseUserAgent(
					(session as ExtendedBetterAuthSession).userAgent || "",
				),
				location:
					(session as ExtendedBetterAuthSession).ipAddress ||
					"Unknown Location",
				lastActive: session.updatedAt
					? new Date(session.updatedAt).toLocaleString()
					: "Unknown",
				current: isCurrent,
				expired: isExpired,
			};
		});
	}

	/**
	 * Finds the ID of the current (most recently active and not expired) session
	 */
	private findCurrentSessionId(sessions: BetterAuthSession[]): string | null {
		if (sessions.length === 0) return null;

		const now = new Date();
		let mostRecentActiveSession: BetterAuthSession | null = null;
		let mostRecentActiveTime = 0;

		for (const session of sessions) {
			const expiresAt = session.expiresAt ? new Date(session.expiresAt) : null;
			const isExpired = expiresAt ? now > expiresAt : false;

			if (!isExpired && session.updatedAt) {
				const updateTime = new Date(session.updatedAt).getTime();
				if (updateTime > mostRecentActiveTime) {
					mostRecentActiveTime = updateTime;
					mostRecentActiveSession = session;
				}
			}
		}

		return mostRecentActiveSession?.id ?? null;
	}

	/**
	 * Parses user agent string to extract user-friendly device/browser info
	 */
	private parseUserAgent(userAgent: string): string {
		if (!userAgent) return "Unknown Device";

		// Browser detection
		let browser = "Unknown Browser";
		let os = "Unknown OS";

		// Browser patterns
		if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
			browser = "Chrome";
		} else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
			browser = "Safari";
		} else if (userAgent.includes("Firefox")) {
			browser = "Firefox";
		} else if (userAgent.includes("Edg")) {
			browser = "Edge";
		} else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
			browser = "Opera";
		}

		// OS detection
		if (userAgent.includes("Windows")) {
			os = "Windows";
		} else if (userAgent.includes("Mac OS X") || userAgent.includes("macOS")) {
			os = "macOS";
		} else if (userAgent.includes("Linux")) {
			os = "Linux";
		} else if (userAgent.includes("Android")) {
			os = "Android";
		} else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
			os = userAgent.includes("iPhone") ? "iOS" : "iPadOS";
		}

		// Mobile detection
		const isMobile =
			userAgent.includes("Mobile") ||
			userAgent.includes("Android") ||
			userAgent.includes("iPhone");
		const deviceType = isMobile ? "Mobile" : "Desktop";

		return `${browser} on ${os} (${deviceType})`;
	}

	/**
	 * Gets standardized error message
	 */
	private getErrorMessage(error: unknown, fallback: string): string {
		return error instanceof Error ? error.message : fallback;
	}

	/**
	 * Resets ban form state
	 */
	private resetBanForm(): void {
		this.obs.banUserOpen.set(false);
		this.formData$.banReason.set("");
		this.formData$.banDuration.set("");
	}

	/**
	 * Determines what changes need to be applied and returns functions to apply them
	 */
	private getFormChanges(
		user: User,
		form: {
			name: string;
			email: string;
			role: string;
			banReason: string;
			banDuration: string;
		},
	): Array<() => Promise<void>> {
		const changes: Array<() => Promise<void>> = [];

		const hasNameChange = form.name.trim() !== (user.name || "");
		const hasEmailChange = form.email.trim() !== user.email;
		const hasRoleChange = form.role !== (user.role || "user");

		if (hasNameChange || hasEmailChange) {
			changes.push(async () => {
				const updates: Partial<User> = {};

				if (hasNameChange) {
					updates.name = form.name.trim();
				}

				if (hasEmailChange) {
					updates.email = form.email.trim();
					updates.emailVerified = false;
				}

				await this.updateUser({ userId: user.id, updates });
			});
		}

		if (hasRoleChange) {
			changes.push(async () => {
				await this.updateUserRole({ userId: user.id, role: form.role });
			});
		}

		return changes;
	}
}
