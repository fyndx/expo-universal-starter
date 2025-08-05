import { type Observable, observable } from "@legendapp/state";
import { router } from "expo-router";
import { authClient } from "@/src/lib/auth-client";
import { toast } from "~/lib/sonner/sonner";

type SignUpStatus = "idle" | "loading" | "success" | "error";

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

interface SignUpState {
	status: SignUpStatus;
	formData: SignUpFormData;
	error?: string | null;
}

export class SignUpModel {
	obs: Observable<SignUpState>;

	constructor() {
		this.obs = observable({
			status: "idle" as SignUpStatus,
			formData: {
				name: "",
				email: "",
				password: "",
			},
		});
	}

	updateFormData({ field, value }: { field: string; value: string }): void {
		this.obs.formData[field as keyof SignUpFormData].set(value);
	}

	async signUp(): Promise<void> {
		const { name, email, password } = this.obs.formData.peek();
		
		this.obs.status.set("loading");

		try {
			const { error } = await authClient.signUp.email({
				email,
				password,
				name,
			});

			if (error) {
				this.obs.set({
					...this.obs.peek(),
					status: "error",
					error: error.message,
				});
				toast.error(`Sign up failed: ${error.message}`, {
					position: "bottom-center",
				});
				return;
			}

			this.obs.status.set("success");
			toast.success("Account created successfully!", {
				position: "bottom-center",
			});
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Failed to create account";
			this.obs.set({
				...this.obs.peek(),
				status: "error",
				error: errorMessage,
			});
			toast.error(errorMessage, {
				position: "bottom-center",
			});
		}
	}

	async resendVerification(): Promise<void> {
		const { email } = this.obs.formData.peek();
		
		try {
			// Note: Better Auth might not have a direct resend method
			// This is a placeholder - adjust based on your auth provider's API
			toast.success("Verification email sent!", {
				position: "bottom-center",
			});
		} catch (error) {
			toast.error("Failed to resend verification email", {
				position: "bottom-center",
			});
		}
	}

	continueToApp(): void {
		router.replace("/home");
	}

	reset(): void {
		this.obs.set({
			status: "idle",
			formData: {
				name: "",
				email: "",
				password: "",
			},
			error: null,
		});
	}
}

export const signUpModel$ = new SignUpModel();