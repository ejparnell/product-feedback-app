import { Comment, Reply, ProductRequest, User } from '../../../constants/types';
import { useState } from 'react';
import styles from './ThreadItem.module.css';
import { updateLocalFeedback } from '../../../api/feedback';
import useWindowSize from '../../../hooks/useWindowSize';
import { useFeedback } from '../../../context/FeedbackProvider';

const addReplyToItems = (items: (Comment | Reply)[], parentId: number, newReply: Reply): (Comment | Reply)[] => {
    return items.map((item) => {
        if (item.id === parentId) {
            return {
                ...item,
                replies: item.replies ? [...item.replies, newReply] : [newReply],
            } as Comment | Reply;
        } else if (item.replies) {
            return {
                ...item,
                replies: addReplyToItems(item.replies, parentId, newReply),
            } as Comment | Reply;
        }
        return item;
    });
};

interface ThreadItemProps {
    item: Comment | Reply;
    currentFeedback: ProductRequest;
    user: User | undefined;
    setCurrentFeedback: React.Dispatch<React.SetStateAction<ProductRequest | null>>;
}

const ThreadItem = ({ item, currentFeedback, user, setCurrentFeedback }: ThreadItemProps) => {
    const { width } = useWindowSize();
    const { setFeedback } = useFeedback();
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [formData, setFormData] = useState({ content: '' });

    const handleReplySubmit = () => {
        if (!user || formData.content.trim() === '') return;

        const newReply: Reply = {
            id: Math.floor(Math.random() * 1000),
            content: formData.content,
            user,
            replyingTo: item.user.username,
            replies: [],
        };

        const updatedComments = addReplyToItems(currentFeedback.comments || [], item.id, newReply);

        updateLocalFeedback({
            ...currentFeedback,
            comments: updatedComments,
        });

        setCurrentFeedback({
            ...currentFeedback,
            comments: updatedComments,
        });

        setFeedback((prev) => {
            const updatedFeedback = prev.map((feedback) =>
                feedback.id === currentFeedback.id ? { ...feedback, comments: updatedComments } : feedback
            );
            return updatedFeedback;
        });
        setFormData({ content: '' });
        setIsReplyOpen(false);
    };

    return (
        <div key={item.id}>
            {/* Header */}
            <div className={styles['thread-item__header']}>
                <img className={styles['thread-item__avatar']} src={item.user.image} alt={item.user.name} />
                <div className={styles['thread-item__user-info']}>
                    <p className={styles['thread-item__name']}>{item.user.name}</p>
                    <p className={styles['thread-item__username']}>@{item.user.username}</p>
                </div>
                <p onClick={() => setIsReplyOpen((prev) => !prev)} className={styles['thread-item__reply-button']}>
                    Reply
                </p>
            </div>

            {/* Content */}
            <p className={styles['thread-item__text']}>
                {'replyingTo' in item && item.replyingTo && (
                    <span className={styles['thread-item__mention']}>@{item.replyingTo} </span>
                )}
                {item.content}
            </p>

            {/* Reply Form */}
            {isReplyOpen && (
                <div className={styles['thread-item__reply-form']}>
                    <textarea
                        className={styles['thread-item__reply-textarea']}
                        placeholder='Replying...'
                        value={formData.content}
                        onChange={(e) => setFormData({ content: e.target.value })}
                    />
                    <button type='button' onClick={handleReplySubmit} className={styles['thread-item__reply-submit']}>
                        {width < 768 ? 'Reply' : 'Post Reply'}
                    </button>
                </div>
            )}

            {/* Render nested replies recursively */}
            {item.replies && item.replies.length > 0 && (
                <div className={styles['thread-item__replies']}>
                    <div className={styles['thread-item__divider']} />
                    <div className={styles['thread-item__replies-list']}>
                        {item.replies.map((reply) => (
                            <ThreadItem
                                key={reply.id}
                                item={reply}
                                currentFeedback={currentFeedback}
                                user={user}
                                setCurrentFeedback={setCurrentFeedback}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThreadItem;
