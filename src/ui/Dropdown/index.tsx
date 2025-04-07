import { useState } from 'react';
import styles from './Dropdown.module.css';

interface DropdownProps {
    options: Array<{
        value: string;
        label: string;
    }>;
    selected: { value: string; label: string };
    setSelected: (value: { value: string; label: string }) => void;
}

const Dropdown = ({ options, selected, setSelected }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.dropdown}>
            {/* Selector */}
            <div className={styles.dropwdown__selector} onClick={() => setIsOpen((prev) => !prev)}>
                <p className={styles.dropdown__label}>
                    <span className={styles['dropdown__text--name']}>Sort by: </span>
                    {selected.label}
                </p>
                {isOpen ? (
                    <img className={styles.dropdown__arrow} src='/assets/shared/icon-arrow-up.svg' alt='Arrow Up' />
                ) : (
                    <img className={styles.dropdown__arrow} src='/assets/shared/icon-arrow-down.svg' alt='Arrow Down' />
                )}
            </div>

            {/* Options */}
            {isOpen && (
                <div className={styles.dropdown__options}>
                    {options.map((option) => (
                        <div key={option.value} onClick={() => setSelected(option)}>
                            <div className={styles.dropdown__option}>
                                <p
                                    className={`${
                                        option.value === selected.value
                                            ? styles['dropdown__text--selected']
                                            : styles.dropdown__text
                                    }`}
                                >
                                    {option.label}
                                </p>
                                {option.value === selected.value && (
                                    <img
                                        className={styles.dropdown__check}
                                        src='/assets/shared/icon-check.svg'
                                        alt='Check'
                                    />
                                )}
                            </div>
                            {option.value !== options[options.length - 1].value && (
                                <hr className={styles.dropdown__hr} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
