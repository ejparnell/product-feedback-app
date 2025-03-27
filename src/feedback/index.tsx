import { useState, useEffect } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import Dropdown from '../ui/Dropdown';
import { sortByOptions } from '../constants/sort-by-options';
import FeedbackCard from '../ui/FeedbackCard';
import { ProductRequest, VoteMode } from '../constants/types';
import { setAllFeedback } from '../api/feedback';
import useWindowSize from '../hooks/useWindowSize';
import styles from './Feedback.module.css';

const Feedback = () => {
    const feedbackRequests = useLoaderData();
    const { width } = useWindowSize();
    const [sortBy, setSortBy] = useState({
        value: 'most-upvotes',
        label: 'Most Upvotes',
    });
    const [feedback, setFeedback] =
        useState<ProductRequest[]>(feedbackRequests);
    const [filteredFeedback, setFilteredFeedback] =
        useState<ProductRequest[]>(feedbackRequests);

    const handleUpvote = (id: number, mode: VoteMode) => {
        const updatedFeedback: ProductRequest[] = feedback.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    upvotes:
                        mode === 'upvote' ? item.upvotes + 1 : item.upvotes - 1,
                };
            }
            return item;
        });
        setAllFeedback(updatedFeedback);
        setFeedback(updatedFeedback);
    };

    useEffect(() => {
        const sortFeedback = (sortBy: { value: string; label: string }) => {
            switch (sortBy.value) {
                case 'most-upvotes':
                    return [...feedback].sort((a, b) => b.upvotes - a.upvotes);
                case 'least-upvotes':
                    return [...feedback].sort((a, b) => a.upvotes - b.upvotes);
                case 'most-comments':
                    return [...feedback].sort(
                        (a, b) =>
                            (b.comments?.length ?? 0) -
                            (a.comments?.length ?? 0)
                    );
                case 'least-comments':
                    return [...feedback].sort(
                        (a, b) =>
                            (a.comments?.length ?? 0) -
                            (b.comments?.length ?? 0)
                    );
                default:
                    return feedback;
            }
        };
        setFilteredFeedback(sortFeedback(sortBy));
    }, [sortBy, feedback]);

    return (
        <div className={styles['feedback-index']}>
            {/* Header */}
            <div className={styles['feedback-index__header']}>
                {width >= 768 && (
                    <div className={styles['feedback-index__suggestions']}>
                        <img
                            src='/assets/suggestions/icon-suggestions.svg'
                            alt='Suggestions Bulb'
                        />
                        <p className={styles['feedback-index__text--suggestions']}>{filteredFeedback.length} Suggestions</p>
                    </div>
                )}
                {/* Sort by dropdown */}
                <Dropdown
                    options={sortByOptions}
                    selected={sortBy}
                    setSelected={setSortBy}
                />

                {/* Link to New Feedback */}
                <div className={styles['feedback-index__new']}>
                    <Link
                        className={styles['feedback-index__text']}
                        to='/feedback/new'
                    >
                        + Add Feedback
                    </Link>
                </div>
            </div>

            {/* Feedback List */}
            <div className={styles['feedback-index__list']}>
                {filteredFeedback.map((feedback: ProductRequest) => (
                    <FeedbackCard
                        key={feedback.id}
                        feedback={feedback}
                        onUpvote={handleUpvote}
                    />
                ))}
            </div>
        </div>
    );
};

export default Feedback;
