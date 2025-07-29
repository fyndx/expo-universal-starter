import { authClient } from "@/src/lib/auth-client";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "~/components/ui/text";

export default function HomeScreen() {
	const { data: session } = authClient.useSession();

	return (
		<View>
			<Pressable onPress={() => router.push(__DEV__ ? "/_sitemap" : "/")}>
				<Text>{"Open Site Map"}</Text>
			</Pressable>
			<Text>Welcome, {session?.user.email}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
