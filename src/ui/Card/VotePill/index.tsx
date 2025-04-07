import { useState, useEffect } from 'react';
import { ProductRequest, VoteMode } from '../../../constants/types';
import { getVotedRequests } from '../../../api/feedback';
import styles from './VotePill.module.css';
import { useFeedback } from '../../../context/FeedbackProvider';
import { onUpvote } from '../../../utils/on-upvote';

interface Props {
    feedback: ProductRequest;
}

const VotePill = ({ feedback }: Props) => {
    const [hasVoted, setHasVoted] = useState(false);
    const { feedback: allFeedback, setFeedback } = useFeedback();

    const formattedUpvotes = feedback.upvotes > 999 ? '+999' : feedback.upvotes;

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
        const updatedFeedback = onUpvote(allFeedback, feedback.id, voteMode);
        setFeedback(updatedFeedback);
        setHasVoted(!hasAlreadyVoted);
    };

    return (
        <div
            onClick={handleUpvote}
            className={`${styles['vote-pill__pill']} ${
                hasVoted ? styles['vote-pill__pill--selected'] : styles['vote-pill__pill--dark']
            }`}
        >
            <img
                className={`${hasVoted ? styles['vote-pill__arrow--selected'] : ''}`}
                src='/assets/shared/icon-arrow-up.svg'
                alt='Upvote'
            />
            <p className={`${styles['vote-pill__text--bold']} ${styles['vote-pill__text']}`}>{formattedUpvotes}</p>
        </div>
    );
};

export default VotePill;
