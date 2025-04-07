import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../constants/types';
import { getLocalUser } from '../api/user';

interface UserContextType {
    user: User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const localUser = getLocalUser();
        if (localUser) setUser(localUser);
    }, []);

    return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
