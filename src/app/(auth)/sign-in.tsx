import { authClient } from "@/src/lib/auth-client";
import { Link, useRouter } from "expo-router";
import { MotiView } from "moti";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
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
				// TODO: Toast Error
				return;
			}
			router.replace("/");
		} catch (error) {
			// TODO: Handle unexpected errors
			console.error("Login error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.form}>
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
						<CardContent>
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
							<Link href="/forgot-password">
								<Text style={styles.forgotPassword}>Forgot Password?</Text>
							</Link>
						</CardContent>
						<CardFooter>
							<Button onPress={handleLogin} style={styles.signInButtonContent}>
								{/* {isLoading && <Spinner />} */}
								<Text>{isLoading ? "Signing In..." : "Sign In"}</Text>
							</Button>
						</CardFooter>
					</Card>
				</MotiView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// padding: theme.gap(2),
		// backgroundColor: theme.colors.background,
	},
	form: {
		width: "100%",
		maxWidth: 400,
		// gap: theme.gap(2),
	},
	forgotPassword: {
		// marginTop: theme.gap(2),
		// color: theme.colors.mutedForeground,
		textAlign: "right",
		// fontSize: theme.fontSize.sm,
		alignSelf: "flex-end",
		_web: {
			_hover: {
				textDecorationLine: "underline",
				// color: theme.colors.primary,
			},
		},
	},
	signInButtonContent: {
		flexDirection: "row",
		alignItems: "center",
		// gap: theme.gap(1),
	},
});
