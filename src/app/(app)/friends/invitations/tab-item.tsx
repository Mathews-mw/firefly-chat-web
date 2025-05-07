'use client';

import { motion } from 'motion/react';
import * as Tabs from '@radix-ui/react-tabs';

interface ITabItemProps {
	value: string;
	title: string;
	isSelected?: boolean;
}

export function TabItem({ value, title, isSelected = false }: ITabItemProps) {
	return (
		<Tabs.Trigger
			className="group data-[state=active]:text-primary relative flex h-[45px] flex-1 cursor-default items-center justify-center px-5 text-[15px] leading-none outline-none select-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:font-semibold"
			value={value}
		>
			<span className="rounded whitespace-nowrap group-focus-visible:ring-2 group-focus-visible:ring-orange-100 group-focus-visible:ring-offset-4">
				{title}
			</span>

			{isSelected && (
				<motion.div
					layoutId="tab-indicator"
					transition={{ duration: 0.5, bounce: 0.25, type: 'spring' }}
					className="bg-primary absolute right-0 -bottom-px left-0 h-0.5"
				/>
			)}
		</Tabs.Trigger>
	);
}
