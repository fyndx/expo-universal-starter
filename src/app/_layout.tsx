import "react-native-reanimated";
import "../../global.css";

import { useIsomorphicLayoutEffect } from "@/src/hooks/useIsomorphicLayout";
import { NAV_THEME } from "@/src/lib/constants";
import { Toaster } from "@/src/lib/sonner/sonner";
import { useColorScheme } from "@/src/lib/useColorScheme";
import {
	DarkTheme,
	DefaultTheme,
	type Theme,
	ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useLayoutEffect, useRef, useState } from "react";
import { Appearance, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { setAndroidNavigationBar } from "../lib/android-navigation-bar";

const LIGHT_THEME: Theme = {
	...DefaultTheme,
	colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
	...DarkTheme,
	colors: NAV_THEME.dark,
};

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
	const hasMounted = useRef(false);
	const { isDarkColorScheme, isLoaded } = useColorScheme();
	const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

	useIsomorphicLayoutEffect(() => {
		if (hasMounted.current) {
			return;
		}

		if (Platform.OS === "web") {
			// Adds the background color to the html element to prevent white background on overscroll.
			document.documentElement.classList.add("bg-background");
		}
		setIsColorSchemeLoaded(true);
		hasMounted.current = true;
	}, []);

	const [isFontsLoaded] = useFonts({
		SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!isFontsLoaded || !isColorSchemeLoaded || !isLoaded) {
		// Wait for fonts and stored color scheme to load
		return null;
	}

	return (
		<SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
			<ThemeProvider
				value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}
				// value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
			>
				<Stack>
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
				</Stack>
				<StatusBar style={isDarkColorScheme ? "light" : "dark"} />
			</ThemeProvider>
			<Toaster />
			<PortalHost name="root-portal" />
		</SafeAreaView>
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
