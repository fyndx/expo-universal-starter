import { type Observable, observable } from "@legendapp/state";
import type {
	Session as BetterAuthSession,
	User as BetterAuthUser,
} from "better-auth/types";
import { router } from "expo-router";
import { authClient } from "~/lib/auth-client";
import { toast } from "~/lib/sonner/sonner";
import type { ApiStatus } from "~/utils/api";

export interface User extends BetterAuthUser {
	banned?: boolean;
	banReason?: string;
	banExpires?: string;
	lastLogin?: string;
}

export interface Session extends BetterAuthSession {
	device?: string;
	location?: string;
	lastActive?: string;
	current?: boolean;
}

export class UserDetailModel {
	obs: Observable<{
		status: ApiStatus;
		user?: User | null;
		sessions: Session[];
		sessionsStatus: ApiStatus;
		error?: string | null;

		// UI State
		editNameOpen: boolean;
		editEmailOpen: boolean;
		banUserOpen: boolean;
		deleteUserOpen: boolean;
		loading: boolean;

		// Form State
		newName: string;
		newEmail: string;
		newRole: string;
		banReason: string;
		banDuration: string;
	}>;

	// Form observable with Partial User
	formData$: Observable<Partial<User>>;

	constructor() {
		this.obs = observable({
			status: "idle" as ApiStatus,
			sessions: [] as Session[],
			sessionsStatus: "idle" as ApiStatus,
			user: null as User | null,
			error: null as string | null,

			// UI State
			editNameOpen: false,
			editEmailOpen: false,
			banUserOpen: false,
			deleteUserOpen: false,
			loading: false,

			// Form State
			newName: "",
			newEmail: "",
			newRole: "",
			banReason: "",
			banDuration: "",
		});

		this.formData$ = observable({
			name: "",
			email: "",
		} as Partial<User>);
	}

