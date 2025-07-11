import { useColorScheme } from "@/src/hooks/useColorScheme";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ThemeProvider
				value={DefaultTheme}
				// value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
			>
				<Stack>
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
				</Stack>
				<StatusBar style="auto" />
			</ThemeProvider>
		</SafeAreaView>
	);
}
