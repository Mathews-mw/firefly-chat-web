import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
	server: {
		APP_URL: z.string().url(),
		AUTH_COOKIE_NAME: z.string(),
	},
	client: {
		NEXT_PUBLIC_API_BASE_URL: z.string().url(),
		NEXT_PUBLIC_WS_BASE_URL: z.string().url(),
	},

	runtimeEnv: {
		APP_URL: process.env.APP_URL,
		AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
		NEXT_PUBLIC_WS_BASE_URL: process.env.NEXT_PUBLIC_WS_BASE_URL,
	},
});
