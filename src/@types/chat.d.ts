type IRoomType = 'PRIVATE' | 'GROUP';

interface IRoom {
	id: string;
	type: IRoomType;
	created_at: Date;
}

interface IParticipant {
	id: string;
	room_id: string;
	user_id: string;
}

interface IChatMessage {
	id: string;
	room_id: string;
	sender_id: string;
	content: string;
	is_deleted: boolean;
	created_at: Date;
	updated_at?: Date | null;
}

interface IReadReceipt {
	user_id: string;
	message_id: string;
	read_at: Date;
}

interface IParticipantWithUser extends IParticipant {
	user: IUser;
}

interface IRoomWithParticipants extends IRoom {
	participants: Array<IParticipantWithUser>;
	chat_messages: Array<IChatMessageWithAuthor>;
}

interface IChatMessageWithAuthor extends IChatMessage {
	author: IUser;
	read_receipts: Array<IReadReceipt>;
	attachments: Array<IAttachment>;
}

interface IRoomDetails {
	participants: Array<IParticipantWithUser>;
	attachments: Partial<Record<AttachmentType, IAttachment[]>>;
}
