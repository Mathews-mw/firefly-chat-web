import { api } from '@/_http/api-client';
import { SearchParamsOption } from 'ky';

interface IRequest {
	status?: IInvitationStatus;
}

interface IResponse {
	amount: number;
}

export async function getUserInvitationsAmount({ status }: IRequest): Promise<IResponse> {
	const params = {
		status,
	};

	const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

	const response = await api
		.get('friendships/invitation/user/amount', {
			searchParams: cleanParams,
		})
		.json<IResponse>();

	return response;
}
