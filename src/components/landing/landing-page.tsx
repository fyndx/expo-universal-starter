import { Link } from "expo-router";
import {
	ChevronRight,
	Code,
	Shield,
	Smartphone,
	Star,
	Users,
	Zap,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { Footer } from "../layouts/default/Footer";
import { Header } from "../layouts/default/Header";

export function LandingPage() {
	const [scrollY, setScrollY] = useState(0);

	const handleScroll = (event: {
		nativeEvent: { contentOffset: { y: number } };
	}) => {
		setScrollY(event.nativeEvent.contentOffset.y);
	};

	return (
		<View className="flex-1 bg-background">
			<Header isScrolled={scrollY > 50} />
			<ScrollView
				className="flex-1"
				onScroll={handleScroll}
				scrollEventThrottle={16}
			>
				<HeroSection />
				<FeaturesSection />
				<PricingSection />
				<TestimonialsSection />
				<FAQSection />
				<Footer />
			</ScrollView>
		</View>
	);
}

function HeroSection() {
	return (
		<View className="min-h-screen relative px-4 py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
			{/* Background Pattern */}
			<View className="absolute inset-0 opacity-5">
				<View className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,theme(colors.primary)_1px,transparent_1px)] bg-[length:24px_24px]" />
			</View>

			<View className="relative max-w-4xl mx-auto text-center">
				{/* Badge */}
				<View className="inline-flex items-center bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
					<Users className="w-4 h-4 text-primary mr-2" />
					<Text className="text-sm font-medium text-primary">
						1000+ Happy Developers
					</Text>
				</View>

				{/* Title */}
				<Text className="text-4xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
					Introducing{"\n"}
					<Text className="text-primary">Universal Starter</Text>
				</Text>

				{/* Subtitle */}
				<Text className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
					Boost your productivity with the ultimate React Native + Web starter
					kit. Build once, deploy everywhere with modern tooling and best
					practices.
				</Text>

				{/* CTA Buttons */}
				<View className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
					<Link href="/(public)/auth/sign-up" asChild>
						<Pressable className="bg-primary hover:bg-primary/90 active:bg-primary/80 px-8 py-4 rounded-lg flex-row items-center">
							<Text className="text-primary-foreground font-semibold text-lg mr-2">
								Get Started Free
							</Text>
							<ChevronRight className="w-5 h-5 text-primary-foreground" />
						</Pressable>
					</Link>

					<Pressable className="border border-border bg-background hover:bg-muted active:bg-muted/80 px-8 py-4 rounded-lg flex-row items-center">
						<Text className="text-foreground font-semibold text-lg mr-2">
							Watch Demo
						</Text>
						<View className="w-5 h-5 bg-primary rounded-full items-center justify-center">
							<Text className="text-primary-foreground text-xs">▶</Text>
						</View>
					</Pressable>
				</View>

				{/* Hero Image/Icon */}
				<View className="relative">
					<View className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-3xl items-center justify-center shadow-2xl">
						<Smartphone className="w-16 h-16 text-primary-foreground" />
					</View>

					{/* Floating Elements */}
					<View className="absolute -top-4 -left-8 w-16 h-16 bg-secondary/20 rounded-2xl items-center justify-center">
						<Code className="w-8 h-8 text-secondary" />
					</View>
					<View className="absolute -bottom-4 -right-8 w-16 h-16 bg-primary/20 rounded-2xl items-center justify-center">
						<Zap className="w-8 h-8 text-primary" />
					</View>
				</View>
			</View>
		</View>
	);
}

function FeaturesSection() {
	const features = [
		{
			id: "cross-platform",
			icon: Smartphone,
			title: "Cross-Platform Ready",
			description:
				"One codebase that runs seamlessly on iOS, Android, and Web with platform-specific optimizations.",
		},
		{
			id: "fast-dev",
			icon: Zap,
			title: "Lightning Fast Development",
			description:
				"Built with Expo Router, Legend State, and NativeWind for rapid development and optimal performance.",
		},
		{
			id: "production-ready",
			icon: Shield,
			title: "Production Ready",
			description:
				"Includes authentication, state management, testing setup, and deployment configurations out of the box.",
		},
		{
			id: "modern-stack",
			icon: Code,
			title: "Modern Tech Stack",
			description:
				"TypeScript, Tailwind CSS, Better Auth, and reactive state management with Legend State.",
		},
	];

	return (
		<View className="px-4 py-16 sm:py-24 bg-muted/30">
			<View className="max-w-6xl mx-auto">
				<View className="text-center mb-16">
					<Text className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
						Why Choose Universal Starter?
					</Text>
					<Text className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Everything you need to build and ship your next mobile and web
						application faster than ever.
					</Text>
				</View>

				<View className="grid grid-cols-1 sm:grid-cols-2 gap-8">
					{features.map((feature) => (
						<View
							key={feature.id}
							className="bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
						>
							<View className="w-12 h-12 bg-primary/10 rounded-lg items-center justify-center mb-4">
								<feature.icon className="w-6 h-6 text-primary" />
							</View>
							<Text className="text-xl font-semibold text-foreground mb-3">
								{feature.title}
							</Text>
							<Text className="text-muted-foreground leading-relaxed">
								{feature.description}
							</Text>
						</View>
					))}
				</View>
			</View>
		</View>
	);
}

