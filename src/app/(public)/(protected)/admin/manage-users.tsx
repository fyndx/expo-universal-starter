import { useMount } from "@legendapp/state/react";
import { View } from "@rn-primitives/slot";
import { useRef } from "react";
import { UsersList } from "~/containers/admin/manage-users-list";
import { ManageUsersListModel } from "~/containers/admin/manage-users-list.model";

export default function ManageUsersScreen() {
	const manageUsersListModel$ = useRef(new ManageUsersListModel()).current;

	useMount(() => {
		manageUsersListModel$.fetchUsers();
	});

	return (
		<View>
			<UsersList model={manageUsersListModel$} />
		</View>
	);
}
