import { api } from '@/_http/api-client';

interface IRequest {
	username: string;
}

interface IResponse {
	message: string;
	invitation_id: string;
}

export async function sendInvitation({ username }: IRequest) {
	const response = await api
		.post('friendships/invitation', {
			json: {
				username,
			},
		})
		.json<IResponse>();

	return response;
}
