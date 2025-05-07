import { api } from '@/_http/api-client';

export async function getUserProfile(): Promise<IUser> {
	const response = await api.get('users/me').json<IUser>();

	return response;
}
