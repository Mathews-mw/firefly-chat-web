import { api } from '@/_http/api-client';

interface IRequest {
	invitationId: string;
}

interface IResponse {
	message: string;
}

export async function deleteInvitation({ invitationId }: IRequest) {
	const response = await api.delete(`friendships/invitation/${invitationId}/delete`).json<IResponse>();

	return response;
}
