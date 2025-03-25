import styles from './PillFilter.module.css';

interface PillFilterProps {
    filter: { value: string; name: string };
    onFilterChange: (value: string) => void;
    selectedFilter: string;
}

const PillFilter = ({ filter, onFilterChange, selectedFilter }: PillFilterProps) => {
   return (
        <button
            className={`${styles.pill__button} ${selectedFilter === filter.value ? styles.pill__button__active : ''}`} 
            onClick={() => onFilterChange(filter.value)}
        >
            {filter.name}
        </button>
   );
};

export default PillFilter;