import { toast } from 'sonner';
import { ApiExceptionsError } from './api-exceptions-error';

interface IParams {
	error: unknown;
	description?: string;
	showErrorCode?: boolean;
}

export function errorHandler({ error, description, showErrorCode }: IParams) {
	console.warn('Unexpected request error: ', error);

	if (error instanceof ApiExceptionsError) {
		const msg = description ? description : showErrorCode ? `Code: ${error.code}` : undefined;

		return toast.error(error.message, {
			duration: 8000,
			description: msg,
		});
	}

	throw error;
}
