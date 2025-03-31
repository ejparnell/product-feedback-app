import { useState, useEffect } from 'react';
import { ProductRequest, VoteMode } from '../../constants/types';
import { getVotedRequests } from '../../api/feedback';
import styles from './FeedbackCard.module.css';
import { Link } from 'react-router';

interface Props {
    feedback: ProductRequest;
    onUpvote: (id: number, mode: VoteMode) => void;
}

const FeedbackCard = ({ feedback, onUpvote }: Props) => {
    const [hasVoted, setHasVoted] = useState(false);

    const formattedDescription =
        feedback.description.length > 100
            ? `${feedback.description.slice(0, 100)}...`
            : feedback.description;
    const formattedCategory =
        feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1);
    const formattedUpvotes = feedback.upvotes > 999 ? '+999' : feedback.upvotes;
    const formattedComments = feedback.comments?.length || 0;

    useEffect(() => {
        const votedIds = getVotedRequests();
        setHasVoted(votedIds.includes(feedback.id));
    }, [feedback.id]);

    const handleUpvote = () => {
        const votedIds: number[] = getVotedRequests();
        const hasAlreadyVoted = votedIds.includes(feedback.id);

        const updatedVotedIds = hasAlreadyVoted
            ? votedIds.filter((id) => id !== feedback.id)
            : [...votedIds, feedback.id];

        localStorage.setItem('votedRequests', JSON.stringify(updatedVotedIds));

        const voteMode: VoteMode = hasAlreadyVoted ? 'remove' : 'upvote';
        onUpvote(feedback.id, voteMode);
        setHasVoted(!hasAlreadyVoted);
    };

    return (
        <div className={styles['feedback-card']}>
            <div>
                <Link
                    className={styles['feedback-card__link']}
                    to={`/feedback/${feedback.id}`}
                >
                    <h2
                        className={`${styles['feedback-card__text']} ${styles['feedback-card__text--title']}`}
                    >
                        {feedback.title}
                    </h2>
                    <p
                        className={`${styles['feedback-card__text']} ${styles['feedback-card__text--description']}`}
                    >
                        {formattedDescription}
                    </p>
                    <p
                        className={`${styles['feedback-card__text']} ${styles['feedback-card__text--category']}`}
                    >
                        {formattedCategory}
                    </p>
                </Link>
            </div>

            <div
                onClick={handleUpvote}
                className={`${styles['feedback-card__pill']} ${
                    hasVoted
                        ? styles['feedback-card__pill--selected']
                        : styles['feedback-card__pill--dark']
                }`}
            >
                <img
                    className={`${
                        hasVoted ? styles['feedback-card__arrow--selected'] : ''
                    }`}
                    src='/assets/shared/icon-arrow-up.svg'
                    alt='Upvote'
                />
                <p
                    className={`${styles['feedback-card__text--bold']} ${styles['feedback-card__text']}`}
                >
                    {formattedUpvotes}
                </p>
            </div>

            <div className={styles['feedback-card__pill']}>
                <img src='/assets/shared/icon-comments.svg' alt='Comment' />
                <p
                    className={`${styles['feedback-card__text--bold']} ${styles['feedback-card__text']}`}
                >
                    {formattedComments}
                </p>
            </div>
        </div>
    );
};

export default FeedbackCard;
