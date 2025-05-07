import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ITextInputProps extends ComponentProps<'input'> {
	prefix?: string;
}

export function TextInput({ prefix, className, type, ...props }: ITextInputProps) {
	return (
		<div
			className={twMerge([
				'selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 items-center gap-2 rounded-md border bg-transparent pl-3 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[1px]',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				className,
			])}
			{...props}
		>
			{!!prefix && <span className="text-muted-foreground placeholder:text-muted-foreground">{prefix}</span>}
			<input type={type} className="w-full py-1 outline-none" {...props} />
		</div>
	);
}
