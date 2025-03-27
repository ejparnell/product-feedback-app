import { defaultData } from '../constants/default-data';

interface ProductRequest {
    id: number
    title: string
    category: string
    upvotes: number
    status: 'suggestion' | 'planned' | 'in-progress' | 'live'
    description: string
    comments?: Comment[]
}

interface Comment {
    id: number
    content: string
    user: {
        image: string
        name: string
        username: string
    }
    replies?: Reply[]
}

interface Reply {
    content: string
    replyingTo: string
    user: {
        image: string
        name: string
        username: string
    }
}


// Loaded in main.tsx
export const loadDefaultData = () => {
    if (!localStorage.getItem('currentUser')) {
        const currentUser = defaultData.filter(data => data.key === 'currentUser');
        localStorage.setItem('currentUser', JSON.stringify(currentUser[0].value));

        const productRequests = defaultData.filter(data => data.key === 'productRequests');
        localStorage.setItem('productRequests', JSON.stringify(productRequests[0].value));
    } else {
        return console.log('Data already loaded');
    }
}

// Get the Planned, In Progress, and Live breakdown of the roadmap
export const getRoadmapBreakdown = () => {
    const productRequests = JSON.parse(localStorage.getItem('productRequests')!) as ProductRequest[]

    const breakdown = {
        planned: 0,
        inProgress: 0,
        live: 0
    }

    productRequests.forEach((request: ProductRequest) => {
        if (request.status === 'planned') {
            breakdown.planned++
        } else if (request.status === 'in-progress') {
            breakdown.inProgress++
        } else if (request.status === 'live') {
            breakdown.live++
        }
    })

    return breakdown
}

// Get all feedback requests
export const getAllFeedback = () => {
    return JSON.parse(localStorage.getItem('productRequests')!) as ProductRequest[]
}

// Set all feedback requests
export const setAllFeedback = (data: ProductRequest[]) => {
    localStorage.setItem('productRequests', JSON.stringify(data))
}

// Get Current Users Voted Requests
export const getVotedRequests = () => {
    return JSON.parse(localStorage.getItem('votedRequests') || '[]')
}