import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import Feedback from './feedback';
import { getLocalFeedback } from './api/feedback';
import { loadLocalData } from './api/feedback';
import { FeedbackProvider } from './context/FeedbackProvider';
import FeedbackDetail from './feedback/[:id]/FeedbackDetail';
import FeedbackNew from './feedback/FeedbackNew';
import { UserProvider } from './context/UserProvider';
import FeedbackEdit from './feedback/[:id]/FeedbackEdit';
import Roadmap from './roadmap';

loadLocalData();

const router = createBrowserRouter([
    // {
    //     path: '/',
    //     element: <Navigate to='/feedback' replace />,
    // },
    {
        path: '/roadmap',
        children: [
            {
                index: true,
                element: <Roadmap />,
            },
        ],
    },
    {
        path: '/feedback',
        children: [
            {
                index: true,
                element: <Feedback />,
                loader: getLocalFeedback,
            },
            {
                path: 'new',
                element: <FeedbackNew />,
            },
            {
                path: ':id',
                children: [
                    {
                        index: true,
                        element: <FeedbackDetail />,
                    },
                    {
                        path: 'edit',
                        element: <FeedbackEdit />,
                    },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <FeedbackProvider>
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    </FeedbackProvider>
);
