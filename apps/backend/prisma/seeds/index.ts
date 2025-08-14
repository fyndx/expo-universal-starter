import { auth } from "@/src/lib/auth";
import { PrismaClient } from "../generated/client";

const prisma = new PrismaClient();

async function main() {
	console.log("Starting database seed...");

	// Check if users already exist to avoid duplicates
	const existingAdmin = await prisma.user.findUnique({
		where: { email: "admin@example.com" },
	});

	if (existingAdmin) {
		console.log("Seed data already exists, skipping...");
		return;
	}

	// Create admin user with Better Auth
	const adminSignUp = await auth.api.signUpEmail({
		body: {
			email: "admin@example.com",
			password: "admin123",
			name: "Admin User",
			image: "https://avatars.githubusercontent.com/u/1?v=4",
		},
	});

	if (!adminSignUp?.user) {
		throw new Error("Failed to create admin user");
	}

	// Update admin user with role and verify email
	const adminUser = await prisma.user.update({
		where: { id: adminSignUp.user.id },
		data: {
			role: "admin",
			emailVerified: true,
		},
	});

	// Create regular user with Better Auth
	const userSignUp = await auth.api.signUpEmail({
		body: {
			email: "user@example.com",
			password: "user123",
			name: "John Doe",
			image: "https://avatars.githubusercontent.com/u/2?v=4",
		},
	});

	if (!userSignUp?.user) {
		throw new Error("Failed to create regular user");
	}

	// Update regular user with role and verify email
	const regularUser = await prisma.user.update({
		where: { id: userSignUp.user.id },
		data: {
			role: "user",
			emailVerified: true,
		},
	});

	// Create banned user with Better Auth
	const bannedSignUp = await auth.api.signUpEmail({
		body: {
			email: "banned@example.com",
			password: "banned123",
			name: "Banned User",
		},
	});

	if (!bannedSignUp?.user) {
		throw new Error("Failed to create banned user");
	}

	// Update banned user with ban information
	const bannedUser = await prisma.user.update({
		where: { id: bannedSignUp.user.id },
		data: {
			role: "user",
			banned: true,
			banReason: "Violating community guidelines",
			banExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		},
	});

	// Create unverified user with Better Auth
	const unverifiedSignUp = await auth.api.signUpEmail({
		body: {
			email: "unverified@example.com",
			password: "unverified123",
			name: "Jane Smith",
		},
	});

	if (!unverifiedSignUp?.user) {
		throw new Error("Failed to create unverified user");
	}

	const unverifiedUser = await prisma.user.update({
		where: { id: unverifiedSignUp.user.id },
		data: {
			role: "user",
		},
	});

	// Create active sessions using Better Auth
	await auth.api.signInEmail({
		body: {
			email: "admin@example.com",
			password: "admin123",
		},
		headers: {
			"user-agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
			"x-forwarded-for": "192.168.1.100",
		},
	});

	await auth.api.signInEmail({
		body: {
			email: "user@example.com",
			password: "user123",
		},
		headers: {
			"user-agent":
				"Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
			"x-forwarded-for": "192.168.1.101",
		},
	});

	// Create verification records for unverified user
	await prisma.verification.create({
		data: {
			id: "verification-email-1",
			identifier: unverifiedUser.email,
			value: "email_verification_token_123",
			expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	await prisma.verification.create({
		data: {
			id: "verification-password-reset-1",
			identifier: regularUser.email,
			value: "password_reset_token_456",
			expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	console.log("Database seeded successfully!");
	console.log("Created users:");
	console.log(`- Admin: ${adminUser.email} (${adminUser.id})`);
	console.log(`- Regular User: ${regularUser.email} (${regularUser.id})`);
	console.log(`- Banned User: ${bannedUser.email} (${bannedUser.id})`);
	console.log(
		`- Unverified User: ${unverifiedUser.email} (${unverifiedUser.id})`,
	);
	console.log("\nCredentials for testing:");
	console.log("- Admin: admin@example.com / admin123");
	console.log("- User: user@example.com / user123");
	console.log("- Banned: banned@example.com / banned123");
	console.log("- Unverified: unverified@example.com / unverified123");
}

main()
	.catch((e) => {
		console.error("Error seeding database:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
