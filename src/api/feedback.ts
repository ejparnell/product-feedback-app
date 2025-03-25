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
    }
}

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

