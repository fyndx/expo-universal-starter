import { observer } from "@legendapp/state/react";
import { FlashList } from "@shopify/flash-list";
import * as React from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserTableHeader } from "~/components/admin/user-table-header";
import { UserTableRow } from "~/components/admin/user-table-row";
import { Pagination } from "~/components/ui/pagination";
import { Table, TableBody, TableHeader } from "~/components/ui/table";
import { Text } from "~/components/ui/text";
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
						<UserTableHeader columnWidths={columnWidths} />
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
								<UserTableRow
									user={user}
									index={index}
									columnWidths={columnWidths}
								/>
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
									<Pagination
										currentPage={currentPage}
										totalPages={totalPages}
										totalItems={totalUsers}
										currentItemsCount={users?.length || 0}
										itemName="user"
										onPreviousPage={model.goToPreviousPage}
										onNextPage={model.goToNextPage}
									/>
								);
							}}
						/>
					</TableBody>
				</Table>
			</ScrollView>
		</View>
	);
});
