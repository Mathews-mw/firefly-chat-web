import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from './ui/button';

interface IProps {
	currentPage: number;
	totalCount: number;
	totalPages: number;
	perPage: number;
	onPageChange: (currentPage: number) => Promise<void> | void;
	disableTotalAmountLabel?: boolean;
	disablePerPageLabel?: boolean;
}

export function Pagination({
	currentPage,
	perPage,
	totalCount,
	totalPages,
	onPageChange,
	disableTotalAmountLabel = false,
	disablePerPageLabel = false,
}: IProps) {
	return (
		<div className="flex items-center justify-between">
			{!disableTotalAmountLabel && <span className="text-muted-foreground text-sm">Total de {totalCount} item(s)</span>}

			<div className="flex items-center gap-6 lg:gap-8">
				{!disablePerPageLabel && (
					<div className="text-sm font-medium">
						Página {currentPage} de {totalPages}
					</div>
				)}

				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						onClick={() => onPageChange(1)}
						disabled={currentPage === 1}
						className="h-8 w-8 p-0"
					>
						<ChevronsLeft className="h-4 w-4" />
						<span className="sr-only">Primeira página</span>
					</Button>
					<Button
						variant="outline"
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className="h-8 w-8 p-0"
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Página anterior</span>
					</Button>
					<Button
						variant="outline"
						onClick={() => onPageChange(currentPage + 1)}
						disabled={totalPages <= currentPage}
						className="h-8 w-8 p-0"
					>
						<ChevronRight className="h-4 w-4" />
						<span className="sr-only">Próxima página</span>
					</Button>
					<Button
						variant="outline"
						onClick={() => onPageChange(totalPages)}
						disabled={totalPages <= currentPage}
						className="h-8 w-8 p-0"
					>
						<ChevronsRight className="h-4 w-4" />
						<span className="sr-only">Última página</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
