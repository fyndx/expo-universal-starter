import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { authClient } from "@/src/lib/auth-client";
import { useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		await authClient.signIn.email({
			email,
			password,
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.form}>
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
				<Button onPress={handleLogin}>{"Sign In"}</Button>
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
}));
