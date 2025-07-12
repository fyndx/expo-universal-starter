import { ActivityIndicator } from "react-native";
import { withUnistyles } from "react-native-unistyles";

export const Spinner = withUnistyles(ActivityIndicator, (theme, rt) => ({
	color: theme.colors.onPrimary,
}));
