import { User } from '../constants/types';

export const getLocalUser = () => {
    return JSON.parse(localStorage.getItem('currentUser') || '{}') as User;
}