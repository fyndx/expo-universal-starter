import type * as React from "react";
import { TextInput, type TextInputProps } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

function Input({
	...props
}: TextInputProps & {
	ref?: React.RefObject<TextInput>;
}) {
	const { theme } = useUnistyles();

	return (
		<TextInput
			style={styles.input}
			placeholderTextColor={theme.colors.placeholderColor}
			{...props}
		/>
	);
}

const styles = StyleSheet.create((theme, rt) => ({
	input: {
		backgroundColor: theme.colors.background,
		color: theme.colors.text,
		paddingHorizontal: theme.padding(3),
		paddingVertical: theme.padding(2),
		borderRadius: theme.gap(0.5),
		borderWidth: 1,
		borderColor: theme.colors.borderColor,
		fontSize: {
			sm: 14,
			md: 16,
		},
		height: {
			sm: 40,
			md: 48,
		},
		_web: {
			_focus: {
				outlineStyle: "solid",
				outlineColor: theme.colors.outlineColor,
				outlineWidth: 2,
				outlineOffset: -2,
			},
			"&:hover": {
				backgroundColor: theme.colors.backgroundHover,
				borderColor: theme.colors.borderColorHover,
			},
		},
	},
}));

export { Input };