function PricingSection() {
	const plans = [
		{
			id: "free",
			name: "Free",
			price: "$0",
			period: "forever",
			description: "Perfect for learning and personal projects",
			features: [
				{ id: "template", text: "Complete starter template" },
				{ id: "auth", text: "Basic authentication" },
				{ id: "cross-platform", text: "Cross-platform support" },
				{ id: "community", text: "Community support" },
				{ id: "license", text: "Open source license" },
			],
			cta: "Get Started",
			popular: false,
		},
		{
			id: "pro",
			name: "Pro",
			price: "$49",
			period: "one-time",
			description: "Everything you need for professional development",
			features: [
				{ id: "free-all", text: "Everything in Free" },
				{ id: "components", text: "Premium components library" },
				{ id: "advanced-auth", text: "Advanced auth features" },
				{ id: "priority", text: "Priority support" },
				{ id: "commercial", text: "Commercial license" },
				{ id: "deployment", text: "Deployment guides" },
				{ id: "updates", text: "Lifetime updates" },
			],
			cta: "Upgrade to Pro",
			popular: true,
		},
	];

	return (
		<View className="px-4 py-16 sm:py-24 bg-background">
			<View className="max-w-4xl mx-auto">
				<View className="text-center mb-16">
					<Text className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
						Simple, Transparent Pricing
					</Text>
					<Text className="text-lg text-muted-foreground">
						Choose the plan that fits your needs. Upgrade anytime.
					</Text>
				</View>

				<View className="grid grid-cols-1 sm:grid-cols-2 gap-8">
					{plans.map((plan) => (
						<View
							key={plan.id}
							className={`relative bg-background border-2 rounded-xl p-8 ${
								plan.popular ? "border-primary shadow-lg" : "border-border"
							}`}
						>
							{plan.popular && (
								<View className="absolute -top-3 left-1/2 transform -translate-x-1/2">
									<View className="bg-primary px-4 py-1 rounded-full">
										<Text className="text-primary-foreground text-sm font-medium">
											Most Popular
										</Text>
									</View>
								</View>
							)}

							<View className="text-center mb-6">
								<Text className="text-2xl font-bold text-foreground mb-2">
									{plan.name}
								</Text>
								<View className="flex-row items-baseline justify-center">
									<Text className="text-4xl font-bold text-foreground">
										{plan.price}
									</Text>
									<Text className="text-muted-foreground ml-2">
										/{plan.period}
									</Text>
								</View>
								<Text className="text-muted-foreground mt-2">
									{plan.description}
								</Text>
							</View>

							<View className="space-y-3 mb-8">
								{plan.features.map((feature) => (
									<View key={feature.id} className="flex-row items-center">
										<View className="w-5 h-5 bg-primary/10 rounded-full items-center justify-center mr-3">
											<Text className="text-primary text-xs">✓</Text>
										</View>
										<Text className="text-foreground flex-1">
											{feature.text}
										</Text>
									</View>
								))}
							</View>

							<Link href="/(public)/auth/sign-up" asChild>
								<Pressable
									className={`w-full py-3 rounded-lg items-center ${
										plan.popular
											? "bg-primary hover:bg-primary/90"
											: "bg-muted hover:bg-muted/80 border border-border"
									}`}
								>
									<Text
										className={`font-semibold ${
											plan.popular
												? "text-primary-foreground"
												: "text-foreground"
										}`}
									>
										{plan.cta}
									</Text>
								</Pressable>
							</Link>
						</View>
					))}
				</View>
			</View>
		</View>
	);
}

