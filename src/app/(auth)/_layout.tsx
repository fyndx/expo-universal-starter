import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Stack>
				<Stack.Screen
					name="sign-in"
					options={{ title: "Sign In", headerShown: false }}
				/>
				<Stack.Screen
					name="sign-up"
					options={{ title: "Sign Up", headerShown: false }}
				/>
			</Stack>
		</SafeAreaView>
	);
}
