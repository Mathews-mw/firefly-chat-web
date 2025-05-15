import { useCallback, useMemo, useState } from 'react';

export type UploadStatus = 'ready' | 'uploading' | 'done' | 'error';

export interface IUploadItem<T> {
	file: File;
	progress: number; // 0–100
	status: UploadStatus;
	response?: T; // resposta da API após upload concluído
}

interface IUseFileUploadResponse<T> {
	/** Sinalizador booleano que indica se algum arquivo está sendo carregado no momento. */
	isPending: boolean;
	/** Lista de arquivos com progresso, status e resposta */
	uploads: IUploadItem<T>[];
	/**
	 * Dispara o upload dos arquivos e retorna uma Promise que resolve
	 * com um array de respostas tipadas (T[]) quando todos terminarem.
	 */
	uploadFiles: () => Promise<T[]>;
	/**Seleciona os arquivos que serão enviados no upload */
	onSelectFiles: (filesToAdd: FileList | null) => void;
	/**Remove algum arquivo da lista */
	onRemoveFile: (fileName: string) => void;
	/** Limpa a lista de uploads */
	reset: () => void;
}

/**
 * Custom hook para upload de arquivos com progresso e resposta tipada.
 *
 * - Expõe um método uploadFiles(files) para disparar o upload de um ou vários arquivos;
 * - Mantém internamente um estado com a lista de arquivos, progresso e status;
 * - Já vem pré-configurado com xhr.withCredentials = true para enviar cookies (como seu JWT).
 *
 * @param url Endpoint para envio dos arquivos.
 * @generic T: Tipo da resposta da API após o upload.
 * @returns Retorna uploads, status global, função assíncrona de upload e reset.
 */
export function useFileUpload<T>(url: string): IUseFileUploadResponse<T> {
	const [uploads, setUploads] = useState<Array<IUploadItem<T>>>([]);

	const onSelectFiles = useCallback(
		(filesToAdd: FileList | null) => {
			if (!filesToAdd) return;

			const fileList = Array.from(filesToAdd);

			fileList.forEach((file) => {
				if (!uploads.some((item) => item.file.name === file.name)) {
					setUploads((prev) => [...prev, { file: file, progress: 0, status: 'ready' }]);
				}
			});
		},
		[uploads]
	);

	const onRemoveFile = useCallback(
		(fileName: string) => {
			const withoutDeletedOne = uploads.filter((item) => item.file.name !== fileName);

			setUploads(withoutDeletedOne);
		},
		[uploads]
	);

	const uploadFiles = useCallback((): Promise<T[]> => {
		//Função de upload de um único arquivo
		const promises = uploads.map((item, index) => {
			return new Promise<T>((resolve, reject) => {
				const xhr = new XMLHttpRequest();

				xhr.open('POST', url, true);
				xhr.withCredentials = true; // envia cookies (JWT) junto da request
				xhr.responseType = 'json'; // parse automático da resposta

				// Progress event (upload)
				xhr.upload.onprogress = (event) => {
					if (!event.lengthComputable) return;

					const percent = Math.round((event.loaded / event.total) * 100);

					setUploads((prev) => {
						const next = [...prev];

						next[index] = { ...next[index], progress: percent, status: 'uploading' };
						return next;
					});
				};

				// Upload completo
				xhr.onload = () => {
					const apiResponse = xhr.response; // Extrai resposta JSON ou usa vazio

					if (xhr.status === 200) {
						setUploads((prev) => {
							const next = [...prev];

							next[index] = {
								...next[index],
								status: 'done',
								progress: 100,
								response: apiResponse,
							};
							return next;
						});

						resolve(apiResponse as T);
					} else {
						setUploads((prev) => {
							const next = [...prev];

							next[index] = {
								...next[index],
								status: 'error',
								response: apiResponse,
							};

							return next;
						});

						reject(new Error(`HTTP ${xhr.status}`));
					}
				};

				// Erro de rede
				xhr.onerror = () => {
					setUploads((prev) => {
						const next = [...prev];
						next[index] = { ...next[index], status: 'error', response: xhr.response };
						return next;
					});

					reject(new Error('Network error'));
				};

				// Prepara e envia FormData
				const form = new FormData();
				form.append('file', item.file);
				xhr.send(form);
			});
		});

		return Promise.all(promises); // Retornamos a Promise que só resolve quando **todas** terminarem
	}, [url, uploads]);

	/**
	 * Boolean flag indicating if any file is currently uploading.
	 */
	const isPending = useMemo(() => uploads.some((item) => item.status === 'uploading'), [uploads]);

	const reset = useCallback(() => setUploads([]), []);

	return { isPending, uploads, uploadFiles, onSelectFiles, onRemoveFile, reset };
}
