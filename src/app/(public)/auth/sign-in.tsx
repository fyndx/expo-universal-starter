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
import { Text } from "~/components/ui/text";
import { toast } from "~/lib/sonner/sonner";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const handleLogin = async () => {
		try {
			setIsLoading(true);
			const { data, error } = await authClient.signIn.email({
				email,
				password,
			});

			if (error) {
				toast.error(`Login failed: ${error.message}`, {
					position: "bottom-center",
				});
				return;
			}
			router.replace("/home");
		} catch (error) {
			// TODO: Handle unexpected errors
			console.error("Login error:", error);
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
							<CardTitle>Login to your account</CardTitle>
							<CardDescription>
								Enter your email and password to sign in.
							</CardDescription>
						</CardHeader>
						<CardContent className="gap-4">
							<Input
								id={"email"}
								placeholder="Email"
								value={email}
								onChangeText={setEmail}
							/>
							<Input
								id={"password"}
								placeholder="Password"
								value={password}
								onChangeText={setPassword}
								secureTextEntry={true}
							/>
							{/* Forgot Password */}
							<Link href="/(public)/auth/forgot-password">
								<Text className="mt-2 text-right text-sm text-muted-foreground self-end hover:underline hover:text-primary">
									Forgot Password?
								</Text>
							</Link>
						</CardContent>
						<CardFooter>
							<Button
								onPress={handleLogin}
								className="flex-1 flex-row items-center gap-4"
							>
								{isLoading && <ActivityIndicator />}
								<Text>{isLoading ? "Signing In..." : "Sign In"}</Text>
							</Button>
						</CardFooter>
						{/* Sign Up Option */}
						<View className="p-6 pt-0">
							<View className="flex-row justify-center items-center">
								<Text className="text-sm text-muted-foreground">
									Don't have an account?{" "}
								</Text>
								<Link href="/(public)/auth/sign-up">
									<Text className="text-sm text-primary hover:underline font-medium">
										Sign up
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
