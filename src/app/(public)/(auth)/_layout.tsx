import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "~/components/layouts/default/Header";

export default function AuthLayout() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header />
			{/* <Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="sign-in" />
				<Stack.Screen name="sign-up" />
			</Stack> */}
			<Slot />
		</SafeAreaView>
	);
}
