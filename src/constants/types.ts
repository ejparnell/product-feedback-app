export interface ProductRequest {
    id: number;
    title: string;
    category: string;
    upvotes: number;
    status: 'suggestion' | 'planned' | 'in-progress' | 'live';
    description: string;
    comments?: Comment[];
}

export interface Comment {
    id: number;
    content: string;
    user: User;
    replies?: Reply[];
}

export interface Reply {
    content: string;
    replyingTo: string;
    user: User;
}

export interface User {
    name: string;
    username: string;
    image: string;
}

export type VoteMode = 'upvote' | 'remove'
