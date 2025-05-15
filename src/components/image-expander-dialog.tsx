import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';

interface IProps {
	imageSrc: string;
}

export function ImageExpanderDialog({ imageSrc }: IProps) {
	return (
		<DialogContent>
			<DialogHeader>
				<VisuallyHidden asChild>
					<DialogTitle>Zoom image</DialogTitle>
				</VisuallyHidden>
				<VisuallyHidden asChild>
					<DialogDescription>Zoom image</DialogDescription>
				</VisuallyHidden>
			</DialogHeader>

			<img src={imageSrc} alt="zoomed-image" className="h-full w-full object-cover" />
		</DialogContent>
	);
}
