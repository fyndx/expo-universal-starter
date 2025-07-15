import { Text, View } from "react-native";
import { NavigationMenu } from "../../ui/NavigationMenu.web";

export const Header = () => {
	return (
		<View
			style={{
				padding: 32,
				backgroundColor: "#fff",
				minHeight: "100vh",
			}}
		>
			<Text
				style={{
					fontSize: 24,
					fontWeight: "bold",
					marginBottom: 32,
					textAlign: "center",
				}}
			>
				Navigation Menu Example
			</Text>

			<NavigationMenu.Root>
				<NavigationMenu.List>
					{/* Learn Menu Item */}
					<NavigationMenu.Item>
						<NavigationMenu.Trigger>
							<Text>Learn</Text>
							<NavigationMenu.CaretDown />
						</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<NavigationMenu.ListContainer columns={2}>
								{/* Featured Callout */}
								<NavigationMenu.Callout
									href="/"
									title="React Native Unistyles"
									description="Universal styling for React Native apps with theme support."
								>
									<View
										style={{
											width: 38,
											height: 38,
											backgroundColor: "#007AFF",
											borderRadius: 8,
										}}
									/>
								</NavigationMenu.Callout>

								{/* List Items */}
								<NavigationMenu.ListItem
									href="https://reactnative.dev/"
									title="React Native"
								>
									Learn React Native development with comprehensive guides and
									tutorials.
								</NavigationMenu.ListItem>

								<NavigationMenu.ListItem
									href="https://unistyles.vercel.app/"
									title="Unistyles"
								>
									Powerful styling library for React Native with theme support.
								</NavigationMenu.ListItem>

								<NavigationMenu.ListItem href="https://expo.dev/" title="Expo">
									The fastest way to build and deploy React Native apps.
								</NavigationMenu.ListItem>
							</NavigationMenu.ListContainer>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					{/* Overview Menu Item */}
					<NavigationMenu.Item>
						<NavigationMenu.Trigger>
							<Text>Overview</Text>
							<NavigationMenu.CaretDown />
						</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<NavigationMenu.ListContainer columns={3}>
								<NavigationMenu.ListItem
									title="Introduction"
									href="/docs/introduction"
								>
									Get started with our universal React Native starter template.
								</NavigationMenu.ListItem>

								<NavigationMenu.ListItem
									title="Getting Started"
									href="/docs/getting-started"
								>
									Quick setup guide to get your project running in minutes.
								</NavigationMenu.ListItem>

								<NavigationMenu.ListItem title="Styling" href="/docs/styling">
									Learn about our theme system and responsive design patterns.
								</NavigationMenu.ListItem>

								<NavigationMenu.ListItem
									title="Authentication"
									href="/docs/auth"
								>
									Implement secure authentication with Better Auth integration.
								</NavigationMenu.ListItem>

								<NavigationMenu.ListItem
									title="Deployment"
									href="/docs/deployment"
								>
									Deploy your app to iOS, Android, and Web platforms.
								</NavigationMenu.ListItem>

								<NavigationMenu.ListItem
									title="Best Practices"
									href="/docs/best-practices"
								>
									Code organization and development workflow recommendations.
								</NavigationMenu.ListItem>
							</NavigationMenu.ListContainer>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					{/* Components Menu Item */}
					<NavigationMenu.Item>
						<NavigationMenu.Trigger>
							<Text>Components</Text>
							<NavigationMenu.CaretDown />
						</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<NavigationMenu.ListContainer columns={1}>
								<NavigationMenu.ListItem
									title="UI Components"
									href="/components"
								>
									Pre-built components following design system principles.
								</NavigationMenu.ListItem>

								<NavigationMenu.ListItem
									title="Layout Components"
									href="/components/layout"
								>
									Responsive layout components for building app structure.
								</NavigationMenu.ListItem>

								<NavigationMenu.ListItem
									title="Navigation"
									href="/components/navigation"
								>
									Navigation components for seamless user experience.
								</NavigationMenu.ListItem>

								<NavigationMenu.ListItem title="Forms" href="/components/forms">
									Form components with validation and accessibility features.
								</NavigationMenu.ListItem>
							</NavigationMenu.ListContainer>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					{/* Simple Link Items */}
					<NavigationMenu.Item>
						<NavigationMenu.Link href="https://github.com/fyndx/universal-starter">
							<Text>GitHub</Text>
						</NavigationMenu.Link>
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Link href="/contact">
							<Text>Contact</Text>
						</NavigationMenu.Link>
					</NavigationMenu.Item>

					<NavigationMenu.Indicator />
				</NavigationMenu.List>

				<View
					style={{
						position: "absolute",
						display: "flex",
						justifyContent: "center",
						width: "100%",
						top: "100%",
						left: 0,
						// perspective: 2000,
					}}
				>
					<NavigationMenu.Viewport />
				</View>
			</NavigationMenu.Root>
		</View>
	);
};
