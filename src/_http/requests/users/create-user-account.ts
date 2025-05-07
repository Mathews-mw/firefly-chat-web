import { api } from '@/_http/api-client';

interface IRequest {
	email: string;
	name: string;
	username: string;
	password: string;
}

interface IResponse {
	message: string;
	user_id: string;
}

export async function createUserAccount({ email, name, password, username }: IRequest) {
	const response = await api
		.post('users', {
			json: {
				email,
				name,
				username,
				password,
			},
		})
		.json<IResponse>();

	return response;
}