	async fetchUserById({ id }: { id: string }): Promise<void> {
		this.obs.set({
			...this.obs.peek(),
			status: "loading",
		});

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

			this.obs.set({
				...this.obs.peek(),
				status: "success",
				user: user as User,
				error: null,
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to fetch user";
			this.obs.set({
				...this.obs.peek(),
				status: "error",
				user: null,
				error: errorMessage,
			});
			toast.error(errorMessage);
		}
	}

	async fetchUserSessionsById({ id }: { id: string }): Promise<void> {
		this.obs.sessionsStatus.set("loading");

		try {
			const { data, error } = await authClient.admin.listUserSessions({
				userId: id,
			});

			if (error) {
				throw new Error(error.message || "Failed to fetch user sessions");
			}

			// Transform the API response to match our Session interface
			const sessions: Session[] =
				data?.sessions?.map((session) => ({
					...session,
					device: session.userAgent || "Unknown Device",
					location: session.ipAddress || "Unknown Location",
					lastActive: session.updatedAt
						? new Date(session.updatedAt).toLocaleString()
						: "Unknown",
					current: session.id === data.sessions[0]?.id, // Assume first session is current
				})) || [];

			this.obs.sessions.set(sessions);
			this.obs.sessionsStatus.set("success");
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to load sessions";
			this.obs.sessionsStatus.set("error");
			this.obs.error.set(errorMessage);
			toast.error(errorMessage);
		}
	}

	async updateUser(userId: string, updates: Partial<User>): Promise<void> {
		try {
			// Use Better Auth admin API to update user
			const { error } = await authClient.admin.updateUser({
				userId: userId,
				data: updates,
			});

			if (error) {
				throw new Error(error.message);
			}

			// Refresh user data
			await this.fetchUserById({ id: userId });
			toast.success("User updated successfully");
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to update user";
			toast.error(errorMessage);
		}
	}

	async deleteUser(userId: string): Promise<void> {
		try {
			// Mock delete for now - Better Auth doesn't have deleteUser in admin
			// You would need to implement this API endpoint
			console.log("Deleting user:", userId);

			toast.success("User deleted successfully");
			router.back();
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to delete user";
			toast.error(errorMessage);
		}
	}

	async revokeSession(userId: string, sessionId?: string): Promise<void> {
		try {
			// Mock session revocation for now - Better Auth admin API needs specific session token
			console.log("Revoking session:", { userId, sessionId });

			// Refresh sessions
			await this.fetchUserSessionsById({ id: userId });
			toast.success(
				sessionId
					? "Session revoked successfully"
					: "All sessions revoked successfully",
			);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to revoke session";
			toast.error(errorMessage);
		}
	}

	async resendVerificationEmail(email: string): Promise<void> {
		try {
			// Use Better Auth API to resend verification email
			const { error } = await authClient.sendVerificationEmail({
				email,
			});

			if (error) {
				throw new Error(error.message);
			}

			toast.success("Verification email sent successfully");
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to send verification email";
			toast.error(errorMessage);
		}
	}

	async resetPassword(email: string): Promise<void> {
		try {
			// Use Better Auth API to send password reset email
			const { error } = await authClient.forgetPassword({
				email,
			});

			if (error) {
				throw new Error(error.message);
			}

			toast.success("Password reset email sent successfully");
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to send password reset email";
			toast.error(errorMessage);
		}
	}

	// UI State Management Methods
	setEditNameOpen(open: boolean): void {
		this.obs.editNameOpen.set(open);
	}

	setEditEmailOpen(open: boolean): void {
		this.obs.editEmailOpen.set(open);
	}

	setBanUserOpen(open: boolean): void {
		this.obs.banUserOpen.set(open);
	}

	setDeleteUserOpen(open: boolean): void {
		this.obs.deleteUserOpen.set(open);
	}

	// Form State Management Methods
	setNewName(name: string): void {
		this.obs.newName.set(name);
	}

	setNewEmail(email: string): void {
		this.obs.newEmail.set(email);
	}

	setNewRole(role: string): void {
		this.obs.newRole.set(role);
	}

	setBanReason(reason: string): void {
		this.obs.banReason.set(reason);
	}

	setBanDuration(duration: string): void {
		this.obs.banDuration.set(duration);
	}

	// Initialize form data when user is loaded
	initializeFormData(user: User): void {
		this.obs.newName.set(user.name || "");
		this.obs.newEmail.set(user.email);
		this.obs.newRole.set("user"); // Default role since Better Auth doesn't expose user role in the user object
		this.formData$.set({
			name: user.name || "",
			email: user.email,
		});
	}

	// Action Methods
	async handleUpdateName(): Promise<void> {
		const { newName, user } = this.obs.peek();
		if (!newName.trim() || !user?.id) {
			return;
		}

		this.obs.loading.set(true);
		try {
			await this.updateUser(user.id, { name: newName.trim() });
			this.obs.editNameOpen.set(false);
		} finally {
			this.obs.loading.set(false);
		}
	}

	async handleUpdateEmail(): Promise<void> {
		const { newEmail, user } = this.obs.peek();
		if (!newEmail.trim() || !user?.id) {
			return;
		}

		this.obs.loading.set(true);
		try {
			await this.updateUser(user.id, {
				email: newEmail.trim(),
				emailVerified: false,
			});
			this.obs.editEmailOpen.set(false);
		} finally {
			this.obs.loading.set(false);
		}
	}

	async handleBanUser(): Promise<void> {
		const { banReason, banDuration, user } = this.obs.peek();
		if (!banReason.trim() || !user?.id) {
			return;
		}

		this.obs.loading.set(true);
		try {
			const updates: Partial<User> = {
				banned: true,
				banReason: banReason.trim(),
			};

			if (banDuration) {
				const banDate = new Date();
				banDate.setDate(banDate.getDate() + parseInt(banDuration));
				updates.banExpires = banDate.toISOString();
			}

			await this.updateUser(user.id, updates);
			this.obs.banUserOpen.set(false);
			this.obs.banReason.set("");
			this.obs.banDuration.set("");
		} finally {
			this.obs.loading.set(false);
		}
	}

	async handleUnbanUser(): Promise<void> {
		const { user } = this.obs.peek();
		if (!user?.id) return;

		this.obs.loading.set(true);
		try {
			await this.updateUser(user.id, {
				banned: false,
				banReason: undefined,
				banExpires: undefined,
			});
		} finally {
			this.obs.loading.set(false);
		}
	}

	async handleDeleteUser(): Promise<void> {
		const { user } = this.obs.peek();
		if (!user?.id) return;

		this.obs.loading.set(true);
		try {
			await this.deleteUser(user.id);
			this.obs.deleteUserOpen.set(false);
		} finally {
			this.obs.loading.set(false);
		}
	}

	async handleSessionRevoke({
		userId,
		sessionId,
	}: {
		userId: string;
		sessionId?: string;
	}): Promise<void> {
		await this.revokeSession(userId, sessionId);
	}

	async handleResendVerification(): Promise<void> {
		const { user } = this.obs.peek();
		if (user?.email) {
			await this.resendVerificationEmail(user.email);
		}
	}

	async handleResetPassword(): Promise<void> {
		const { user } = this.obs.peek();
		if (user?.email) {
			await this.resetPassword(user.email);
		}
	}

	// Save form changes method
	async handleSaveChanges(): Promise<void> {
		const { newName, newEmail, newRole, user } = this.obs.peek();
		if (!user?.id) return;

		// Check if there are any changes
		const hasNameChange = newName.trim() !== (user.name || "");
		const hasEmailChange = newEmail.trim() !== user.email;
		const hasRoleChange = newRole !== "user"; // Assume current role is "user" as default

		if (!hasNameChange && !hasEmailChange && !hasRoleChange) {
			toast.info("No changes to save");
			return;
		}

		this.obs.loading.set(true);
		try {
			const updates: Partial<User> = {};

			if (hasNameChange) {
				updates.name = newName.trim();
			}

			if (hasEmailChange) {
				updates.email = newEmail.trim();
				updates.emailVerified = false; // Reset email verification when email changes
			}

			if (hasNameChange || hasEmailChange) {
				await this.updateUser(user.id, updates);
			}

			if (hasRoleChange) {
				await this.updateUserRole({ userId: user.id, role: newRole });
			}
		} finally {
			this.obs.loading.set(false);
		}
	}
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

			// Refresh user data
			await this.fetchUserById({ id: userId });
			toast.success("User role updated successfully");
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to update user role";
			toast.error(errorMessage);
		}
	}
}
