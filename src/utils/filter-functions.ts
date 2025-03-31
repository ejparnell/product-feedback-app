import { ProductRequest, Filter } from '../constants/types';

export const filterFeedback = (feedback: ProductRequest[], sortBy: Filter) => {
    switch (sortBy.value) {
        case 'all':
            return feedback;
        case 'ui':
            return feedback.filter(
                (item: { category: string }) => item.category === 'ui'
            );
        case 'ux':
            return feedback.filter(
                (item: { category: string }) => item.category === 'ux'
            );
        case 'enhancement':
            return feedback.filter(
                (item: { category: string }) => item.category === 'enhancement'
            );
        case 'bug':
            return feedback.filter(
                (item: { category: string }) => item.category === 'bug'
            );
        case 'feature':
            return feedback.filter(
                (item: { category: string }) => item.category === 'feature'
            );
        default:
            return feedback;
    }
};

export const sortFeedback = (feedback: ProductRequest[], sortBy: Filter) => {
    switch (sortBy.value) {
        case 'most-upvotes':
            return [...feedback].sort((a, b) => b.upvotes - a.upvotes);
        case 'least-upvotes':
            return [...feedback].sort((a, b) => a.upvotes - b.upvotes);
        case 'most-comments':
            return [...feedback].sort(
                (a, b) => (b.comments?.length ?? 0) - (a.comments?.length ?? 0)
            );
        case 'least-comments':
            return [...feedback].sort(
                (a, b) => (a.comments?.length ?? 0) - (b.comments?.length ?? 0)
            );
        default:
            return feedback;
    }
};
