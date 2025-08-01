import { observer } from "@legendapp/state/react";
import * as React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Text } from "~/components/ui/text";
import type { ManageUsersListModel } from "~/containers/admin/manage-users-list.model";

interface UsersListFiltersProps {
	model: ManageUsersListModel;
}

export const UsersListFilters = observer(({ model }: UsersListFiltersProps) => {
	const { search, role, status } = model.obs.filters.get();
	const [searchInput, setSearchInput] = React.useState(search);
	const insets = useSafeAreaInsets();

	const roleRef = React.useRef<React.ElementRef<typeof SelectTrigger> | null>(
		null,
	);
	const statusRef = React.useRef<React.ElementRef<typeof SelectTrigger> | null>(
		null,
	);

	const contentInsets = {
		top: insets.top,
		bottom: Platform.select({
			ios: insets.bottom,
			android: insets.bottom + 24,
		}),
		left: 12,
		right: 12,
	};

	// Debounce search input
	React.useEffect(() => {
		const timer = setTimeout(() => {
			if (searchInput !== search) {
				model.setSearchFilter(searchInput);
			}
		}, 300);

		return () => clearTimeout(timer);
	}, [searchInput, search, model]);

	// Update local search input when filter is cleared
	React.useEffect(() => {
		setSearchInput(search);
	}, [search]);

	const roleOptions = [
		{ value: "all", label: "All Roles" },
		{ value: "admin", label: "Admin" },
		{ value: "user", label: "User" },
		{ value: "moderator", label: "Moderator" },
	];

	const statusOptions = [
		{ value: "all", label: "All Statuses" },
		{ value: "active", label: "Active" },
		{ value: "inactive", label: "Inactive" },
		{ value: "pending", label: "Pending" },
		{ value: "banned", label: "Banned" },
	];

	const handleRoleChange = (
		option: { value: string; label: string } | undefined,
	) => {
		if (option) {
			model.setRoleFilter(option.value);
		}
	};

	const handleStatusChange = (
		option: { value: string; label: string } | undefined,
	) => {
		if (option) {
			model.setStatusFilter(option.value);
		}
	};

	return (
		<View className="mb-6 gap-4">
			<Text className="text-lg font-semibold">Search & Filters</Text>

			{/* Search Input */}
			<View className="gap-2">
				<Text className="text-sm font-medium">Search by name or email</Text>
				<Input
					placeholder="Search users..."
					value={searchInput}
					onChangeText={setSearchInput}
					className="w-full max-w-md"
				/>
			</View>

			{/* Filters Row */}
			<View className="flex-row gap-4 flex-wrap">
				{/* Role Filter */}
				<View className="gap-2 flex-1 min-w-48">
					<Text className="text-sm font-medium">Filter by role</Text>
					<Select
						value={roleOptions.find((option) => option.value === role)}
						onValueChange={handleRoleChange}
					>
						<SelectTrigger
							ref={roleRef}
							className="w-full"
							onTouchStart={() => {
								roleRef.current?.open();
							}}
						>
							<SelectValue
								className="text-foreground text-sm native:text-lg"
								placeholder="Select role"
							/>
						</SelectTrigger>
						<SelectContent insets={contentInsets} className="w-full">
							{roleOptions.map((option) => (
								<SelectItem
									key={option.value}
									label={option.label}
									value={option.value}
								>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</View>

				{/* Status Filter */}
				<View className="gap-2 flex-1 min-w-48">
					<Text className="text-sm font-medium">Filter by status</Text>
					<Select
						value={statusOptions.find((option) => option.value === status)}
						onValueChange={handleStatusChange}
					>
						<SelectTrigger
							ref={statusRef}
							className="w-full"
							onTouchStart={() => {
								statusRef.current?.open();
							}}
						>
							<SelectValue
								className="text-foreground text-sm native:text-lg"
								placeholder="Select status"
							/>
						</SelectTrigger>
						<SelectContent insets={contentInsets} className="w-full">
							{statusOptions.map((option) => (
								<SelectItem
									key={option.value}
									label={option.label}
									value={option.value}
								>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</View>
			</View>

			{/* Clear Filters Button */}
			<View className="flex-row justify-start">
				<Button variant="outline" onPress={model.clearFilters}>
					<Text>Clear All Filters</Text>
				</Button>
			</View>
		</View>
	);
});
