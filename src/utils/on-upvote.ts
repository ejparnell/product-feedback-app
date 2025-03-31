import { ProductRequest, VoteMode } from '../constants/types';
import { setLocalFeedback } from '../api/feedback';

export const onUpvote = (
    feedback: ProductRequest[],
    id: number,
    mode: VoteMode
) => {
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

    setLocalFeedback(updatedFeedback);
    return updatedFeedback;
};
