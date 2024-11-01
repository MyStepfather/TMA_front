export interface CheckboxProps {
    title: string;
    id: number;
    isChecked: boolean;
    onFilterChange: (filterId: number) => void;
}