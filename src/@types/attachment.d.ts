type AttachmentType = 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'FILE' | 'AUDIO';

interface IAttachment {
	id: string;
	title: string;
	url: string;
	room_id?: string | null;
	message_id?: string | null;
	type: AttachmentType;
}
