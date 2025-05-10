import { SearchParamsOption } from 'ky';
import { api } from '@/_http/api-client';

interface IRequest {
	roomId: string;
	limit: number;
	cursor?: string;
	skip?: number;
}

export interface IListingUserMessagesByRoomResponse {
	cursor: ICursorResponse;
	chat_messages: Array<IChatMessageWithAuthor>;
}

export async function listingUserMessagesByRoom({
	roomId,
	limit,
	cursor,
	skip,
}: IRequest): Promise<IListingUserMessagesByRoomResponse> {
	const params = {
		limit,
		cursor,
		skip,
	};

	const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

	const response = await api
		.get(`chat/room/${roomId}/messages`, {
			searchParams: cleanParams,
		})
		.json<IListingUserMessagesByRoomResponse>();

	return response;
}
