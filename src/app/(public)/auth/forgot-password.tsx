import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

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
			console.error("Password reset error:", error);
			Alert.alert(
				"Error",
				"Failed to send reset instructions. Please try again.",
			);
		}
	};

	return (
		<View className="flex-1 p-5 bg-background items-center justify-center">
			<Text className="text-2xl font-bold mb-2.5 text-foreground">
				Forgot Password
			</Text>
			<Text className="text-base text-muted-foreground text-center mb-7.5">
				Enter your email address to reset your password
			</Text>

			<TextInput
				className="w-full h-12 border border-border rounded-lg px-4 mb-5 text-base text-foreground bg-background"
				placeholder="Enter your email"
				placeholderTextColor="#999"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>

			<TouchableOpacity
				className="w-full h-12 bg-primary rounded-lg items-center justify-center"
				onPress={handleResetPassword}
			>
				<Text className="text-primary-foreground text-base font-semibold">
					Reset Password
				</Text>
			</TouchableOpacity>
		</View>
	);
}
