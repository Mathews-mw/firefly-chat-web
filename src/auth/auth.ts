import { env } from '@/env';
import { redirect } from 'next/navigation';
import { cookies as nextCookies } from 'next/headers';
import { getUserProfile } from '@/_http/requests/users/get-user-profile';

export async function auth() {
	const cookies = await nextCookies();

	const token = cookies.get(env.AUTH_COOKIE_NAME)?.value;

	if (!token) {
		redirect('/sign-in');
	}

	try {
		const user = await getUserProfile();

		return { user };
	} catch (error) {
		console.log('auth error: ', error);
	}

	redirect('/api/auth/sign-out');
}

export async function isAuthenticated() {
	const cookies = await nextCookies();

	return !!cookies.get(env.AUTH_COOKIE_NAME)?.value;
}
