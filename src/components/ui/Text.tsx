import React from "react";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

const styles = StyleSheet.create((theme) => ({
	text: {
		variants: {
			variant: {
				display: {
					fontSize: theme.fontSize["4xl"],
					lineHeight: theme.lineHeight.tight(theme.fontSize["4xl"]),
					fontWeight: theme.fontWeight.bold,
				},
				heading: {
					fontSize: theme.fontSize["3xl"],
					lineHeight: theme.lineHeight.tight(theme.fontSize["3xl"]),
					fontWeight: theme.fontWeight.semibold,
				},
				title: {
					fontSize: theme.fontSize["2xl"],
					lineHeight: theme.lineHeight.normal(theme.fontSize["2xl"]),
					fontWeight: theme.fontWeight.semibold,
				},
				subtitle: {
					fontSize: theme.fontSize.xl,
					lineHeight: theme.lineHeight.normal(theme.fontSize.xl),
					fontWeight: theme.fontWeight.medium,
				},
				body: {
					fontSize: theme.fontSize.base,
					lineHeight: theme.lineHeight.normal(theme.fontSize.base),
					fontWeight: theme.fontWeight.normal,
				},
				caption: {
					fontSize: theme.fontSize.sm,
					lineHeight: theme.lineHeight.normal(theme.fontSize.sm),
					fontWeight: theme.fontWeight.normal,
				},
				label: {
					fontSize: theme.fontSize.sm,
					lineHeight: theme.lineHeight.tight(theme.fontSize.sm),
					fontWeight: theme.fontWeight.medium,
				},
				small: {
					fontSize: theme.fontSize.xs,
					lineHeight: theme.lineHeight.normal(theme.fontSize.xs),
					fontWeight: theme.fontWeight.normal,
				},
			},
			size: {
				xs: {
					fontSize: theme.fontSize.xs,
					lineHeight: theme.lineHeight.normal(theme.fontSize.xs),
				},
				sm: {
					fontSize: theme.fontSize.sm,
					lineHeight: theme.lineHeight.normal(theme.fontSize.sm),
				},
				base: {
					fontSize: theme.fontSize.base,
					lineHeight: theme.lineHeight.normal(theme.fontSize.base),
				},
				lg: {
					fontSize: theme.fontSize.lg,
					lineHeight: theme.lineHeight.normal(theme.fontSize.lg),
				},
				xl: {
					fontSize: theme.fontSize.xl,
					lineHeight: theme.lineHeight.normal(theme.fontSize.xl),
				},
				"2xl": {
					fontSize: theme.fontSize["2xl"],
					lineHeight: theme.lineHeight.tight(theme.fontSize["2xl"]),
				},
				"3xl": {
					fontSize: theme.fontSize["3xl"],
					lineHeight: theme.lineHeight.tight(theme.fontSize["3xl"]),
				},
				"4xl": {
					fontSize: theme.fontSize["4xl"],
					lineHeight: theme.lineHeight.tight(theme.fontSize["4xl"]),
				},
			},
			weight: {
				normal: {
					fontWeight: theme.fontWeight.normal,
				},
				medium: {
					fontWeight: theme.fontWeight.medium,
				},
				semibold: {
					fontWeight: theme.fontWeight.semibold,
				},
				bold: {
					fontWeight: theme.fontWeight.bold,
				},
			},
			color: {
				default: {
					color: theme.colors.onPrimary,
				},
				muted: {
					color: theme.colors.mutedForeground,
				},
				primary: {
					color: theme.colors.onPrimary,
				},
				secondary: {
					color: theme.colors.secondary,
				},
				destructive: {
					color: theme.colors.destructive,
				},
				success: {
					color: theme.colors.success,
				},
				warning: {
					color: theme.colors.warning,
				},
				accent: {
					color: theme.colors.accent,
				},
			},
			align: {
				left: {
					textAlign: "left",
				},
				center: {
					textAlign: "center",
				},
				right: {
					textAlign: "right",
				},
				justify: {
					textAlign: "justify",
				},
			},
		},
	},
}));

type TextVariants = UnistylesVariants<typeof styles>;

export type TextProps = TextVariants & RNTextProps;

export const Text: React.FC<TextProps> = React.forwardRef<RNText, TextProps>(
	(
		{
			variant = "body",
			size = "base",
			weight = "normal",
			color = "primary",
			align = "left",
			children,
			...textProps
		},
		ref,
	) => {
		styles.useVariants({
			variant,
			size,
			weight,
			color,
			align,
		});

		return (
			<RNText ref={ref} style={styles.text} {...textProps}>
				{children}
			</RNText>
		);
	},
);

Text.displayName = "Text";
