import { api } from '@/_http/api-client';

export async function listingUserPendingInvitations(): Promise<IInvitationWithSender[]> {
	const response = await api.get('friendships/invitation/user/pending').json<IInvitationWithSender[]>();

	return response;
}
