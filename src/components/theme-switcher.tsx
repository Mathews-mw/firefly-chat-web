'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from './ui/button';

import { Moon, SunMedium } from 'lucide-react';

export function ThemeSwitcher() {
	const { setTheme, theme, systemTheme } = useTheme();

	const [themeLabel, setThemeLabel] = useState(
		theme === 'system'
			? systemTheme === 'light'
				? 'Tema claro'
				: 'Tema escuro'
			: theme === 'light'
				? 'Tema claro'
				: 'Tema escuro'
	);

	function toggleTheme() {
		if (theme && theme === 'system') {
			if (systemTheme === 'dark') {
				setTheme('light');
				setThemeLabel('Tema claro');
			} else {
				setTheme('dark');
				setThemeLabel('Tema escuro');
			}
		}

		if (theme && theme === 'light') {
			setTheme('dark');
			setThemeLabel('Tema escuro');
		}

		if (theme && theme === 'dark') {
			setTheme('light');
			setThemeLabel('Tema claro');
		}
	}

	useEffect(() => {}, [theme]);

	return (
		<Button variant="ghost" onClick={() => toggleTheme()}>
			{themeLabel === 'Tema claro' ? <SunMedium /> : <Moon />}
		</Button>
	);
}
