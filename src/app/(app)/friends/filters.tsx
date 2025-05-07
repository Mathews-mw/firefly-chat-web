'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useDebounce } from '@/hooks/use-debounce';

import { SearchInput } from '@/components/search-input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IProps {
	isFetching: boolean;
}

export function Filters({ isFetching }: IProps) {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	const perPageParams = searchParams.get('perPage') ?? '10';
	const statusParams = searchParams.get('status') ?? 'all';
	const searchQueryParams = searchParams.get('search') ?? '';

	const [perPageValue, setPerPageValue] = useState(perPageParams);
	const [statusValue, setStatusValue] = useState(statusParams);
	const [searchValue, setSearchValue] = useState(searchQueryParams);

	const debouncedSearch = useDebounce(searchValue);

	function handlePerPageFilter(perPage: string) {
		setPerPageValue(perPage);

		if (perPageValue) {
			params.set('perPage', perPageValue);
		} else {
			params.delete('perPage');
		}

		replace(`${pathname}?${params.toString()}`);
	}

	function handleStatusFilter(status: string) {
		setStatusValue(status);

		if (statusValue) {
			params.set('status', status);
		} else {
			params.delete('status');
		}

		replace(`${pathname}?${params.toString()}`);
	}

	function handleSearchFriend(search: string) {
		if (search) {
			params.set('search', search);
		} else {
			params.delete('search');
		}

		replace(`${pathname}?${params.toString()}`);
	}

	function handleClearSearchFilter() {
		setSearchValue('');
		params.delete('search');
		replace(`${pathname}?${params.toString()}`);
	}

	useEffect(() => {
		handleSearchFriend(debouncedSearch);
	}, [debouncedSearch]);

	useEffect(() => {
		if (perPageValue) {
			params.set('perPage', perPageValue);
		} else {
			params.delete('perPage');
		}

		replace(`${pathname}?${params.toString()}`);
	}, [perPageValue]);

	return (
		<div className="flex gap-2">
			<Select defaultValue={perPageValue} onValueChange={handlePerPageFilter} disabled={isFetching}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Registros" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">Todos</SelectItem>
					<SelectItem value="10">10</SelectItem>
					<SelectItem value="20">20</SelectItem>
					<SelectItem value="30">30</SelectItem>
					<SelectItem value="40">40</SelectItem>
					<SelectItem value="50">50</SelectItem>
				</SelectContent>
			</Select>

			<Select defaultValue={statusValue} onValueChange={handleStatusFilter} disabled={isFetching}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">Todos</SelectItem>
					<SelectItem value="online">Disponível</SelectItem>
				</SelectContent>
			</Select>

			<SearchInput
				placeholder="Buscar por amigos"
				value={searchValue}
				isLoading={isFetching}
				onChangeValue={setSearchValue}
				onSearch={() => handleSearchFriend(searchValue)}
				onClear={handleClearSearchFilter}
			/>
		</div>
	);
}
