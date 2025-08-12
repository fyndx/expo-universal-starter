// CORS configuration
const CORS_CONFIG = {
	allowedOrigins: ["http://localhost:8081"],
	allowedPatterns: [/^https:\/\/[a-zA-Z0-9-]+\.expo\.app$/],
};

export const isOriginAllowed = (origin: string): boolean => {
	// Check static origins
	const isOriginInList = CORS_CONFIG.allowedOrigins.some((allowedOrigin) => {
		if (origin.includes(allowedOrigin)) {
			return true;
		}
		return false;
	});

	if (isOriginInList) {
		return true;
	}

	// Check pattern-based origins
	return CORS_CONFIG.allowedPatterns.some((pattern) => pattern.test(origin));
};
