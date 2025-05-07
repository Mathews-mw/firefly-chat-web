import { SearchParamsOption } from 'ky';
import { api } from '@/_http/api-client';
import { IPagination } from '@/@types/pagination';

interface IRequest {
	page?: number;
	perPage?: string | number;
	search?: string;
}

interface IResponse {
	pagination: IPagination;
	friends: Array<IFriendshipWithFriend>;
}

export async function listingUserFriends({ page, perPage, search }: IRequest): Promise<IResponse> {
	const params = {
		page,
		per_page: perPage,
		search,
	};

	const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

	const response = await api
		.get('friendships/user', {
			searchParams: cleanParams,
		})
		.json<IResponse>();

	return response;
}
