export class ApiExceptionsError extends Error {
	readonly code: string;

	constructor(message?: string, code?: string) {
		super(message ?? 'Ocorreu um erro ao tentar processar a requisição');
		this.name = 'ApiExceptionsError';
		this.code = code ?? 'REQUEST_ERROR';
	}
}
