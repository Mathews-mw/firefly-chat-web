'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

export type Option = Record<'value' | 'label', string> & Record<string, string>;

interface AutoCompleteProps {
	options: Option[];
	emptyMessage: string;
	value?: Option;
	onValueChange: (value: Option) => void;
	placeholder?: string;
	disabled?: boolean;
}

export const ComboBoxBase: React.ForwardRefRenderFunction<HTMLInputElement, AutoCompleteProps> = (
	{ options, emptyMessage, value, onValueChange, placeholder, disabled = false, ...props },
	ref
) => {
	const [open, setOpen] = React.useState(false);

	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleSelectOption = React.useCallback(
		(selectedOption: Option) => {
			onValueChange(selectedOption);

			setTimeout(() => {
				inputRef?.current?.blur();
				setOpen(false);
			}, 0);
		},
		[onValueChange]
	);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
					disabled={disabled}
				>
					{value ? options.find((option) => option.label === value.label)?.label : placeholder}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder={placeholder} className="h-9" />
					<CommandList>
						<CommandEmpty>{emptyMessage}</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={value as string | undefined}
									onSelect={() => handleSelectOption(option)}
									className="w-full cursor-pointer"
								>
									<Check className={cn('mr-2 h-4 w-4', value?.value === option.value ? 'opacity-100' : 'opacity-0')} />
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export const ComboBox = React.forwardRef(ComboBoxBase);