function TestimonialsSection() {
	const testimonials = [
		{
			id: "sarah-chen",
			name: "Sarah Chen",
			role: "Lead Developer",
			company: "TechFlow Inc",
			avatar: "👩‍💻",
			quote:
				"Universal Starter saved us months of setup time. The architecture is solid and the developer experience is amazing.",
			rating: 5,
		},
		{
			id: "marcus-rodriguez",
			name: "Marcus Rodriguez",
			role: "Founder",
			company: "StartupLab",
			avatar: "👨‍🚀",
			quote:
				"Finally, a starter kit that actually works across all platforms. Our team can focus on building features instead of configuration.",
			rating: 5,
		},
		{
			id: "emily-thompson",
			name: "Emily Thompson",
			role: "Mobile Architect",
			company: "Digital Solutions",
			avatar: "👩‍🎨",
			quote:
				"The integration of Legend State and NativeWind makes state management and styling a breeze. Highly recommended!",
			rating: 5,
		},
	];

	return (
		<View className="px-4 py-16 sm:py-24 bg-muted/20">
			<View className="max-w-6xl mx-auto">
				<View className="text-center mb-16">
					<Text className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
						What Our Customers Say
					</Text>
					<Text className="text-lg text-muted-foreground">
						Join thousands of developers who trust Universal Starter
					</Text>
				</View>

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					className="sm:grid sm:grid-cols-3 sm:gap-8"
				>
					{testimonials.map((testimonial) => (
						<View
							key={testimonial.id}
							className="bg-background border border-border rounded-xl p-6 mr-4 sm:mr-0 w-80 sm:w-auto shadow-sm"
						>
							{/* Rating */}
							<View className="flex-row mb-4">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star
										key={`star-${testimonial.id}-${i}`}
										className="w-4 h-4 text-yellow-500 fill-current"
									/>
								))}
							</View>

							{/* Quote */}
							<Text className="text-foreground leading-relaxed mb-6 italic">
								"{testimonial.quote}"
							</Text>

							{/* Author */}
							<View className="flex-row items-center">
								<View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mr-4">
									<Text className="text-2xl">{testimonial.avatar}</Text>
								</View>
								<View className="flex-1">
									<Text className="font-semibold text-foreground">
										{testimonial.name}
									</Text>
									<Text className="text-sm text-muted-foreground">
										{testimonial.role}
									</Text>
									<Text className="text-sm text-muted-foreground">
										{testimonial.company}
									</Text>
								</View>
							</View>
						</View>
					))}
				</ScrollView>
			</View>
		</View>
	);
}

function FAQSection() {
	const faqs = [
		{
			id: "platforms",
			question: "What platforms does Universal Starter support?",
			answer:
				"Universal Starter supports iOS, Android, and Web out of the box. The same codebase runs on all three platforms with platform-specific optimizations where needed.",
		},
		{
			id: "experience",
			question: "Do I need experience with React Native to use this?",
			answer:
				"Basic React knowledge is recommended. The starter includes comprehensive documentation and examples to help you get started quickly, even if you're new to React Native.",
		},
		{
			id: "authentication",
			question: "What's included in the authentication system?",
			answer:
				"We use Better Auth which provides email/password authentication, social logins, session management, and security features like CSRF protection and rate limiting.",
		},
		{
			id: "customization",
			question: "Can I customize the UI components and styling?",
			answer:
				"Absolutely! The UI is built with NativeWind (Tailwind for React Native) and react-native-reusables, making it easy to customize colors, spacing, and components to match your brand.",
		},
		{
			id: "support",
			question: "Is there ongoing support and updates?",
			answer:
				"Yes! The starter kit receives regular updates with new features, security patches, and improvements. Pro users get priority support and early access to new features.",
		},
	];

	return (
		<View className="px-4 py-16 sm:py-24 bg-background">
			<View className="w-full max-w-3xl self-center">
				<View className="text-center mb-16">
					<Text className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
						Frequently Asked Questions
					</Text>
					<Text className="text-lg text-muted-foreground">
						Everything you need to know about Universal Starter
					</Text>
				</View>

				<Accordion type="single" collapsible className="w-full">
					{faqs.map((faq, index) => (
						<AccordionItem
							key={faq.id}
							value={faq.id}
							className={`w-full border border-border rounded-lg bg-background  ${
								index > 0 ? "mt-4" : ""
							}`}
						>
							<AccordionTrigger className="w-full px-6 py-4 hover:bg-muted/50">
								<Text className="text-lg font-medium text-foreground text-left">
									{faq.question}
								</Text>
							</AccordionTrigger>
							<AccordionContent className="w-full px-6 pb-6">
								<Text className="text-muted-foreground leading-relaxed">
									{faq.answer}
								</Text>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>

				{/* CTA at bottom */}
				<View className="text-center mt-16">
					<Text className="text-muted-foreground mb-6">
						Still have questions? We're here to help.
					</Text>
					<Link href="/(public)/auth/sign-up" asChild>
						<Pressable className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-lg inline-flex">
							<Text className="text-primary-foreground font-semibold">
								Get Started Today
							</Text>
						</Pressable>
					</Link>
				</View>
			</View>
		</View>
	);
}
