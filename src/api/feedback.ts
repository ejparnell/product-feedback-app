import { defaultData } from '../constants/default-data';
import { ProductRequest } from '../constants/types';

// Loaded in main.tsx
export const loadLocalData = () => {
    if (!localStorage.getItem('dataLoaded')) {
        const currentUser = defaultData.filter((data) => data.key === 'currentUser');
        localStorage.setItem('currentUser', JSON.stringify(currentUser[0].value));

        const productRequests = defaultData.filter((data) => data.key === 'productRequests');
        localStorage.setItem('productRequests', JSON.stringify(productRequests[0].value));

        localStorage.setItem('dataLoaded', 'true');
    } else {
        return console.log('Data already loaded');
    }
};

// Get the Planned, In Progress, and Live breakdown of the roadmap
export const getRoadmapBreakdown = () => {
    const productRequests = JSON.parse(localStorage.getItem('productRequests')!) as ProductRequest[];

    const breakdown = {
        planned: 0,
        inProgress: 0,
        live: 0,
    };

    if (!productRequests) return breakdown;

    productRequests.forEach((request: ProductRequest) => {
        if (request.status === 'planned') {
            breakdown.planned++;
        } else if (request.status === 'in-progress') {
            breakdown.inProgress++;
        } else if (request.status === 'live') {
            breakdown.live++;
        }
    });

    return breakdown;
};

// Get all feedback requests
export const getLocalFeedback = () => {
    return JSON.parse(localStorage.getItem('productRequests')!) as ProductRequest[];
};

// Set all feedback requests
export const setLocalFeedback = (data: ProductRequest[]) => {
    localStorage.setItem('productRequests', JSON.stringify(data));
};

// Get Current Users Voted Requests
export const getVotedRequests = () => {
    return JSON.parse(localStorage.getItem('votedRequests') || '[]');
};

export const updateLocalFeedback = (data: ProductRequest) => {
    const productRequests = getLocalFeedback();
    const updatedRequests = productRequests.map((request) =>
        request.id === data.id ? data : request
    );

    setLocalFeedback(updatedRequests);
};
