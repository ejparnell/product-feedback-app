import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ProductRequest } from '../../constants/types';
import { pillFilters } from '../../constants/filters';
import TextInput from '../../ui/TextInput';
import DropdownInput from '../../ui/DropdownInput';
import { addLocalFeedback } from '../../api/feedback';
import styles from './FeedbackNew.module.css';
import { useFeedback } from '../../context/FeedbackProvider';

const FeedbackNew = () => {
    const { feedback, setFeedback } = useFeedback();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: 0,
        content: '',
        title: '',
        category: '',
        description: '',
        upvotes: 0,
        status: { value: 'suggestion', label: 'Suggestion' },
    } as ProductRequest);
    const [selected, setSelected] = useState({ value: 'feature', label: 'Feature' });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.description) {
            setError("Can't be empty");
            return;
        }

        setError(null);
        setLoading(true);

        const newFeedback: ProductRequest = {
            ...formData,
            id: Date.now(),
            category: selected.label,
            comments: [],
        };

        const updatedFeedback = [...feedback, newFeedback];

        setFeedback(updatedFeedback);
        addLocalFeedback(newFeedback);

        setLoading(false);
        navigate('/feedback');
    };

    return (
        <div className={styles['feedback-new']}>
            <header className={styles['feedback-new__header']}>
                <Link
                    className={`${styles['feedback-new__link--back']} ${styles['feedback-new__link']}`}
                    to='/feedback'
                >
                    <span className={styles['feedback-new__icon']}>
                        <img src='/assets/shared/icon-arrow-left.svg' alt='Back Arrow' />
                    </span>
                    Go Back
                </Link>
            </header>

            <section className={styles['feedback-new__content']}>
                <img
                    className={styles['feedback-new__content-icon']}
                    src='/assets/shared/icon-new-feedback.svg'
                    alt='New Icon'
                />

                <h1 className={styles['feedback-new__title']}>Create New Feedback</h1>

                <form>
                    <TextInput
                        type='text'
                        name='title'
                        value={formData.title}
                        handleChange={handleInputChange}
                        label='Feedback Title'
                        description='Add a short, descriptive headline'
                        error={error}
                    />

                    <DropdownInput
                        label='Category'
                        description='Choose a category for your feedback'
                        selected={selected}
                        options={pillFilters.slice(1)}
                        setSelected={setSelected}
                    />

                    <TextInput
                        type='textarea'
                        name='description'
                        value={formData.description}
                        handleChange={handleInputChange}
                        label='Feedback Detail'
                        description='Include any specific comments on what should be improved, added, etc.'
                        error={error}
                    />
                </form>

                <div className={styles['feedback-new__controls']}>
                    <button
                        disabled={loading}
                        className={`${styles['feedback-new__btn--add']} ${styles['feedback-new__btn']}`}
                        onClick={handleSubmit}
                    >
                        {loading ? 'Adding...' : 'Add Feedback'}
                    </button>
                    <button
                        onClick={() => navigate('/feedback')}
                        className={`${styles['feedback-new__btn--cancel']} ${styles['feedback-new__btn']}`}
                    >
                        Cancel
                    </button>
                </div>
            </section>
        </div>
    );
};

export default FeedbackNew;
