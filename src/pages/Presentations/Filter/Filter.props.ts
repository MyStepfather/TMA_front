import { TCategory } from 'types/types';

export interface FilterProps {
	isMenuOpen: boolean;
	toggler: () => void;
	labels: TCategory[];
	onFilterChange: (filterId: number) => void;
	selectedFilters: string;
}
