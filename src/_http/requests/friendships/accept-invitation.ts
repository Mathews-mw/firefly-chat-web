import { api } from '@/_http/api-client';

interface IRequest {
	invitationId: string;
}

interface IResponse {
	message: string;
}

export async function acceptInvitation({ invitationId }: IRequest) {
	const response = await api.patch(`friendships/invitation/${invitationId}/accept`).json<IResponse>();

	return response;
}
