import { Button } from "@/src/components/ui/Button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import { authClient } from "@/src/lib/auth-client";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	const handleLogin = async () => {
		try {
			const { data, error } = await authClient.signIn.email({
				email,
				password,
			});

			if (error) {
				// TODO: Toast Error
				return;
			}
			router.replace("/");
		} catch (error) {}
	};

	return (
		<View style={styles.container}>
			<View style={styles.form}>
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
						<Button onPress={handleLogin}>{"Sign In"}</Button>
					</CardFooter>
				</Card>
			</View>
		</View>
	);
}

const styles = StyleSheet.create((theme, rt) => ({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: theme.gap(2),
		backgroundColor: theme.colors.background,
	},
	form: {
		width: "100%",
		maxWidth: 400,
		gap: theme.gap(2),
	},
	forgotPassword: {
		marginTop: theme.gap(2),
		color: theme.colors.mutedForeground,
		textAlign: "right",
		fontSize: theme.fontSize.sm,
		alignSelf: "flex-end",
		_web: {
			_hover: {
				textDecorationLine: "underline",
				color: theme.colors.primary,
			},
		},
	},
}));
