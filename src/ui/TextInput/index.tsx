import styles from './TextInput.module.css';

interface TextInputProps {
    name: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    label: string;
    description: string;
    type: 'text' | 'textarea';
    error: string | null;
}

const TextInput = ({ name, value, handleChange, label, description, type, error }: TextInputProps) => {
    return (
        <div>
            <label className={`${styles['text-input__text--label']} ${styles['text-input__text']}`} htmlFor={name}>
                {label}
            </label>
            <span className={`${styles['text-input__text']} ${styles['text-input__text--description']}`}>
                {description}
            </span>

            {type === 'textarea' ? (
                <textarea
                    className={`${error && styles['text-input__textarea--error']} ${styles['text-input__textarea']}`}
                    id={name}
                    name={name}
                    value={value}
                    maxLength={250}
                    onChange={handleChange}
                />
            ) : (
                <input
                    className={`${error && styles['text-input__textarea--error']} ${styles['text-input__input']}`}
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
            )}

            {error && <p className={styles['text-input__error']}>{error}</p>}
        </div>
    );
};

export default TextInput;
