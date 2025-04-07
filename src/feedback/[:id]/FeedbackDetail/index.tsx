import { Link, useParams, useNavigate } from 'react-router';
import { useFeedback } from '../../../context/FeedbackProvider';
import { useState, useEffect } from 'react';
import { ProductRequest } from '../../../constants/types';
import FeedbackCard from '../../../ui/FeedbackCard';
import { useUser } from '../../../context/UserProvider';
import { updateLocalFeedback } from '../../../api/feedback';
import styles from './FeedbackDetail.module.css';
import CommentsSection from '../../../ui/CommentSection';

const FeedbackDetail = () => {
    const MAX_COMMENT_LENGTH = 250;
    const { id } = useParams<{ id: string }>();
    const { feedback, setFeedback } = useFeedback();
    const { user } = useUser();
    const navigate = useNavigate();
    const [currentFeedback, setCurrentFeedback] = useState<ProductRequest | null>(null);
    const [formData, setFormData] = useState({
        content: '',
    });

    useEffect(() => {
        if (id) {
            const feedbackId = parseInt(id, 10);
            const foundFeedback = feedback.find((item) => item.id === feedbackId);
            setCurrentFeedback(foundFeedback ?? null);
        } else {
            setCurrentFeedback(null);
        }
    }, [id, feedback]);

    const handleNewComment = (event: React.FormEvent) => {
        event.preventDefault();
        if (!user) {
            console.error('User is not defined');
            return;
        }

        const newComment = {
            id: currentFeedback?.comments?.length || 0,
            user: user,
            content: formData.content,
        };

        const updatedFeedback: ProductRequest = {
            ...currentFeedback,
            id: currentFeedback?.id ?? 0,
            title: currentFeedback?.title || '',
            category: currentFeedback?.category || '',
            upvotes: currentFeedback?.upvotes || 0,
            status: currentFeedback?.status || { value: 'suggestion', label: 'Suggestion' },
            description: currentFeedback?.description || '',
            comments: [...(currentFeedback?.comments ?? []), newComment],
        };

        setFeedback((prevFeedback) =>
            prevFeedback.map((item) => (item.id === updatedFeedback.id ? updatedFeedback : item))
        );

        setCurrentFeedback(updatedFeedback as ProductRequest);
        updateLocalFeedback(updatedFeedback as ProductRequest);
        setFormData({ content: '' });
    };

    // Calculate remaining characters
    const remainingChars = MAX_COMMENT_LENGTH - formData.content.length;

    return (
        <div className={styles['feedback-detail']}>
            <header className={styles['feedback-detail__header']}>
                {/* Back button */}
                <Link
                    className={`${styles['feedback-detail__link']} ${styles['feedback-detail__link--back']}`}
                    to='/feedback'
                >
                    <span className={styles['feedback-detail__icon']}>
                        <img src='/assets/shared/icon-arrow-left.svg' alt='Go Back' />
                    </span>
                    Go Back
                </Link>

                {/* Edit button */}
                <div
                    onClick={() => navigate(`/feedback/${currentFeedback?.id}/edit`)}
                    className={styles['feedback-detail__edit']}
                >
                    <p className={styles['feedback-detail__edit-label']}>Edit Feedback</p>
                </div>
            </header>

            {/* Feedback Card */}
            {currentFeedback && <FeedbackCard feedback={currentFeedback} />}

            {/* Comments Section */}
            <section className={styles['feedback-detail__comments-section']}>
                <p className={styles['feedback-detail__comments-title']}>
                    {currentFeedback?.comments?.length || 0} Comments
                </p>

                {currentFeedback && (
                    <CommentsSection
                        currentFeedback={currentFeedback}
                        user={user}
                        setCurrentFeedback={setCurrentFeedback}
                    />
                )}
            </section>

            {/* Add Comment Section */}
            <section className={styles['feedback-detail__new-comment-section']}>
                <p className={styles['feedback-detail__comment-title']}>Add Comment</p>
                <form className={styles['feedback-detail__comment-form']} onSubmit={handleNewComment}>
                    <textarea
                        className={styles['feedback-detail__comment-input']}
                        placeholder='Type your comment here'
                        value={formData.content}
                        onChange={(e) => setFormData({ content: e.target.value })}
                        maxLength={MAX_COMMENT_LENGTH}
                    />
                    <div className={styles['feedback-detail__comment-footer']}>
                        <p className={styles['feedback-detail__char-counter']}>{remainingChars} Characters left</p>
                        <button className={styles['feedback-detail__submit-btn']} type='submit'>
                            Post Comment
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default FeedbackDetail;
