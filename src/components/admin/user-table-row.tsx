import * as React from "react";
import { TableCell, TableRow } from "~/components/ui/table";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

interface User {
	id: string;
	name?: string;
	email: string;
	emailVerified: boolean;
	role?: string;
	banned: boolean;
	createdAt: string;
}

interface UserTableRowProps {
	user: User;
	index: number;
	columnWidths: number[];
}

export const UserTableRow = React.memo(
	({ user, index, columnWidths }: UserTableRowProps) => {
		return (
			<TableRow
				key={user.id}
				className={cn("active:bg-secondary", index % 2 && "bg-muted/40")}
			>
				<TableCell style={{ width: columnWidths[0] }}>
					<Text className="font-medium">{user.name || "—"}</Text>
				</TableCell>
				<TableCell style={{ width: columnWidths[1] }}>
					<Text className="text-sm text-muted-foreground">{user.email}</Text>
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
					<Text className="text-sm capitalize">{user.role || "user"}</Text>
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
					<Text className="text-sm text-muted-foreground">Actions</Text>
				</TableCell>
			</TableRow>
		);
	},
);

UserTableRow.displayName = "UserTableRow";
