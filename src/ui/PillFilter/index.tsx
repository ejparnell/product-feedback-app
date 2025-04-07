import styles from './PillFilter.module.css';
import { Filter } from '../../constants/types';

interface PillFilterProps {
    filter: Filter;
    onFilterChange: (value: Filter) => void;
    selectedFilter: Filter;
}

const PillFilter = ({ filter, onFilterChange, selectedFilter }: PillFilterProps) => {
    return (
        <button
            className={`${styles.pill__button} ${
                selectedFilter.value === filter.value ? styles.pill__button__active : ''
            }`}
            onClick={() => onFilterChange(filter)}
        >
            {filter.label}
        </button>
    );
};

export default PillFilter;
