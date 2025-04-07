import { Link } from 'react-router-dom';
import Dropdown from '../ui/Dropdown';
import { sortByOptions } from '../constants/sort-by-options';
import FeedbackCard from '../ui/FeedbackCard';
import { ProductRequest } from '../constants/types';
import useWindowSize from '../hooks/useWindowSize';
import { useFeedback } from '../context/FeedbackProvider';
import NavMenu from '../ui/NavMenu';
import styles from './Feedback.module.css';

const Feedback = () => {
    const { width } = useWindowSize();
    const { filteredFeedback, sortBy, setSortBy } = useFeedback();

    return (
        <div className={styles.feedback__container}>
            <div className={styles.sidebar}>
                <NavMenu />
            </div>
            <div className={styles.content}>
                <div className={styles['feedback-index']}>
                    {/* Header */}
                    <div className={styles['feedback-index__header']}>
                        {width >= 768 && (
                            <div className={styles['feedback-index__suggestions']}>
                                <img src='/assets/suggestions/icon-suggestions.svg' alt='Suggestions Bulb' />
                                <p className={styles['feedback-index__text--suggestions']}>
                                    {filteredFeedback.length} Suggestions
                                </p>
                            </div>
                        )}

                        {/* Sort by dropdown */}
                        <Dropdown options={sortByOptions} selected={sortBy} setSelected={setSortBy} />

                        {/* Link to New Feedback */}
                        <div className={styles['feedback-index__new']}>
                            <Link className={styles['feedback-index__text']} to='/feedback/new'>
                                + Add Feedback
                            </Link>
                        </div>
                    </div>

                    {/* Feedback List */}
                    <div className={styles['feedback-index__list']}>
                        {filteredFeedback.length > 0 ? (
                            filteredFeedback.map((feedback: ProductRequest) => (
                                <FeedbackCard key={feedback.id} feedback={feedback} />
                            ))
                        ) : (
                            // No feedback view
                            <div className={styles['feedback-index__empty']}>
                                <img src='/assets/suggestions/illustration-empty.svg' alt='Empty Suggestions' />
                                <p className={styles['feedback-index__empty-text']}>There is no feedback yet.</p>
                                <p className={styles['feedback-index__empty-text--description']}>
                                    Got a suggestion? Found a bug that needs to be squashed? We love hearing about new
                                    ideas to improve our app.
                                </p>
                                <div className={styles['feedback-index__new']}>
                                    <Link className={styles['feedback-index__text']} to='/feedback/new'>
                                        + Add Feedback
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
