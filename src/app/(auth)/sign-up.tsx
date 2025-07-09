import { Input } from "@/src/components/ui/Input";
import { authClient } from "@/src/lib/auth-client";
import { useState } from "react";
import { Button, View } from "react-native";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		await authClient.signUp.email({
			email,
			password,
			name,
		});
	};

	return (
		<View>
			<Input placeholder="Name" value={name} onChangeText={setName} />
			<Input placeholder="Email" value={email} onChangeText={setEmail} />
			<Input
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
			/>
			<Button title="Login" onPress={handleLogin} />
		</View>
	);
}
