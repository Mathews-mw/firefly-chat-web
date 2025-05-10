import { api } from '@/_http/api-client';

interface IRequest {
	guestId: string;
}

interface IResponse {
	message: string;
	room_id: string;
}

export async function createRoom({ guestId }: IRequest) {
	const response = await api
		.post('chat/room', {
			json: {
				guest_id: guestId,
			},
		})
		.json<IResponse>();

	return response;
}
