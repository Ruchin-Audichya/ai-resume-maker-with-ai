const normalizeTrailingSlash = (url) => {
	if (!url) return "";
	return url.endsWith("/") ? url : `${url}/`;
};

const parseBooleanEnv = (value, fallbackValue) => {
	if (value === undefined) return fallbackValue;
	return String(value).toLowerCase() === "true";
};

const AUTH_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY || "";
const GEMINI_API_KEY =
	import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMENI_API_KEY || "";

const BACKEND_URL = normalizeTrailingSlash(
	import.meta.env.VITE_APP_URL || import.meta.env.VITE_BASE_URL || "http://localhost:5001"
);

const DEMO_AUTH_ENABLED = parseBooleanEnv(import.meta.env.VITE_DEMO_AUTH, true);

// Compatibility aliases to avoid breaking existing imports.
const GEMENI_API_KEY = GEMINI_API_KEY;
const VITE_APP_URL = BACKEND_URL;

export {
	AUTH_KEY,
	API_KEY,
	GEMINI_API_KEY,
	GEMENI_API_KEY,
	BACKEND_URL,
	DEMO_AUTH_ENABLED,
	VITE_APP_URL,
};
