import { User } from '../constants/types';

// Get user from local storage
export const getLocalUser = () => {
    return JSON.parse(localStorage.getItem('currentUser') || '{}') as User;
}