import { ComponentProps, ForwardRefRenderFunction, forwardRef, useRef, useState } from 'react';

import { Button } from '../ui/button';

import { PaperClipIcon } from '@heroicons/react/24/outline';

type UploadStatus = 'ready' | 'uploading' | 'done' | 'error';

interface FileWithProgress {
	file: File;
	progress: number;
	status: UploadStatus;
}

interface IProps extends ComponentProps<'input'> {
	disabled?: boolean;
	files: Array<FileWithProgress>;
}

export function InputFile({ disabled = false, ...props }: IProps) {
	const [files, setFiles] = useState<FileWithProgress[]>([]);

	const inputRef = useRef<HTMLInputElement | null>(null);

	function onChooseFile() {
		if (inputRef) {
			inputRef.current?.click();
		}
	}

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;

		const list = Array.from(e.target.files).map((f) => ({
			file: f,
			progress: 0,
			status: 'ready' as UploadStatus,
		}));

		setFiles(list);
	}

	function uploadSingleFile(fwp: FileWithProgress, index: number) {
		const xhr = new XMLHttpRequest();

		xhr.open('POST', 'http://localhost:3737/api/attachments/chat', true);
		xhr.withCredentials = true;

		// Progresso
		xhr.upload.onprogress = (event) => {
			if (!event.lengthComputable) return;

			const percent = Math.round((event.loaded / event.total) * 100);
			console.log('upload progress percent: ', percent);

			setFiles((prev) => {
				const next = [...prev];
				next[index] = { ...next[index], progress: percent, status: 'uploading' };
				return next;
			});
		};

		// Concluído
		xhr.onload = () => {
			setFiles((prev) => {
				const next = [...prev];
				next[index] = {
					...next[index],
					status: xhr.status === 200 ? 'done' : 'error',
					progress: xhr.status === 200 ? 100 : next[index].progress,
				};
				return next;
			});
		};

		// Erro de rede
		xhr.onerror = () => {
			setFiles((prev) => {
				const next = [...prev];
				next[index] = { ...next[index], status: 'error' };
				return next;
			});
		};

		// Envia FormData
		const form = new FormData();
		form.append('file', fwp.file);
		xhr.send(form);
	}

	function startUpload() {
		files.forEach((fwp, i) => {
			uploadSingleFile(fwp, i);
		});
	}

	return (
		<div>
			<input ref={inputRef} disabled={disabled} type="file" className="hidden" onChange={handleFileChange} {...props} />

			<Button type="button" variant="ghost" size="sm" disabled={disabled} onClick={onChooseFile}>
				<PaperClipIcon className="size-5" />
			</Button>
		</div>
	);
}
