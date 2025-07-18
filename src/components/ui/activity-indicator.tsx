import { useColorScheme } from "@/src/hooks/useColorScheme";
import { ActivityIndicator as RNActivityIndicator } from "react-native";
import { NAV_THEME } from "~/lib/constants";

function ActivityIndicator(
	props: React.ComponentPropsWithoutRef<typeof RNActivityIndicator>,
) {
	const { colorScheme } = useColorScheme();
	return (
		<RNActivityIndicator color={NAV_THEME[colorScheme].background} {...props} />
	);
}

export { ActivityIndicator };
