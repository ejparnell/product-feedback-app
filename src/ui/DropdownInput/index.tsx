import { useState } from 'react';
import styles from './DropdownInput.module.css';

interface DropdownInputProps {
    label: string;
    description: string;
    selected: { value: string; label: string };
    options: Array<{ value: string; label: string }>;
    setSelected: (value: { value: string; label: string }) => void;
}

const DropdownInput = ({ label, description, selected, options, setSelected }: DropdownInputProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles['dropdown-input']}>
            <div>
                <p className={`${styles['dropdown-input__text--label']} ${styles['dropdown-input__text']}`}>{label}</p>
                <span className={`${styles['dropdown-input__text--description']} ${styles['dropdown-input__text']}`}>
                    {description}
                </span>
            </div>

            <div onClick={() => setIsOpen((prev) => !prev)} className={styles['dropdown-input__selector']}>
                <p className={`${styles['dropdown-input__text--']} ${styles['dropdown-input__text']}`}>
                    {selected.label}
                </p>
                {isOpen ? (
                    <img src='/assets/shared/icon-arrow-up.svg' alt='Arrow Up' />
                ) : (
                    <img src='/assets/shared/icon-arrow-down.svg' alt='Arrow Down' />
                )}
            </div>

            {isOpen && (
                <div className={styles['dropdown-input__options']}>
                    {options.map((option) => (
                        <div key={option.value} onClick={() => setSelected(option)}>
                            <div className={styles['dropdown-input__option']}>
                                <p
                                    className={`${styles['dropdown-input__text']} ${
                                        option.value === selected.value
                                            ? styles['dropdown-input__text--selected']
                                            : undefined
                                    }`}
                                >
                                    {option.label}
                                </p>
                                {option.value === selected.value && (
                                    <img src='/assets/shared/icon-check.svg' alt='Check' />
                                )}
                            </div>
                            {option.value !== options[options.length - 1].value && (
                                <hr className={styles['dropdown-input__hr']} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownInput;
