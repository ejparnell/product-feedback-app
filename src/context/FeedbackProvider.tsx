import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductRequest, Filter } from '../constants/types';
import { getLocalFeedback } from '../api/feedback';
import { filterFeedback, sortFeedback } from '../utils/filter-functions';

interface FeedbackContextType {
    feedback: ProductRequest[];
    filteredFeedback: ProductRequest[];
    setFeedback: React.Dispatch<React.SetStateAction<ProductRequest[]>>;
    filter: Filter;
    setFilter: React.Dispatch<React.SetStateAction<Filter>>;
    sortBy: Filter;
    setSortBy: React.Dispatch<React.SetStateAction<Filter>>;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const FeedbackProvider = ({ children }: Props) => {
    const [feedback, setFeedback] = useState<ProductRequest[]>([]);
    const [filteredFeedback, setFilteredFeedback] = useState<ProductRequest[]>([]);
    const [filter, setFilter] = useState({ value: 'all', label: 'All' });
    const [sortBy, setSortBy] = useState({
        value: 'most-upvotes',
        label: 'Most Upvotes',
    });

    // Load feedback from local storage - On mount
    useEffect(() => {
        const localFeedback = getLocalFeedback();
        if (localFeedback) setFeedback(localFeedback);
        else setFeedback([]);
    }, []);

    // Filter feedback based on selected filter - Nav Pill filters
    useEffect(() => {
        setFilteredFeedback(filterFeedback(feedback, filter));
    }, [filter, feedback]);

    // Sort feedback based on selected filter - Sort dropdown
    useEffect(() => {
        const filtered = filterFeedback(feedback, filter);
        const sorted = sortFeedback(filtered, sortBy);
        setFilteredFeedback(sorted);
    }, [feedback, filter, sortBy]);

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                setFeedback,
                filteredFeedback,
                filter,
                setFilter,
                sortBy,
                setSortBy,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

export const useFeedback = () => {
    const context = useContext(FeedbackContext);
    if (!context) {
        throw new Error('useFeedback must be used within a FeedbackProvider');
    }
    return context;
};
