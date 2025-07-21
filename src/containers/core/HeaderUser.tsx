import { useNavigation } from "expo-router";
import { View } from "react-native";
import { ActivityIndicator } from "~/components/ui/activity-indicator";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
	BottomSheetModal,
	BottomSheetTrigger,
} from "~/components/ui/bottom-sheet";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { authClient } from "~/lib/auth-client";
import { Menu } from "~/lib/icons/Menu";


export const HeaderUser = () => {
	const { isPending, data, error } = authClient.useSession();
	const { navigate } = useNavigation();

	return (
		<>
			<View className="hidden md:flex">
				{isPending && <ActivityIndicator />}
				{data && !isPending && (
					<Avatar alt={data?.user.name ?? "User"}>
						<AvatarImage source={{ uri: data?.user?.image ?? undefined }} />
						<AvatarFallback>
							<Text>{data?.user?.name.charAt(0) ?? "U"}</Text>
						</AvatarFallback>
					</Avatar>
				)}
				{!data && !isPending && (
					<Button
						variant="outline"
						size="sm"
						onPress={() => {
							navigate("/sign-in");
						}}
					>
						<Text>Login</Text>
					</Button>
				)}
			</View>
			<View className="sm:flex md:hidden">
				<BottomSheetModal>
					<BottomSheetTrigger>
						<Button variant="outline" size="sm">
							<Menu />
						</Button>
					</BottomSheetTrigger>
				</BottomSheetModal>
			</View>
		</>
	);
};
