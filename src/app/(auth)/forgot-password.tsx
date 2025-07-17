import { useState } from "react";
import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");

	const handleResetPassword = async () => {
		if (!email) {
			Alert.alert("Error", "Please enter your email address");
			return;
		}

		try {
			// TODO: Implement your password reset logic here
			// Example: await auth.sendPasswordResetEmail(email);
			Alert.alert(
				"Success",
				"Password reset instructions have been sent to your email",
			);
		} catch (error) {
			Alert.alert(
				"Error",
				"Failed to send reset instructions. Please try again.",
			);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Forgot Password</Text>
			<Text style={styles.subtitle}>
				Enter your email address to reset your password
			</Text>

			<TextInput
				style={styles.input}
				placeholder="Enter your email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>

			<TouchableOpacity style={styles.button} onPress={handleResetPassword}>
				<Text style={styles.buttonText}>Reset Password</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#333",
	},
	subtitle: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		marginBottom: 30,
	},
	input: {
		width: "100%",
		height: 50,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		paddingHorizontal: 15,
		marginBottom: 20,
		fontSize: 16,
	},
	button: {
		width: "100%",
		height: 50,
		backgroundColor: "#007AFF",
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
