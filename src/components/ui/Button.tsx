import type React from "react";
import { Pressable, type PressableProps, Text } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type ButtonVariants = UnistylesVariants<typeof styles>;

export type ButtonProps = ButtonVariants & PressableProps;

export const Button: React.FC<ButtonProps> = ({
	variant = "primary",
	size = "base",
	disabled = false,
	children,
	...pressableProps
}) => {
	styles.useVariants({
		variant,
		disabled: false,
		size,
	});

	return (
		<Pressable style={styles.button} disabled={disabled} {...pressableProps}>
			{typeof children === "string" ? (
				<Text style={styles.label}>{children}</Text>
			) : (
				children
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create((theme) => ({
	button: {
		alignItems: "center",
		justifyContent: "center",
		gap: theme.gap(1),
		borderRadius: theme.colors.borderColor,
		// variants grouped here
		variants: {
			variant: {
				destructive: {
					backgroundColor: theme.colors.destructive,
				},
				outline: {
					backgroundColor: theme.colors.background,
					borderWidth: 1,
					borderColor: theme.colors.borderColor,
				},
				secondary: {
					backgroundColor: theme.colors.secondary,
				},
				ghost: {
					backgroundColor: theme.colors.transparent,
				},
				link: {
					backgroundColor: theme.colors.transparent,
				},
				primary: {
					backgroundColor: theme.colors.primary,
				},
				default: {
					backgroundColor: theme.colors.primary,
				},
			},
			size: {
				default: {
					height: 40,
					paddingHorizontal: 16,
				},
				sm: {
					height: 36,
					paddingHorizontal: 12,
				},
				lg: {
					height: 44,
					paddingHorizontal: 24,
				},
				base: {
					height: 40,
					paddingHorizontal: 16,
				},
			},
			disabled: {
				true: {
					opacity: 0.5,
				},
			},
		},
		// compound variants
		compoundVariants: [],
	},
	label: {
		variants: {
			variant: {
				default: { color: theme.colors.onPrimary },
				primary: { color: theme.colors.onPrimary },
				destructive: { color: theme.colors.onDestructive },
				outline: { color: theme.colors.text },
				secondary: { color: theme.colors.onSecondary },
				ghost: { color: theme.colors.text },
				link: {
					color: theme.colors.primary,
					textDecorationLine: "underline",
				},
			},
			size: {
				default: { fontSize: theme.fontSize.base },
				sm: { fontSize: theme.fontSize.sm },
				base: { fontSize: theme.fontSize.base },
				lg: { fontSize: theme.fontSize.lg },
			},
			disabled: {
				true: {},
			},
		},
	},
}));
