export interface ProductRequest {
    id: number;
    title: string;
    category: string;
    upvotes: number;
    status: Status;
    description: string;
    comments?: Comment[];
}

export interface Status {
    value: 'suggestion' | 'planned' | 'in-progress' | 'live';
    label: 'Suggestion' | 'Planned' | 'In Progress' | 'Live';
}

export interface Comment {
    id: number;
    content: string;
    user: User;
    replies?: Reply[];
}

export interface Reply {
    id: number;
    content: string;
    replyingTo: string;
    user: User;
    replies?: Reply[];
}

export interface User {
    name: string;
    username: string;
    image: string;
}

export interface Filter {
    value: string;
    label: string;
}

export type VoteMode = 'upvote' | 'remove';
