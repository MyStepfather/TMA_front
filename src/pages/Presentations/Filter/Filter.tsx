import styles from './Filter.module.css';
import cn from 'classnames';
import { FilterProps } from './Filter.props.ts';
import Checkbox from '../../../components/Checkbox/Checkbox.tsx';
import { useClickOutside } from '../../../hooks/useClickOutside.ts';
import { useRef } from 'react';

function Filter({
	isMenuOpen,
	toggler,
	labels,
	onFilterChange,
	selectedFilters,
}: FilterProps) {
	const ref = useRef<HTMLDivElement>(null);

	useClickOutside(ref, () => {
		if (isMenuOpen) {
			toggler();
		} 
	});

	return (
		<div
			ref={ref}
			className={cn(styles['filter'], {
				[styles['hide']]: !isMenuOpen
			})}
		>
			{labels.map(label => (
				<div className={styles['item']} key={label.id}>
					<Checkbox
						title={label.title}
						id={label.id}
						isChecked={selectedFilters.includes(
							label.id.toString()
						)}
						onFilterChange={onFilterChange}
					/>
				</div>
			))}
		</div>
	);
}

export default Filter;
