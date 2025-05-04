export function getProfileNameInitials(name: string) {
	const initials = name
		.split(' ')
		.map((word) => word.charAt(0).toLocaleUpperCase())
		.slice(0, 2)
		.join('');

	return initials;
}
