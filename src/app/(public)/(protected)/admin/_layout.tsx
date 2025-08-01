import { Redirect, Slot } from "expo-router";
import { LoadingScreen } from "~/containers/loading-screen";
import { authClient } from "~/lib/auth-client";

export default function AdminLayout() {
	const { isPending, data } = authClient.useSession();
	if (isPending) {
		// Wait for the authentication state to resolve
		return <LoadingScreen />;
	}

	if (!data) {
		return <Redirect href="/auth/sign-in" />;
	}

	if (data?.user.role !== "admin") {
		return <Redirect href="/home" />;
	}

	return (
		<>
			<Slot />
		</>
	);
}
