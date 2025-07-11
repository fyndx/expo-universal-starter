import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="sign-in" />
				<Stack.Screen name="sign-up" />
			</Stack>
		</SafeAreaView>
	);
}
