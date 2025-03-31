import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import RoadmapLayout from './roadmap/RoadmapLayout';
import Feedback from './feedback';
import { getLocalFeedback } from './api/feedback';
import { loadLocalData } from './api/feedback';
import { FeedbackProvider } from './context/FeedbackProvider';
import FeedbackDetail from './feedback/[:id]/FeedbackDetail';
import FeedbackNew from './feedback/FeedbackNew';
import { UserProvider } from './context/UserProvider';

loadLocalData();

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to='/feedback' replace />,
    },
    {
        path: '/roadmap',
        element: <RoadmapLayout />,
        children: [
            {
                index: true,
                element: <div>Roadmap Home - List</div>,
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
                        element: <div>Feedback Edit</div>,
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
