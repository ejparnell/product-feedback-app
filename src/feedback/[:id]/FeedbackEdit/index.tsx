import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ProductRequest, Status } from '../../../constants/types';
import { pillFilters } from '../../../constants/filters';
import TextInput from '../../../ui/TextInput';
import DropdownInput from '../../../ui/DropdownInput';
import { updateLocalFeedback, deleteLocalFeedback } from '../../../api/feedback';
import styles from './FeedbackEdit.module.css';
import { useFeedback } from '../../../context/FeedbackProvider';

const FeedbackEdit = () => {
    const { feedback, setFeedback } = useFeedback();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
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
    const [status, setStatus] = useState({ value: 'suggestion', label: 'Suggestion' });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            const feedbackId = parseInt(id, 10);
            const foundFeedback = feedback.find((item) => item.id === feedbackId);
            if (foundFeedback) {
                setFormData(foundFeedback);
                setSelected({ value: foundFeedback.category, label: foundFeedback.category });
                setStatus({ value: foundFeedback.status.value, label: foundFeedback.status.label });
            }
        }
    }, [id, feedback]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        setError(null);
        setLoading(true);

        if (!formData.title || !formData.description) {
            setError("Can't be empty");
            setLoading(false);
            return;
        }

        const updatedFeedback: ProductRequest = {
            ...formData,
            category: selected.label,
            status: status as Status,
        };
        const feedbackIndex = feedback.findIndex((item) => item.id === updatedFeedback.id);
        const updatedFeedbackList = [...feedback];
        updatedFeedbackList[feedbackIndex] = updatedFeedback;
        setFeedback(updatedFeedbackList);
        updateLocalFeedback(updatedFeedback);
        setLoading(false);
        navigate('/feedback');
    };

    const handleDelete = () => {
        const feedbackId = parseInt(id || '0', 10);
        const updatedFeedbackList = feedback.filter((item) => item.id !== feedbackId);
        setFeedback(updatedFeedbackList);
        deleteLocalFeedback(feedbackId);
        navigate('/feedback');
    };

    return (
        <div className={styles['feedback-edit']}>
            <header className={styles['feedback-edit__header']}>
                <Link
                    className={`${styles['feedback-edit__link--back']} ${styles['feedback-edit__link']}`}
                    to='/feedback'
                >
                    <span className={styles['feedback-edit__icon']}>
                        <img src='/assets/shared/icon-arrow-left.svg' alt='Back Arrow' />
                    </span>
                    Go Back
                </Link>
            </header>

            <section className={styles['feedback-edit__content']}>
                <img
                    className={styles['feedback-edit__content-icon']}
                    src='/assets/shared/icon-edit-feedback.svg'
                    alt='Edit Icon'
                />

                <h1 className={styles['feedback-edit__title']}>Editing '{formData.title}'</h1>

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

                    <DropdownInput
                        label='Update Status'
                        description='Change feature state'
                        selected={status}
                        options={[
                            { value: 'suggestion', label: 'Suggestion' },
                            { value: 'planned', label: 'Planned' },
                            { value: 'in-progress', label: 'In Progress' },
                            { value: 'live', label: 'Live' },
                        ]}
                        setSelected={setStatus}
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

                <div className={styles['feedback-edit__controls']}>
                    <button
                        disabled={loading}
                        className={`${styles['feedback-edit__btn--add']} ${styles['feedback-edit__btn']}`}
                        onClick={handleSubmit}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        onClick={() => navigate('/feedback')}
                        className={`${styles['feedback-edit__btn--cancel']} ${styles['feedback-edit__btn']}`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className={`${styles['feedback-edit__btn--delete']} ${styles['feedback-edit__btn']}`}
                    >
                        Delete
                    </button>
                </div>
            </section>
        </div>
    );
};

export default FeedbackEdit;
