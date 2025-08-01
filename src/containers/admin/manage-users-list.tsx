import { observer } from "@legendapp/state/react";
import { FlashList } from "@shopify/flash-list";
import * as React from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import type { ManageUsersListModel } from "./manage-users-list.model";

interface UsersListProps {
	model: ManageUsersListModel;
}

export const UsersList = observer(({ model }: UsersListProps) => {
	const { status, data, error } = model.obs.get();
	const users = data?.users;
	const { width } = useWindowDimensions();
	const insets = useSafeAreaInsets();

	// Define minimum column widths
	const MIN_COLUMN_WIDTHS = [120, 180, 120, 120, 100, 100, 120, 120, 80];

	const columnWidths = React.useMemo(() => {
		return MIN_COLUMN_WIDTHS.map((minWidth) => {
			const evenWidth = width / MIN_COLUMN_WIDTHS.length;
			return evenWidth > minWidth ? evenWidth : minWidth;
		});
	}, [width]);

	// Loading state
	if (status === "loading") {
		return (
			<View className="flex-1 justify-center items-center p-8">
				<Text className="text-muted-foreground">Loading users...</Text>
			</View>
		);
	}

	// Error state
	if (status === "error") {
		return (
			<View className="flex-1 justify-center items-center p-8">
				<Text className="text-destructive text-center">
					Failed to load users: {error?.message || "Unknown error"}
				</Text>
			</View>
		);
	}

	// Success state with table
	return (
		<View className="flex-1 p-4">
			<Text className="text-2xl font-bold mb-4">Manage Users</Text>

			<ScrollView
				horizontal
				bounces={false}
				showsHorizontalScrollIndicator={false}
			>
				<Table aria-labelledby="users-table">
					<TableHeader>
						<TableRow>
							<TableHead style={{ width: columnWidths[0] }}>
								<Text>Name</Text>
							</TableHead>
							<TableHead style={{ width: columnWidths[1] }}>
								<Text>Email</Text>
							</TableHead>
							<TableHead style={{ width: columnWidths[2] }}>
								<Text>Verification</Text>
							</TableHead>
							<TableHead style={{ width: columnWidths[3] }}>
								<Text>Linked Accounts</Text>
							</TableHead>
							<TableHead style={{ width: columnWidths[4] }}>
								<Text>Role</Text>
							</TableHead>
							<TableHead style={{ width: columnWidths[5] }}>
								<Text>Status</Text>
							</TableHead>
							<TableHead style={{ width: columnWidths[6] }}>
								<Text>Last Sign In</Text>
							</TableHead>
							<TableHead style={{ width: columnWidths[7] }}>
								<Text>Created At</Text>
							</TableHead>
							<TableHead style={{ width: columnWidths[8] }}>
								<Text>Actions</Text>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<FlashList
							data={users || []}
							estimatedItemSize={60}
							contentContainerStyle={{
								paddingBottom: insets.bottom,
							}}
							showsVerticalScrollIndicator={false}
							renderItem={({ item: user, index }) => (
								<TableRow
									key={user.id}
									className={cn(
										"active:bg-secondary",
										index % 2 && "bg-muted/40",
									)}
								>
									<TableCell style={{ width: columnWidths[0] }}>
										<Text className="font-medium">{user.name || "—"}</Text>
									</TableCell>
									<TableCell style={{ width: columnWidths[1] }}>
										<Text className="text-sm text-muted-foreground">
											{user.email}
										</Text>
									</TableCell>
									<TableCell style={{ width: columnWidths[2] }}>
										<Text
											className={`text-sm ${user.emailVerified ? "text-green-600" : "text-orange-600"}`}
										>
											{user.emailVerified ? "Verified" : "Unverified"}
										</Text>
									</TableCell>
									<TableCell style={{ width: columnWidths[3] }}>
										<Text className="text-sm text-muted-foreground">—</Text>
									</TableCell>
									<TableCell style={{ width: columnWidths[4] }}>
										<Text className="text-sm capitalize">
											{user.role || "user"}
										</Text>
									</TableCell>
									<TableCell style={{ width: columnWidths[5] }}>
										<Text
											className={`text-sm ${user.banned ? "text-red-600" : "text-green-600"}`}
										>
											{user.banned ? "Banned" : "Active"}
										</Text>
									</TableCell>
									<TableCell style={{ width: columnWidths[6] }}>
										<Text className="text-sm text-muted-foreground">—</Text>
									</TableCell>
									<TableCell style={{ width: columnWidths[7] }}>
										<Text className="text-sm text-muted-foreground">
											{new Date(user.createdAt).toLocaleDateString()}
										</Text>
									</TableCell>
									<TableCell style={{ width: columnWidths[8] }}>
										<Text className="text-sm text-muted-foreground">
											Actions
										</Text>
									</TableCell>
								</TableRow>
							)}
							ListEmptyComponent={() => (
								<View className="flex-1 justify-center items-center p-8">
									<Text className="text-muted-foreground text-center">
										No users found
									</Text>
								</View>
							)}
							ListFooterComponent={() => {
								const totalUsers = data?.total || 0;
								const pageSize = model.obs.metadata.pageSize.get();
								const currentPage = model.obs.metadata.currentPage.get();
								const totalPages = Math.ceil(totalUsers / pageSize);

								return (
									<View className="items-center py-4 ios:pb-0 space-y-3">
										<Text
											nativeID="users-table"
											className="text-sm text-muted-foreground"
										>
											{users?.length || 0} user
											{(users?.length || 0) !== 1 ? "s" : ""} of {totalUsers}{" "}
											total
										</Text>

										{totalPages > 1 && (
											<View className="flex-row items-center space-x-4">
												<Text className="text-sm text-muted-foreground">
													Page {currentPage} of {totalPages}
												</Text>

												<View className="flex-row space-x-2">
													<View
														className={cn(
															"bg-primary rounded px-3 py-1",
															currentPage === 1 ? "opacity-50" : "opacity-100",
														)}
														onTouchEnd={
															currentPage > 1
																? model.goToPreviousPage
																: undefined
														}
													>
														<Text className="text-primary-foreground text-sm">
															Previous
														</Text>
													</View>
													<View
														className={cn(
															"bg-primary rounded px-3 py-1",
															currentPage === totalPages
																? "opacity-50"
																: "opacity-100",
														)}
														onTouchEnd={
															currentPage < totalPages
																? model.goToNextPage
																: undefined
														}
													>
														<Text className="text-primary-foreground text-sm">
															Next
														</Text>
													</View>
												</View>
											</View>
										)}
									</View>
								);
							}}
						/>
					</TableBody>
				</Table>
			</ScrollView>
		</View>
	);
});
