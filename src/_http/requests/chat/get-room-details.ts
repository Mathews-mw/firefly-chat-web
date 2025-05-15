import { SearchParamsOption } from 'ky';
import { api } from '@/_http/api-client';

interface IRequest {
	roomId: string;
	isPrivate?: boolean;
}

export async function getRoomDetails({ roomId, isPrivate }: IRequest): Promise<IRoomDetails> {
	const params = {
		is_private: isPrivate,
	};

	const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

	const response = await api
		.get(`chat/room/${roomId}/details`, {
			searchParams: cleanParams,
		})
		.json<IRoomDetails>();

	return response;
}
