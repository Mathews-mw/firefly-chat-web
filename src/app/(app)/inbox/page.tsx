'use client';

import { Button } from '@/components/ui/button';
import { useFileUpload } from '@/hooks/use-file-upload-old';
import { Loader2 } from 'lucide-react';

export default function InboxPage() {
	const { uploads, uploadFiles, onSelectFiles, onRemoveFile, isPending } = useFileUpload(
		'http://localhost:3737/api/attachments/chat'
	);

	console.log('isPending: ', isPending);

	return (
		<div className="">
			<h1>Channels Page</h1>

			<div className="mx-auto flex h-full w-full max-w-96 flex-1 flex-col items-center justify-center gap-4">
				<input type="file" multiple onChange={(e) => onSelectFiles(e.target.files)} />
				<Button onClick={uploadFiles}>Send files</Button>

				{uploads.map((item, i: number) => (
					<div key={i} style={{ marginTop: 12 }}>
						<strong>{item.file.name}</strong>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<progress value={item.progress} max={100} style={{ flex: 1, marginRight: 8 }}>
								{item.progress}%
							</progress>
							<span>
								{item.status === 'ready' && 'Pronto'}
								{item.status === 'uploading' && `${item.progress}%`}
								{item.status === 'done' && '✓ Concluído'}
								{item.status === 'error' && '✗ Erro'}
							</span>
						</div>
					</div>
				))}

				{isPending && <Loader2 className="animate-spin" />}
			</div>
		</div>
	);
}
