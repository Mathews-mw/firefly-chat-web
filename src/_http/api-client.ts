import ky, { HTTPError } from 'ky';
import { env } from '@/env';
import { type CookiesFn, getCookie } from 'cookies-next';
import { ApiExceptionsError } from './error-handler/api-exceptions-error';

export const api = ky.create({
	prefixUrl: `${env.NEXT_PUBLIC_API_BASE_URL}/api`,
	credentials: 'include',
	hooks: {
		beforeError: [
			async (error) => {
				if (error instanceof HTTPError) {
					if (error.response && error.response.body) {
						const errorJson = await error.response.json<{ code: string; message: string }>();

						throw new ApiExceptionsError(errorJson.message, errorJson.code);
					}
				}

				return error;
			},
		],
		beforeRequest: [
			async (request) => {
				let cookieStore: CookiesFn | undefined;

				// window === 'undefined' => indica que o trecho de código está rodando no server side
				if (typeof window === 'undefined') {
					const { cookies: serverCookies } = await import('next/headers');
					cookieStore = serverCookies;
				}

				const token = await getCookie('@firefly_chat_session_token', { cookies: cookieStore });

				if (token) {
					request.headers.set('Authorization', `Bearer ${token}`);
				}
			},
		],
	},
});
