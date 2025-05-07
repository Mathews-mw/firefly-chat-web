import { api } from '@/_http/api-client';

export async function listingUserSentInvitations(): Promise<IInvitationWithReceiver[]> {
	const response = await api.get('friendships/invitation/user/sent').json<IInvitationWithReceiver[]>();

	return response;
}
