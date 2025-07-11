// components/Card.tsx

import { breakpoints } from "@/breakpoints";
import React from "react";
import { Text, type TextProps, View, type ViewProps } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const styles = StyleSheet.create((theme) => ({
	card: {
		borderRadius: theme.borderRadius.lg,
		borderWidth: 1,
		borderColor: theme.colors.borderColor,
		backgroundColor: theme.colors.card,
		shadowColor: theme.colors.shadow,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 1,
		flex: 1,
		gap: theme.gap(1),
		maxWidth: breakpoints.sm,
	},
	header: {
		padding: theme.padding(6),
		gap: theme.gap(1),
	},
	title: {
		fontSize: theme.fontSize["2xl"],
		fontWeight: theme.fontWeight.semibold,
		lineHeight: theme.lineHeight.none,
		letterSpacing: theme.letterSpacing.tight,
		color: theme.colors.cardForeground,
	},
	description: {
		fontSize: theme.fontSize.sm,
		color: theme.colors.mutedForeground,
	},
	content: {
		padding: theme.padding(6),
		paddingTop: 0,
		gap: theme.gap(2),
	},
	footer: {
		padding: theme.padding(6),
		paddingTop: 0,
		// flexDirection: "row",
		// alignItems: "center",
	},
}));

export const Card = React.forwardRef<View, ViewProps>(
	({ style, ...props }, ref) => (
		<View ref={ref} style={[styles.card, style]} {...props} />
	),
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<View, ViewProps>(
	({ style, ...props }, ref) => (
		<View ref={ref} style={[styles.header, style]} {...props} />
	),
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<Text, TextProps>(
	({ style, ...props }, ref) => (
		<Text ref={ref} style={[styles.title, style]} {...props} />
	),
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<Text, TextProps>(
	({ style, ...props }, ref) => (
		<Text ref={ref} style={[styles.description, style]} {...props} />
	),
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<View, ViewProps>(
	({ style, ...props }, ref) => (
		<View ref={ref} style={[styles.content, style]} {...props} />
	),
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<View, ViewProps>(
	({ style, ...props }, ref) => (
		<View ref={ref} style={[styles.footer, style]} {...props} />
	),
);
CardFooter.displayName = "CardFooter";
