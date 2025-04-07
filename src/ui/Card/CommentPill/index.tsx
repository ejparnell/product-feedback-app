import { ProductRequest } from '../../../constants/types';
import styles from './CommentPill.module.css';

interface Props {
    feedback: ProductRequest;
}

const CommentPill = ({ feedback }: Props) => {
    const formattedComments = feedback.comments?.length || 0;

    return (
        <div className={styles['comment-pill__pill']}>
            <img src='/assets/shared/icon-comments.svg' alt='Comment' />
            <p className={`${styles['comment-pill__text--bold']} ${styles['comment-pill__text']}`}>
                {formattedComments}
            </p>
        </div>
    );
};

export default CommentPill;
