import { SearchParamsOption } from 'ky';
import { api } from '@/_http/api-client';

interface IRequest {
	limit: number;
	cursor?: string;
	skip?: number;
}

interface IResponse {
	cursor: ICursorResponse;
	rooms: Array<IRoomWithParticipants>;
}

export async function listingAllUserPrivateRooms({ limit, cursor, skip }: IRequest): Promise<IResponse> {
	const params = {
		limit,
		cursor,
		skip,
	};

	const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

	const response = await api
		.get('chat/room/private/user', {
			searchParams: cleanParams,
		})
		.json<IResponse>();

	return response;
}
