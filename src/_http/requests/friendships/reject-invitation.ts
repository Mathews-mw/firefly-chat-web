import { api } from '@/_http/api-client';

interface IRequest {
	invitationId: string;
}

interface IResponse {
	message: string;
}

export async function rejectInvitation({ invitationId }: IRequest) {
	const response = await api.patch(`friendships/invitation/${invitationId}/reject`).json<IResponse>();

	return response;
}
