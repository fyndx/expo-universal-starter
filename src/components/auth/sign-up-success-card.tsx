import { View } from "react-native";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Confetti } from "~/components/ui/confetti";
import { Text } from "~/components/ui/text";

interface SignUpSuccessCardProps {
	userName: string;
	userEmail: string;
	onContinue: () => void;
	onResendVerification: () => void;
}

export function SignUpSuccessCard({
	userName,
	userEmail,
	onContinue,
	onResendVerification,
}: SignUpSuccessCardProps) {
	return (
		<>
			<Confetti />
			<Card>
				<CardHeader>
					<CardTitle className="text-center">Check your email! 📧</CardTitle>
					<CardDescription className="text-center">
						Your account has been created successfully.
					</CardDescription>
				</CardHeader>
				<CardContent className="items-center gap-4">
					<View className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center">
						<Text className="text-3xl">📧</Text>
					</View>
					<Text className="text-center text-muted-foreground">
						Welcome, {userName}! We've sent a verification email to{" "}
						<Text className="font-medium text-foreground">{userEmail}</Text>
					</Text>
					<Text className="text-center text-sm text-muted-foreground">
						Please check your email and click the verification link to complete
						your account setup.
					</Text>
				</CardContent>
				<CardFooter className="flex-col gap-3">
					<Button onPress={onContinue} className="w-full">
						<Text>Continue to App</Text>
					</Button>
					<Button
						variant="outline"
						onPress={onResendVerification}
						className="w-full"
					>
						<Text>Resend verification email</Text>
					</Button>
				</CardFooter>
			</Card>
		</>
	);
}
