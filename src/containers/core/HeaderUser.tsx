import { useNavigation } from "expo-router";
import { useRef } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "~/components/ui/activity-indicator";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
	BottomSheetModal,
	BottomSheetView,
} from "~/components/ui/bottom-sheet/index";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { authClient } from "~/lib/auth-client";
import { Menu } from "~/lib/icons/Menu";

export const HeaderUser = () => {
	const { isPending, data, error } = authClient.useSession();
	const { navigate } = useNavigation();
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	return (
		<>
			<View className="flex flex-row items-center justify-between gap-2">
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
				<div className="flex mobile-only">
					<Button
						onPress={() => bottomSheetModalRef.current?.present()}
						variant={"ghost"}
					>
						<Menu className="text-base text-foreground" />
					</Button>
				</div>
			</View>
			<BottomSheetModal ref={bottomSheetModalRef}>
				<BottomSheetView className="bg-background p-4">
					{data ? (
						<View className="bg-background p-4">
							<Text>Welcome, {data.user.name}</Text>
							{/* Add logout functionality */}
						</View>
					) : (
						<View className="p-4">
							<Button onPress={() => navigate("/sign-in")}>
								<Text>Login</Text>
							</Button>
						</View>
					)}
				</BottomSheetView>
			</BottomSheetModal>
		</>
	);
};
