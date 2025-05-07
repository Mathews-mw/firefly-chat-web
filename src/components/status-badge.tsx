import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps extends ComponentProps<'span'> {
	status: 'online' | 'offline';
}

export function StatusBadge({ status, className, ...props }: IProps) {
	return (
		<span
			className={twMerge([
				'size-3 rounded-full bg-orange-500',
				status === 'online' ? 'bg-emerald-400' : 'bg-rose-400',
				className,
			])}
			{...props}
		/>
	);
}
