import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

interface PricingTier {
	id: string;
	name: string;
	price: string;
	originalPrice?: string;
	period: string;
	description: string;
	features: string[];
	buttonText: string;
	popular?: boolean;
	savings?: string;
	icon: string;
}

const PricingPage = () => {
	const { theme } = useUnistyles();
	const [isAnnual, setIsAnnual] = useState(false);

	const pricingTiers: PricingTier[] = [
		{
			id: "monthly",
			name: "Pro Monthly",
			price: "$29",
			period: "/month",
			description: "Perfect for getting started with professional features",
			features: [
				"Up to 5 team members",
				"Advanced analytics",
				"Priority support",
				"Custom integrations",
				"Advanced reporting",
				"API access",
			],
			buttonText: "Start Monthly Plan",
			icon: "🕐",
		},
		{
			id: "annual",
			name: "Pro Annual",
			price: "$290",
			originalPrice: "$348",
			period: "/year",
			description: "Save 17% with annual billing - most popular choice",
			features: [
				"Everything in Monthly",
				"Up to 25 team members",
				"Advanced security features",
				"Custom branding",
				"Dedicated account manager",
				"Advanced workflows",
				"Priority feature requests",
			],
			buttonText: "Start Annual Plan",
			popular: true,
			savings: "Save $58/year",
			icon: "⭐",
		},
		{
			id: "lifetime",
			name: "Lifetime Access",
			price: "$999",
			period: "one-time",
			description: "Pay once, use forever - ultimate value",
			features: [
				"Everything in Annual",
				"Unlimited team members",
				"Lifetime updates",
				"VIP support",
				"Beta access",
				"Custom development",
				"White-label options",
				"Revenue sharing program",
			],
			buttonText: "Get Lifetime Access",
			savings: "Best Value",
			icon: "♾️",
		},
	];

	const commonFeatures = [
		"SSL certificates",
		"99.9% uptime guarantee",
		"Mobile app access",
		"Email support",
		"Basic analytics",
		"Standard integrations",
	];

	const PricingCard = ({ tier }: { tier: PricingTier }) => (
		<View style={[styles.card, tier.popular && styles.popularCard]}>
			{tier.popular && (
				<View style={styles.popularBadge}>
					<Text style={styles.popularBadgeText}>Most Popular</Text>
				</View>
			)}

			<View style={styles.cardHeader}>
				<View style={styles.cardHeaderTop}>
					<View
						style={[
							styles.iconContainer,
							tier.popular && styles.popularIconContainer,
						]}
					>
						<Text style={styles.iconText}>{tier.icon}</Text>
					</View>
					{tier.savings && (
						<View
							style={[
								styles.savingsBadge,
								tier.popular && styles.popularSavingsBadge,
							]}
						>
							<Text style={styles.savingsBadgeText}>{tier.savings}</Text>
						</View>
					)}
				</View>

				<Text style={[styles.tierName, tier.popular && styles.popularTierName]}>
					{tier.name}
				</Text>

				<View style={styles.priceContainer}>
					<Text style={[styles.price, tier.popular && styles.popularPrice]}>
						{tier.price}
					</Text>
					<Text style={styles.period}>{tier.period}</Text>
				</View>

				{tier.originalPrice && (
					<Text style={styles.originalPrice}>{tier.originalPrice}</Text>
				)}

				<Text style={styles.description}>{tier.description}</Text>
			</View>

			<View style={styles.cardBody}>
				<TouchableOpacity
					style={[
						styles.button,
						tier.popular ? styles.primaryButton : styles.secondaryButton,
					]}
					onPress={() => console.log(`Selected: ${tier.name}`)}
				>
					<Text
						style={[
							styles.buttonText,
							tier.popular
								? styles.primaryButtonText
								: styles.secondaryButtonText,
						]}
					>
						{tier.buttonText}
					</Text>
				</TouchableOpacity>

				<View style={styles.featuresList}>
					{tier.features.map((feature, index) => (
						<View key={`${tier.id}-${index}`} style={styles.featureItem}>
							<View style={styles.checkIcon}>
								<Text style={styles.checkIconText}>✓</Text>
							</View>
							<Text style={styles.featureText}>{feature}</Text>
						</View>
					))}
				</View>
			</View>
		</View>
	);

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.content}>
				{/* Header Section */}
				<View style={styles.header}>
					<Text style={styles.title}>Choose Your Plan</Text>
					<Text style={styles.subtitle}>
						Select the perfect plan for your needs. Start with our flexible
						monthly option, save with annual billing, or get lifetime access for
						the ultimate value.
					</Text>

					{/* Billing Toggle */}
					<View style={styles.toggleContainer}>
						<Text
							style={[styles.toggleText, !isAnnual && styles.activeToggleText]}
						>
							Monthly
						</Text>
						<Switch
							value={isAnnual}
							onValueChange={setIsAnnual}
							trackColor={{ false: "#e2e8f0" }}
							thumbColor={isAnnual ? "#fff" : "#f4f3f4"}
						/>
						<View style={styles.annualToggleContainer}>
							<Text
								style={[styles.toggleText, isAnnual && styles.activeToggleText]}
							>
								Annual
							</Text>
							<View style={styles.savingsHighlight}>
								<Text style={styles.savingsHighlightText}>Save 17%</Text>
							</View>
						</View>
					</View>
				</View>

				{/* Pricing Cards */}
				<View style={styles.cardsContainer}>
					{pricingTiers.map((tier) => (
						<PricingCard key={tier.id} tier={tier} />
					))}
				</View>

				{/* Common Features Section */}
				<View style={styles.commonFeaturesContainer}>
					<Text style={styles.commonFeaturesTitle}>All Plans Include</Text>
					<View style={styles.separator} />
					<View style={styles.commonFeaturesList}>
						{commonFeatures.map((feature) => (
							<View
								key={`common-feature-${feature}`}
								style={styles.commonFeatureItem}
							>
								<View style={styles.commonCheckIcon}>
									<Text style={styles.commonCheckIconText}>✓</Text>
								</View>
								<Text style={styles.commonFeatureText}>{feature}</Text>
							</View>
						))}
					</View>
				</View>

				{/* FAQ Section */}
				<View style={styles.faqContainer}>
					<Text style={styles.faqTitle}>Frequently Asked Questions</Text>
					<View style={styles.faqList}>
						{[
							{
								question: "Can I change my plan later?",
								answer:
									"Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
							},
							{
								question: "What payment methods do you accept?",
								answer:
									"We accept all major credit cards, PayPal, and bank transfers for annual plans.",
							},
							{
								question: "Is there a refund policy?",
								answer:
									"Yes, we offer a 30-day money-back guarantee for all plans. No questions asked.",
							},
						].map((faq) => (
							<View key={`faq-${faq.question}`} style={styles.faqItem}>
								<Text style={styles.faqQuestion}>{faq.question}</Text>
								<Text style={styles.faqAnswer}>{faq.answer}</Text>
							</View>
						))}
					</View>
				</View>

				{/* CTA Section */}
				<View style={styles.ctaContainer}>
					<Text style={styles.ctaTitle}>Still have questions?</Text>
					<TouchableOpacity
						style={styles.ctaButton}
						onPress={() => console.log("Contact sales")}
					>
						<Text style={styles.ctaButtonText}>📞 Contact Our Sales Team</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create((theme) => ({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
	content: {
		paddingHorizontal: {
			xs: 16,
			sm: 24,
			md: 32,
			lg: 48,
		},
		paddingVertical: {
			xs: 24,
			sm: 32,
			md: 48,
		},
	},
	header: {
		alignItems: "center",
		marginBottom: {
			xs: 32,
			sm: 48,
		},
	},
	title: {
		fontSize: {
			xs: 28,
			sm: 36,
			md: 44,
		},
		fontWeight: "700",
		color: "#1a202c",
		textAlign: "center",
		marginBottom: 16,
	},
	subtitle: {
		fontSize: {
			xs: 16,
			sm: 18,
			md: 20,
		},
		color: "#718096",
		textAlign: "center",
		lineHeight: 24,
		maxWidth: 600,
		marginBottom: 32,
	},
	toggleContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f7fafc",
		borderRadius: 12,
		padding: 16,
		gap: 16,
	},
	toggleText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#718096",
	},
	activeToggleText: {
		color: "#1a202c",
	},
	annualToggleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	savingsHighlight: {
		backgroundColor: "#48bb78",
		borderRadius: 4,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	savingsHighlightText: {
		color: "#ffffff",
		fontSize: 12,
		fontWeight: "600",
	},
	cardsContainer: {
		flexDirection: {
			xs: "column",
			lg: "row",
		},
		alignItems: {
			xs: "center",
			lg: "flex-start",
		},
		justifyContent: "center",
		gap: {
			xs: 24,
			lg: 32,
		},
		marginBottom: {
			xs: 48,
			sm: 64,
		},
	},
	card: {
		backgroundColor: "#ffffff",
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#e2e8f0",
		padding: 24,
		width: {
			xs: "100%",
			sm: 350,
		},
		maxWidth: 350,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	popularCard: {
		borderWidth: 2,
		backgroundColor: "#fef9ff",
		transform: [{ scale: 1.05 }],
	},
	popularBadge: {
		position: "absolute",
		top: 0,
		right: 0,
		borderBottomLeftRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 6,
		zIndex: 1,
	},
	popularBadgeText: {
		color: "#ffffff",
		fontSize: 12,
		fontWeight: "600",
	},
	cardHeader: {
		marginBottom: 24,
	},
	cardHeaderTop: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	iconContainer: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#e2e8f0",
		alignItems: "center",
		justifyContent: "center",
	},
	popularIconContainer: {},
	iconText: {
		fontSize: 24,
	},
	savingsBadge: {
		backgroundColor: "#ed8936",
		borderRadius: 4,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	popularSavingsBadge: {
		backgroundColor: "#48bb78",
	},
	savingsBadgeText: {
		color: "#ffffff",
		fontSize: 12,
		fontWeight: "600",
	},
	tierName: {
		fontSize: 24,
		fontWeight: "700",
		color: "#1a202c",
		marginBottom: 8,
	},
	popularTierName: {
		color: "#ff1ff4",
	},
	priceContainer: {
		flexDirection: "row",
		alignItems: "baseline",
		marginBottom: 8,
	},
	price: {
		fontSize: 36,
		fontWeight: "700",
		color: "#1a202c",
	},
	popularPrice: {
		color: "#ff1ff4",
	},
	period: {
		fontSize: 16,
		color: "#718096",
		marginLeft: 8,
	},
	originalPrice: {
		fontSize: 16,
		color: "#718096",
		textDecorationLine: "line-through",
		marginBottom: 8,
	},
	description: {
		fontSize: 14,
		color: "#718096",
		lineHeight: 20,
	},
	cardBody: {
		gap: 24,
	},
	button: {
		borderRadius: 8,
		paddingVertical: 16,
		paddingHorizontal: 24,
		alignItems: "center",
	},
	primaryButton: {
		backgroundColor: "#ff1ff4",
	},
	secondaryButton: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: "#e2e8f0",
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "600",
	},
	primaryButtonText: {
		color: "#ffffff",
	},
	secondaryButtonText: {
		color: "#1a202c",
	},
	featuresList: {
		gap: 12,
	},
	featureItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	checkIcon: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: "#48bb78",
		alignItems: "center",
		justifyContent: "center",
	},
	checkIconText: {
		color: "#ffffff",
		fontSize: 12,
		fontWeight: "600",
	},
	featureText: {
		fontSize: 14,
		color: "#4a5568",
		flex: 1,
	},
	commonFeaturesContainer: {
		backgroundColor: "#f7fafc",
		borderRadius: 16,
		padding: 32,
		marginBottom: {
			xs: 48,
			sm: 64,
		},
	},
	commonFeaturesTitle: {
		fontSize: 24,
		fontWeight: "700",
		color: "#1a202c",
		textAlign: "center",
		marginBottom: 16,
	},
	separator: {
		height: 1,
		backgroundColor: "#e2e8f0",
		marginBottom: 24,
	},
	commonFeaturesList: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 16,
	},
	commonFeatureItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		minWidth: {
			xs: "45%",
			sm: 200,
		},
	},
	commonCheckIcon: {
		width: 16,
		height: 16,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	commonCheckIconText: {
		color: "#ffffff",
		fontSize: 10,
		fontWeight: "600",
	},
	commonFeatureText: {
		fontSize: 14,
		color: "#4a5568",
	},
	faqContainer: {
		marginBottom: {
			xs: 48,
			sm: 64,
		},
	},
	faqTitle: {
		fontSize: 24,
		fontWeight: "700",
		color: "#1a202c",
		textAlign: "center",
		marginBottom: 24,
	},
	faqList: {
		gap: 16,
	},
	faqItem: {
		backgroundColor: "#ffffff",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#e2e8f0",
		padding: 20,
	},
	faqQuestion: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1a202c",
		marginBottom: 8,
	},
	faqAnswer: {
		fontSize: 14,
		color: "#718096",
		lineHeight: 20,
	},
	ctaContainer: {
		alignItems: "center",
		gap: 16,
	},
	ctaTitle: {
		fontSize: 24,
		fontWeight: "700",
		color: "#1a202c",
		textAlign: "center",
	},
	ctaButton: {
		backgroundColor: "#ff1ff4",
		borderRadius: 8,
		paddingVertical: 16,
		paddingHorizontal: 32,
	},
	ctaButtonText: {
		color: "#ffffff",
		fontSize: 16,
		fontWeight: "600",
	},
}));

export default PricingPage;
