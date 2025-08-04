import { observer } from "@legendapp/state/react";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Key, Mail, Trash2 } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { ScrollView, View } from "react-native";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import {
	BAN_DURATIONS,
	ROLE_OPTIONS,
	UserDetailModel,
} from "~/models/admin/user-detail.model";

export const UserDetailContainer = observer(() => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const userDetailModel$ = useRef(new UserDetailModel()).current;

	// Get state from the model
	const {
		status,
		user,
		sessions,
		sessionsStatus,
		banUserOpen,
		deleteUserOpen,
		updateStatus,
		resendVerificationStatus,
		resetPasswordStatus,
	} = userDetailModel$.obs.get();

	// Get form data from formData$ observable
	const formData = userDetailModel$.formData$.get();

	useEffect(() => {
		if (id) {
			userDetailModel$.fetchUserById({ id });
			userDetailModel$.fetchUserSessionsById({ id });
		}
	}, [id, userDetailModel$]);

	const formatDate = (dateString: string | Date) => {
		return new Date(dateString).toLocaleString();
	};

	if (status === "loading") {
		return (
			<View className="flex-1 items-center justify-center">
				<Text>Loading user details...</Text>
			</View>
		);
	}

	if (status === "error" || !user) {
		return (
			<View className="flex-1 items-center justify-center p-4">
				<Text className="text-destructive text-center mb-4">
					Failed to load user details
				</Text>
				<Button onPress={() => router.back()}>
					<Text>Go Back</Text>
				</Button>
			</View>
		);
	}

	return (
		<ScrollView className="flex-1 bg-background">
			{/* Header */}
			<View className="flex-row items-center justify-between p-4 border-b border-border">
				<View className="flex-row items-center gap-3">
					<Button variant="ghost" size="sm" onPress={() => router.back()}>
						<Text>
							<ArrowLeft className="h-4 w-4" />
						</Text>
					</Button>
					<View>
						<Text className="text-xl font-semibold">
							{user.name || "Unnamed User"}
						</Text>
						<Text className="text-sm text-muted-foreground">{user.email}</Text>
					</View>
				</View>
			</View>

			<View className="p-4 gap-4">
				{/* User Info Card */}
				<Card>
					<CardHeader className="flex-row items-center justify-between">
						<CardTitle>User Information</CardTitle>
						<View className="flex-row gap-2">
							<Button
								variant="outline"
								size="sm"
								onPress={() => userDetailModel$.initializeFormData(user)}
								disabled={updateStatus === "loading"}
							>
								<Text>Reset</Text>
							</Button>
							<Button
								size="sm"
								onPress={() => userDetailModel$.handleSaveChanges()}
								disabled={updateStatus === "loading"}
							>
								<Text>
									{updateStatus === "loading" ? "Saving..." : "Save Changes"}
								</Text>
							</Button>
						</View>
					</CardHeader>
					<CardContent className="gap-4">
						<View className="gap-2">
							<Label>Name</Label>
							<Input
								value={formData.name}
								onChangeText={(text) =>
									userDetailModel$.setFormData({ name: text })
								}
								placeholder="Enter user name"
								editable={updateStatus !== "loading"}
							/>
						</View>

						<View className="gap-2">
							<Label>Email</Label>
							<Input
								value={formData.email}
								onChangeText={(text) =>
									userDetailModel$.setFormData({ email: text })
								}
								placeholder="Enter email address"
								keyboardType="email-address"
								autoCapitalize="none"
								editable={updateStatus !== "loading"}
							/>
						</View>

						<Separator />

						<View className="flex-row items-center justify-between">
							<Text className="text-muted-foreground">
								Email Verification Status
							</Text>
							<Badge variant={user.emailVerified ? "default" : "destructive"}>
								<Text>{user.emailVerified ? "Verified" : "Unverified"}</Text>
							</Badge>
						</View>

						<Separator />

						<View className="gap-2">
							<Label>Role</Label>
							<Select
								value={{
									value: formData.role,
									label:
										ROLE_OPTIONS.find((r) => r.value === formData.role)
											?.label || "User",
								}}
								onValueChange={(option) =>
									userDetailModel$.setFormData({
										role: option?.value || "user",
									})
								}
								disabled={updateStatus === "loading"}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select role" />
								</SelectTrigger>
								<SelectContent>
									{ROLE_OPTIONS.map((role) => (
										<SelectItem
											key={role.value}
											value={role.value}
											label={role.label}
										>
											<Text>{role.label}</Text>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</View>

						<Separator />

						<View className="gap-2">
							<Label>Status</Label>
							{user.banned ? (
								<View className="gap-2">
									<View className="flex-row items-center gap-2">
										<Badge variant="destructive">Banned</Badge>
										<Button
											variant="outline"
											size="sm"
											onPress={() => userDetailModel$.handleUnbanUser()}
											disabled={updateStatus === "loading"}
										>
											<Text>Unban User</Text>
										</Button>
									</View>
									{user.banReason && (
										<Text className="text-xs text-muted-foreground">
											Reason: {user.banReason}
										</Text>
									)}
									{user.banExpires && (
										<Text className="text-xs text-muted-foreground">
											Expires: {formatDate(user.banExpires)}
										</Text>
									)}
								</View>
							) : (
								<View className="flex-row items-center gap-2">
									<Badge variant="default" className="bg-green-600">
										Active
									</Badge>
									<Button
										variant="outline"
										size="sm"
										onPress={() => userDetailModel$.setBanUserOpen(true)}
										disabled={updateStatus === "loading"}
									>
										<Text>Ban User</Text>
									</Button>
								</View>
							)}
						</View>

						<Separator />

						<View className="flex-row items-center justify-between">
							<Text className="text-muted-foreground">Created</Text>
							<Text className="font-medium text-sm">
								{formatDate(user.createdAt)}
							</Text>
						</View>
						{user.updatedAt && (
							<>
								<Separator />
								<View className="flex-row items-center justify-between">
									<Text className="text-muted-foreground">Last Updated</Text>
									<Text className="font-medium text-sm">
										{formatDate(user.updatedAt)}
									</Text>
								</View>
							</>
						)}
						{user.lastLogin && (
							<>
								<Separator />
								<View className="flex-row items-center justify-between">
									<Text className="text-muted-foreground">Last Login</Text>
									<Text className="font-medium text-sm">
										{formatDate(user.lastLogin)}
									</Text>
								</View>
							</>
						)}

						<Separator />

						<View className="gap-2">
							<Label>Actions</Label>
							<View className="flex-row flex-wrap gap-2">
								{!user.emailVerified && (
									<Button
										variant="outline"
										size="sm"
										onPress={() => userDetailModel$.handleResendVerification()}
										disabled={resendVerificationStatus === "loading"}
										className="flex-row items-center"
									>
										<Text>
											<Mail className="mr-2 h-4 w-4" />
										</Text>
										<Text>
											{resendVerificationStatus === "loading"
												? "Sending..."
												: "Resend Verification"}
										</Text>
									</Button>
								)}
								<Button
									variant="outline"
									size="sm"
									onPress={() => userDetailModel$.handleResetPassword()}
									disabled={resetPasswordStatus === "loading"}
									className="flex-row items-center"
								>
									<Text>
										<Key className="mr-2 h-4 w-4" />
									</Text>
									<Text>
										{resetPasswordStatus === "loading"
											? "Sending..."
											: "Reset Password"}
									</Text>
								</Button>
								<Button
									variant="destructive"
									size="sm"
									onPress={() => userDetailModel$.setDeleteUserOpen(true)}
									disabled={updateStatus === "loading"}
									className="flex-row items-center"
								>
									<Text>
										<Trash2 className="mr-2 h-4 w-4" />
									</Text>
									<Text>Delete User</Text>
								</Button>
							</View>
						</View>
					</CardContent>
				</Card>

				{/* Active Sessions Card */}
				<Card>
					<CardHeader className="flex-row items-center justify-between">
						<CardTitle>Active Sessions</CardTitle>
						<Button
							variant="destructive"
							size="sm"
							onPress={() =>
								userDetailModel$.handleSessionRevoke({ userId: user.id })
							}
							disabled={sessionsStatus === "loading" || sessions.length === 0}
						>
							<Text>Revoke All</Text>
						</Button>
					</CardHeader>
					<CardContent>
						{sessionsStatus === "loading" ? (
							<Text className="text-muted-foreground">Loading sessions...</Text>
						) : sessions.length === 0 ? (
							<Text className="text-muted-foreground">No active sessions</Text>
						) : (
							<View className="gap-3">
								{sessions.map((session, index) => (
									<View key={session.id}>
										<View className="flex-row items-start justify-between">
											<View className="flex-1">
												<View className="flex-row items-center gap-2">
													<Text className="font-medium">{session.device}</Text>
													{session.current && (
														<Badge variant="outline" className="text-xs">
															Current
														</Badge>
													)}
												</View>
												<Text className="text-sm text-muted-foreground">
													{session.location}
												</Text>
												<Text className="text-xs text-muted-foreground">
													Last active: {session.lastActive}
												</Text>
												{session.ipAddress && (
													<Text className="text-xs text-muted-foreground">
														IP: {session.ipAddress}
													</Text>
												)}
											</View>
											{!session.current && (
												<Button
													variant="ghost"
													size="sm"
													onPress={() =>
														userDetailModel$.handleSessionRevoke({
															userId: user.id,
															sessionId: session.id,
														})
													}
													disabled={false}
												>
													<Text className="text-destructive">Revoke</Text>
												</Button>
											)}
										</View>
										{index < sessions.length - 1 && (
											<Separator className="mt-3" />
										)}
									</View>
								))}
							</View>
						)}
					</CardContent>
				</Card>
			</View>

			{/* Ban User Dialog */}
			<Dialog open={banUserOpen} onOpenChange={userDetailModel$.setBanUserOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Ban User</DialogTitle>
						<DialogDescription>
							Ban {user.name || user.email} from the platform
						</DialogDescription>
					</DialogHeader>
					<View className="gap-4 py-4">
						<View className="gap-2">
							<Label>Ban Reason *</Label>
							<Input
								value={formData.banReason}
								onChangeText={(text) =>
									userDetailModel$.setFormData({ banReason: text })
								}
								placeholder="Enter reason for ban"
								multiline
								numberOfLines={3}
							/>
						</View>
						<View className="gap-2">
							<Label>Ban Duration</Label>
							<Select
								value={{
									value: formData.banDuration,
									label:
										BAN_DURATIONS.find((d) => d.value === formData.banDuration)
											?.label || "Select duration",
								}}
								onValueChange={(option) =>
									userDetailModel$.setFormData({
										banDuration: option?.value || "",
									})
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select ban duration" />
								</SelectTrigger>
								<SelectContent>
									{BAN_DURATIONS.map((duration) => (
										<SelectItem
											key={duration.value}
											value={duration.value}
											label={duration.label}
										>
											<Text>{duration.label}</Text>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</View>
					</View>
					<DialogFooter>
						<Button
							variant="outline"
							onPress={() => userDetailModel$.setBanUserOpen(false)}
						>
							<Text>Cancel</Text>
						</Button>
						<Button
							onPress={() => userDetailModel$.handleBanUser()}
							disabled={updateStatus === "loading"}
							variant="destructive"
						>
							<Text>
								{updateStatus === "loading" ? "Banning..." : "Ban User"}
							</Text>
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete User Dialog */}
			<Dialog
				open={deleteUserOpen}
				onOpenChange={userDetailModel$.setDeleteUserOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete User</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete {user.name || user.email}? This
							action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="outline"
							onPress={() => userDetailModel$.setDeleteUserOpen(false)}
						>
							<Text>Cancel</Text>
						</Button>
						<Button
							onPress={() => userDetailModel$.handleDeleteUser()}
							disabled={updateStatus === "loading"}
							variant="destructive"
						>
							<Text>
								{updateStatus === "loading" ? "Deleting..." : "Delete User"}
							</Text>
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</ScrollView>
	);
});
