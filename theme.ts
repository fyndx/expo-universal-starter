import {
	blue,
	blueDark,
	gray,
	grayDark,
	green,
	greenDark,
	red,
	redDark,
	yellow,
	yellowDark,
} from "@radix-ui/colors";

export const lightTheme = {
	colors: {
		...gray,
		...blue,
		...red,
		...green,

		// Base Colors
		background: "#fff",
		backgroundHover: "#f0f0f0",
		backgroundPress: "#e0e0e0",
		backgroundFocus: "#d0d0d0",
		backgroundStrong: "#c0c0c0",
		backgroundTransparent: "rgba(255, 255, 255, 0.5)",

		// Text Colors
		text: "#000",
		textHover: "#111",
		textPress: "#222",
		textFocus: "#333",
		textTransparent: "rgba(0, 0, 0, 0.5)",

		// Border Colors
		borderColor: gray.gray7,
		borderColorHover: "#bbb",
		borderColorFocus: "#aaa",
		borderColorPress: "#999",

		// Utility Colors
		placeholderColor: "#888",
		outlineColor: blue.blue9,
		transparent: "transparent",

		// Primary colors (for default button)
		primary: blue.blue9,
		primaryHover: blue.blue10,
		primaryPress: blue.blue11,
		onPrimary: "#fff",

		// Secondary colors
		secondary: gray.gray3,
		secondaryHover: gray.gray4,
		secondaryPress: gray.gray5,
		onSecondary: gray.gray11,

		// Destructive colors
		destructive: red.red9,
		destructiveHover: red.red10,
		destructivePress: red.red11,
		onDestructive: "#fff",

		// Muted colors (for ghost, outline variants)
		muted: gray.gray4,
		mutedHover: gray.gray5,
		mutedPress: gray.gray6,
		mutedForeground: gray.gray11,

		// Accent colors
		accent: blue.blue4,
		accentHover: blue.blue5,
		accentPress: blue.blue6,
		accentForeground: blue.blue11,

		// Status colors
		success: green.green9,
		successHover: green.green10,
		onSuccess: "#fff",

		warning: yellow.yellow9,
		warningHover: yellow.yellow10,
		onWarning: "#000",

		info: blue.blue9,
		infoHover: blue.blue10,
		onInfo: "#fff",

		// Input specific colors
		input: gray.gray6,
		inputHover: gray.gray7,
		inputFocus: gray.gray8,

		// Card colors
		card: "#fff",
		cardHover: gray.gray2,
		cardForeground: gray.gray12,

		// Popover colors
		popover: "#fff",
		popoverForeground: gray.gray12,

		// Ring colors (for focus states)
		ring: blue.blue8,

		// Chart colors
		chart1: blue.blue9,
		chart2: green.green9,
		chart3: yellow.yellow9,
		chart4: red.red9,
		chart5: gray.gray9,
	},
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
		xxl: 48,
	},
	borderRadius: {
		sm: 6,
		md: 8,
		lg: 12,
		xl: 16,
	},
	fontSize: {
		xs: 12,
		sm: 14,
		base: 16,
		lg: 18,
		xl: 20,
		"2xl": 24,
		"3xl": 30,
		"4xl": 36,
	},
	padding: (p: number) => p * 4,
	gap: (v: number) => v * 8,
} as const;

export const darkTheme = {
	colors: {
		...grayDark,
		...blueDark,
		...redDark,
		...greenDark,

		// Base Colors
		background: "#000",
		backgroundHover: "#111",
		backgroundPress: "#222",
		backgroundFocus: "#333",
		backgroundStrong: "#444",
		backgroundTransparent: "rgba(0, 0, 0, 0.5)",

		// Text Colors
		text: "#fff",
		textHover: "#eee",
		textPress: "#ddd",
		textFocus: "#ccc",
		textTransparent: "rgba(255, 255, 255, 0.5)",

		// Border Colors
		borderColor: grayDark.gray7,
		borderColorHover: "#666",
		borderColorFocus: "#777",
		borderColorPress: "#888",

		// Utility Colors
		transparent: "transparent",
		placeholderColor: "#999",
		outlineColor: blueDark.blue9,

		// Primary colors (for default button)
		primary: blueDark.blue9,
		primaryHover: blueDark.blue10,
		primaryPress: blueDark.blue11,
		onPrimary: "#fff",

		// Secondary colors
		secondary: grayDark.gray3,
		secondaryHover: grayDark.gray4,
		secondaryPress: grayDark.gray5,
		onSecondary: grayDark.gray11,

		// Destructive colors
		destructive: redDark.red9,
		destructiveHover: redDark.red10,
		destructivePress: redDark.red11,
		onDestructive: "#fff",

		// Muted colors (for ghost, outline variants)
		muted: grayDark.gray4,
		mutedHover: grayDark.gray5,
		mutedPress: grayDark.gray6,
		mutedForeground: grayDark.gray11,

		// Accent colors
		accent: blueDark.blue4,
		accentHover: blueDark.blue5,
		accentPress: blueDark.blue6,
		accentForeground: blueDark.blue11,

		// Status colors
		success: greenDark.green9,
		successHover: greenDark.green10,
		onSuccess: "#fff",

		warning: yellowDark.yellow9,
		warningHover: yellowDark.yellow10,
		onWarning: "#000",

		info: blueDark.blue9,
		infoHover: blueDark.blue10,
		onInfo: "#fff",

		// Input specific colors
		input: grayDark.gray6,
		inputHover: grayDark.gray7,
		inputFocus: grayDark.gray8,

		// Card colors
		card: grayDark.gray2,
		cardHover: grayDark.gray3,
		cardForeground: grayDark.gray12,

		// Popover colors
		popover: grayDark.gray2,
		popoverForeground: grayDark.gray12,

		// Ring colors (for focus states)
		ring: blueDark.blue8,

		// Chart colors
		chart1: blueDark.blue9,
		chart2: greenDark.green9,
		chart3: yellowDark.yellow9,
		chart4: redDark.red9,
		chart5: grayDark.gray9,
	},
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
		xxl: 48,
	},
	borderRadius: {
		sm: 6,
		md: 8,
		lg: 12,
		xl: 16,
	},
	fontSize: {
		xs: 12,
		sm: 14,
		base: 16,
		lg: 18,
		xl: 20,
		"2xl": 24,
		"3xl": 30,
		"4xl": 36,
	},
	padding: (p: number) => p * 4,
	gap: (v: number) => v * 8,
} as const;
