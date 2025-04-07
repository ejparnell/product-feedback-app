import { ProductRequest, User } from '../../constants/types';
import ThreadItem from './ThreadItem';
import styles from './CommentSection.module.css';
import React from 'react';

interface Props {
    currentFeedback: ProductRequest;
    user: User | undefined;
    setCurrentFeedback: React.Dispatch<React.SetStateAction<ProductRequest | null>>;
}

const CommentsSection = ({ currentFeedback, user, setCurrentFeedback }: Props) => {
    return (
        <div className={styles['comment-section']}>
            {currentFeedback.comments &&
                currentFeedback.comments.map((comment) => (
                    <ThreadItem
                        key={comment.id}
                        item={comment}
                        currentFeedback={currentFeedback}
                        user={user}
                        setCurrentFeedback={setCurrentFeedback}
                    />
                ))}
        </div>
    );
};

export default CommentsSection;
