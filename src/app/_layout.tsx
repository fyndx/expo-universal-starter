import "react-native-reanimated";
import "../../global.css";

import { useIsomorphicLayoutEffect } from "@/src/hooks/useIsomorphicLayout";
import { Toaster } from "@/src/lib/sonner/sonner";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useLayoutEffect } from "react";
import { Appearance, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "~/components/ui/bottom-sheet";
import { useAppSetup } from "~/hooks/useAppSetup";
import { setAndroidNavigationBar } from "../lib/android-navigation-bar";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

const usePlatformSpecificSetup = Platform.select({
	web: useSetWebBackgroundClassName,
	android: useSetAndroidNavigationBar,
	default: noop,
});

export default function RootLayout() {
	usePlatformSpecificSetup();
	const { ready, theme, statusBarStyle } = useAppSetup();

	if (!ready) {
		// Wait for fonts and stored color scheme to load
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
				<ThemeProvider value={theme}>
					<BottomSheetModalProvider>
						<Stack>
							<Stack.Screen
								name="(protected)"
								options={{ headerShown: false }}
							/>
							<Stack.Screen name="(public)" options={{ headerShown: false }} />
							<Stack.Screen
								name="(public)/(auth)"
								options={{ headerShown: false }}
							/>
							<Stack.Screen name="index" options={{ headerShown: false }} />
							<Stack.Screen name="(common)" options={{ headerShown: false }} />
							<Stack.Screen name="+not-found" />
						</Stack>
					</BottomSheetModalProvider>
					<StatusBar style={statusBarStyle} />
					<Toaster />
					<PortalHost name="root-portal" />
				</ThemeProvider>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
}

function useSetWebBackgroundClassName() {
	useIsomorphicLayoutEffect(() => {
		// Adds the background color to the html element to prevent white background on overscroll.
		document.documentElement.classList.add("bg-background");
	}, []);
}

function useSetAndroidNavigationBar() {
	useLayoutEffect(() => {
		setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
	}, []);
}

function noop() {}
