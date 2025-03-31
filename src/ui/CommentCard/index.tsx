import { Comment, Reply } from '../../constants/types';
import { Link } from 'react-router';
import { useState } from 'react';
import styles from './CommentCard.module.css';

interface Props {
    comment: Comment;
}

interface ReplyProps {
    reply: Reply;
    isReplyOpen: boolean;
    setIsReplyOpen: (value: boolean) => void;
    formData: { content: string };
    setFormData: (value: { content: string }) => void;
}

const ReplyCard = ({ reply, isReplyOpen, setIsReplyOpen, formData, setFormData }: ReplyProps) => (
    <div className={styles['comment-card__reply']} key={reply.id}>
        <div className={styles['comment-card__header']}>
            <img
                className={styles['comment-card__avatar']}
                src={reply.user.image}
                alt={reply.user.name}
            />
            <div className={styles['comment-card__user-info']}>
                <p className={styles['comment-card__name']}>{reply.user.name}</p>
                <p className={styles['comment-card__username']}>@{reply.user.username}</p>
            </div>
            <p onClick={() => setIsReplyOpen(prev => !prev)} className={styles['comment-card__reply-button']}>
                Reply
            </p>
        </div>
        <p className={styles['comment-card__text']}>
            <span className={styles['comment-card__mention']}>@{reply.replyingTo}</span>
            {reply.content}
        </p>
    </div>
);

const CommentCard = ({ comment }: Props) => {
    const [isReplyOpen, setIsReplyOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState({ content: '' });

    return (
        <div>
            {/* Commenter Header */}
            <div className={styles['comment-card__header']}>
                <img
                    className={styles['comment-card__avatar']}
                    src={comment.user.image}
                    alt={comment.user.name}
                />
                <div className={styles['comment-card__user-info']}>
                    <p className={styles['comment-card__name']}>{comment.user.name}</p>
                    <p className={styles['comment-card__username']}>@{comment.user.username}</p>
                </div>
                <Link className={styles['comment-card__reply-button']} to="/new">
                    Reply
                </Link>
            </div>

            {/* Comment Text */}
            <p className={styles['comment-card__text']}>{comment.content}</p>

            {/* Replies */}
            {comment.replies && (
                <div className={styles['comment-card__replies']}>
                    <div className={styles['comment-card__divider']} />
                    <div className={styles['comment-card__replies-list']}>
                        {comment.replies.map((reply) => (
                            <ReplyCard
                                reply={reply}
                                key={reply.id}
                                isReplyOpen={isReplyOpen}
                                setIsReplyOpen={setIsReplyOpen}
                                formData={formData}
                                setFormData={setFormData}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentCard;
