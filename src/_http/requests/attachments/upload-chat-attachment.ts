import { api } from '@/_http/api-client';

export interface IUploadServiceOrderAttachmentRequest {
	formData: FormData;
}

interface IResponse {
	message: string;
	attachments: Array<IAttachment>;
}

export async function uploadChatAttachments({ formData }: IUploadServiceOrderAttachmentRequest): Promise<IResponse> {
	const data = await api
		.post('attachments/chat', {
			body: formData,
		})
		.json<IResponse>();

	return data;
}
