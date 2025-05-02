import { toast } from 'sonner';
import { ApiExceptionsError } from './api-exceptions-error';

export function errorHandler(error: unknown) {
	// console.warn('Unexpected request error: ', error);

	console.log('typeof error: ', error instanceof Error);

	if (error instanceof ApiExceptionsError) {
		return toast.error(error.message, {
			duration: 8000,
			description: `Cod: ${error.code}`,
		});
	}

	throw error;
}
