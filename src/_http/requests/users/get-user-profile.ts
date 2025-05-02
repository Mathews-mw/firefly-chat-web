import { api } from '@/_http/api-client';

interface IResponse {
	user: IUser;
}

export async function getUserProfile(): Promise<IResponse> {
	const response = await api.get('users/me').json<IUser>();

	return {
		user: response,
	};
}
