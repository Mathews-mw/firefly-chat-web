'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export function SearchInput({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<div className={twMerge(['flex max-w-[420px] justify-between gap-4'], className)}>
			<input
				data-slot="input"
				type={type}
				{...props}
				className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
			/>

			<button>
				<MagnifyingGlassIcon className="size-5" />
			</button>
		</div>
	);
}
