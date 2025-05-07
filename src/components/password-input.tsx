'use client';

import { twMerge } from 'tailwind-merge';
import { ComponentProps, ForwardRefRenderFunction, forwardRef, useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

type InputControlProps = ComponentProps<'input'>;

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputControlProps> = ({ ...props }, ref) => {
	const [isVisible, setIsVisible] = useState(false);
	return (
		<div
			className={twMerge([
				'border-input ring-offset-background placeholder:text-muted-foreground dark:bg-input/30 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50',
				'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[1px]',
				'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
			])}
		>
			<input
				ref={ref}
				className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none dark:text-zinc-100 dark:placeholder-zinc-400"
				type={isVisible ? 'text' : 'password'}
				{...props}
			/>

			<button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
				{isVisible ? (
					<EyeOff className="text-muted-foreground pointer-events-none h-5 w-5" />
				) : (
					<Eye className="text-muted-foreground pointer-events-none h-5 w-5" />
				)}
			</button>
		</div>
	);
};

export const PasswordInput = forwardRef(InputBase);
