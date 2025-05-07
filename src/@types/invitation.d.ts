type IInvitationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

interface IInvitation {
	id: string;
	sender_id: string;
	receiver_id: string;
	status: IInvitationStatus;
	replied_at?: Date | null;
	created_at: Date;
}

interface IInvitationWithSender extends IInvitation {
	sender: IUser;
}

interface IInvitationWithReceiver extends IInvitation {
	receiver: IUser;
}
