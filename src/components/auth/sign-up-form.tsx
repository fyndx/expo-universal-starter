import { Link } from "expo-router";
import { View } from "react-native";
import { ActivityIndicator } from "~/components/ui/activity-indicator";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { PasswordInput } from "~/components/ui/password";
import { Text } from "~/components/ui/text";

interface SignUpFormProps {
	formData: {
		name: string;
		email: string;
		password: string;
	};
	isLoading: boolean;
	onFormDataChange: ({
		field,
		value,
	}: {
		field: string;
		value: string;
	}) => void;
	onSubmit: () => void;
}

export function SignUpForm({
	formData,
	isLoading,
	onFormDataChange,
	onSubmit,
}: SignUpFormProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>
					Enter your details to create a new account.
				</CardDescription>
			</CardHeader>
			<CardContent className="gap-4">
				<Input
					id="name"
					placeholder="Full Name"
					value={formData.name}
					onChangeText={(value) => onFormDataChange({ field: "name", value })}
				/>
				<Input
					id="email"
					placeholder="Email"
					value={formData.email}
					onChangeText={(value) => onFormDataChange({ field: "email", value })}
				/>
				<PasswordInput
					id="password"
					placeholder="Password"
					value={formData.password}
					onChangeText={(value) =>
						onFormDataChange({ field: "password", value })
					}
				/>
			</CardContent>
			<CardFooter>
				<Button
					onPress={onSubmit}
					className="flex-1 flex-row items-center gap-4"
					disabled={isLoading}
				>
					{isLoading && <ActivityIndicator />}
					<Text>{isLoading ? "Creating Account..." : "Sign Up"}</Text>
				</Button>
			</CardFooter>
			{/* Sign In Option */}
			<View className="p-6 pt-0">
				<View className="flex-row justify-center items-center">
					<Text className="text-sm text-muted-foreground">
						Already have an account?{" "}
					</Text>
					<Link href="/(public)/auth/sign-in">
						<Text className="text-sm text-primary hover:underline font-medium">
							Sign in
						</Text>
					</Link>
				</View>
			</View>
		</Card>
	);
}
