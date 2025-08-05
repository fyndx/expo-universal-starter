import { authClient } from "@/src/lib/auth-client";
import { Link, useRouter } from "expo-router";
import { MotiView } from "moti";
import { useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "~/components/ui/activity-indicator";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { PasswordInput } from "~/components/ui/password";
import { Text } from "~/components/ui/text";
import { toast } from "~/lib/sonner/sonner";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const handleSignUp = async () => {
		try {
			setIsLoading(true);
			const { data, error } = await authClient.signUp.email({
				email,
				password,
				name,
			});

			if (error) {
				toast.error(`Sign up failed: ${error.message}`, {
					position: "bottom-center",
				});
				return;
			}

			toast.success("Account created successfully!", {
				position: "bottom-center",
			});
			router.replace("/home");
		} catch (error) {
			// TODO: Handle unexpected errors
			console.error("Sign up error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View className="flex-1 justify-center items-center">
			<View className="w-full max-w-sm">
				<MotiView
					from={{ opacity: 0, translateY: -20 }}
					animate={{ opacity: 1, translateY: 0 }}
					transition={{ type: "timing", duration: 300 }}
				>
					<Card>
						<CardHeader>
							<CardTitle>Create an account</CardTitle>
							<CardDescription>
								Enter your details to create a new account.
							</CardDescription>
						</CardHeader>
						<CardContent className="gap-4">
							<Input
								id={"name"}
								placeholder="Full Name"
								value={name}
								onChangeText={setName}
							/>
							<Input
								id={"email"}
								placeholder="Email"
								value={email}
								onChangeText={setEmail}
							/>
							<PasswordInput
								id={"password"}
								placeholder="Password"
								value={password}
								onChangeText={setPassword}
							/>
						</CardContent>
						<CardFooter>
							<Button
								onPress={handleSignUp}
								className="flex-1 flex-row items-center gap-4"
							>
								{isLoading && <ActivityIndicator />}
								<Text>{isLoading ? "Creating Account..." : "Sign Up"}</Text>
							</Button>
						</CardFooter>
						{/* Sign In Option */}
						<View className="p-6 pt-0">
							<View className="flex-row justify-center items-center">
								<Text className="text-sm text-muted-foreground">
									Already have an account?{" "}
								</Text>
								<Link href="/(public)/auth/sign-in">
									<Text className="text-sm text-primary hover:underline font-medium">
										Sign in
									</Text>
								</Link>
							</View>
						</View>
					</Card>
				</MotiView>
			</View>
		</View>
	);
}
