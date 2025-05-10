import { SearchParamsOption } from 'ky';
import { api } from '@/_http/api-client';

interface IRequest {
	roomId: string;
	type: IRoomType;
	userId?: string;
}

export async function getRoom({ roomId, type, userId }: IRequest): Promise<IRoomWithParticipants> {
	const params = {
		type,
		user_id: userId,
	};

	const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

	const response = await api
		.get(`chat/room/${roomId}`, {
			searchParams: cleanParams,
		})
		.json<IRoomWithParticipants>();

	return response;
}
