import { authClient } from "@/src/lib/auth-client";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { orpc } from "~/orpc";

export default function HomeScreen() {
	const { data: session } = authClient.useSession();

	useEffect(() => {
		async function checkHealth() {
			const healthStatus = await orpc.public.health();
			console.log({ healthStatus });
		}
		checkHealth();
	}, []);

	return (
		<SafeAreaView>
			<Pressable onPress={() => router.push(__DEV__ ? "/_sitemap" : "/")}>
				<Text>{"Open Site Map"}</Text>
			</Pressable>
			<Text>Welcome, {session?.user.email}</Text>
		</SafeAreaView>
	);
}
