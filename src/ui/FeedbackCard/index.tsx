import { ProductRequest } from '../../constants/types';
import styles from './FeedbackCard.module.css';
import VotePill from '../Card/VotePill';
import CardHeader from '../Card/CardHeader';
import CommentPill from '../Card/CommentPill';

interface Props {
    feedback: ProductRequest;
}

const FeedbackCard = ({ feedback }: Props) => {
    return (
        <div className={styles['feedback-card']}>
            <div>
                <CardHeader feedback={feedback} />
            </div>
            <VotePill feedback={feedback} />
            <CommentPill feedback={feedback} />
        </div>
    );
};

export default FeedbackCard;
