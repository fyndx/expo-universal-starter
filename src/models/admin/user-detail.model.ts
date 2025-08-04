import { toast } from "~/lib/sonner/sonner";
import { UserModel, type User, ROLE_OPTIONS } from "./user-detail/user.model";
import { SessionModel, type Session } from "./user-detail/session.model";
import { ModerationModel, BAN_DURATIONS } from "./user-detail/moderation.model";
import { EmailModel } from "./user-detail/email.model";
import { FormModel } from "./user-detail/form.model";

// Re-export types and constants for backward compatibility
export type { User, Session };
export { ROLE_OPTIONS, BAN_DURATIONS };

/**
 * UserDetailModel - Refactored to use composition of focused models
 * Handles user management operations for admin interface
 */
export class UserDetailModel {
	// Composed models for different concerns
	public userModel: UserModel;
	public sessionModel: SessionModel;
	public moderationModel: ModerationModel;
	public emailModel: EmailModel;
	public formModel: FormModel;

	constructor() {
		// Initialize composed models
		this.userModel = new UserModel();
		this.sessionModel = new SessionModel();
		this.moderationModel = new ModerationModel();
		this.emailModel = new EmailModel();
		this.formModel = new FormModel();
	}

	// =============================================================================
	// DATA FETCHING METHODS (delegate to userModel and sessionModel)
	// =============================================================================

	async fetchUserById({ id }: { id: string }): Promise<void> {
		await this.userModel.fetchUserById({ id });
		const user = this.userModel.obs.user.peek();
		if (user) {
			this.formModel.initializeFormData(user);
		}
	}

	async fetchUserSessionsById({ id }: { id: string }): Promise<void> {
		await this.sessionModel.fetchUserSessionsById({ id });
	}

	// =============================================================================
	// UI STATE METHODS (delegate to appropriate models)
	// =============================================================================

	setBanUserOpen(open: boolean): void {
		this.moderationModel.setBanUserOpen(open);
	}

	setDeleteUserOpen(open: boolean): void {
		this.moderationModel.setDeleteUserOpen(open);
	}

	// =============================================================================
	// FORM STATE METHODS (delegate to appropriate models)
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
		// Split updates between form and moderation models
		const formUpdates: Partial<{ name: string; email: string; role: string }> = {};
		const banFormUpdates: Partial<{ banReason: string; banDuration: string }> = {};

		if (updates.name !== undefined) formUpdates.name = updates.name;
		if (updates.email !== undefined) formUpdates.email = updates.email;
		if (updates.role !== undefined) formUpdates.role = updates.role;
		if (updates.banReason !== undefined) banFormUpdates.banReason = updates.banReason;
		if (updates.banDuration !== undefined) banFormUpdates.banDuration = updates.banDuration;

		if (Object.keys(formUpdates).length > 0) {
			this.formModel.setFormData(formUpdates);
		}
		if (Object.keys(banFormUpdates).length > 0) {
			this.moderationModel.setBanFormData(banFormUpdates);
		}
	}

	initializeFormData(user: User): void {
		this.formModel.initializeFormData(user);
	}

	// =============================================================================
	// ACTION HANDLERS (coordinate between models)
	// =============================================================================

	async handleBanUser(): Promise<void> {
		const user = this.userModel.obs.user.peek();
		if (!user?.id) return;

		await this.moderationModel.banUser({ userId: user.id });
		// Refresh user data after ban
		if (this.moderationModel.obs.banStatus.peek() === "success") {
			await this.userModel.fetchUserById({ id: user.id });
		}
	}

	async handleUnbanUser(): Promise<void> {
		const user = this.userModel.obs.user.peek();
		if (!user?.id) return;

		await this.moderationModel.unbanUser({ userId: user.id });
		// Refresh user data after unban
		if (this.moderationModel.obs.banStatus.peek() === "success") {
			await this.userModel.fetchUserById({ id: user.id });
		}
	}

	async handleDeleteUser(): Promise<void> {
		const user = this.userModel.obs.user.peek();
		if (!user?.id) return;

		await this.moderationModel.deleteUser({ userId: user.id });
		this.moderationModel.setDeleteUserOpen(false);
	}

	async handleSessionRevoke({
		userId,
		sessionId,
	}: {
		userId: string;
		sessionId: string;
	}): Promise<void> {
		await this.sessionModel.revokeSingleSession({ userId, sessionId });
	}

	async handleAllSessionsRevoke({ userId }: { userId: string }): Promise<void> {
		await this.sessionModel.revokeAllSessions({ userId });
	}

	async handleResendVerification(): Promise<void> {
		const user = this.userModel.obs.user.peek();
		if (user?.email) {
			await this.emailModel.resendVerificationEmail({ email: user.email });
		}
	}

	async handleResetPassword(): Promise<void> {
		const user = this.userModel.obs.user.peek();
		if (user?.email) {
			await this.emailModel.resetPassword({ email: user.email });
		}
	}

	async handleSaveChanges(): Promise<void> {
		const user = this.userModel.obs.user.peek();
		if (!user?.id) return;

		const changes = this.formModel.getChanges(user);

		if (!changes.hasNameChange && !changes.hasEmailChange && !changes.hasRoleChange) {
			toast.info("No changes to save");
			return;
		}

		this.userModel.obs.saveStatus.set("loading");
		try {
			// Update user data if there are user field changes
			if (changes.hasNameChange || changes.hasEmailChange) {
				await this.userModel.updateUser({ 
					userId: user.id, 
					updates: changes.userUpdates 
				});
			}

			// Update role if changed
			if (changes.hasRoleChange && changes.newRole) {
				await this.userModel.updateUserRole({ 
					userId: user.id, 
					role: changes.newRole 
				});
			}

			this.userModel.obs.saveStatus.set("success");
		} catch (_error) {
			this.userModel.obs.saveStatus.set("error");
		}
	}
}
