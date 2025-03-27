import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
  } from 'react-router-dom';
import './index.css';
import FeedbackLayout from './feedback/FeedbackLayout';
import RoadmapLayout from './roadmap/RoadmapLayout';
import Feedback from './feedback';
import { getAllFeedback } from './api/feedback';
import { loadDefaultData } from './api/feedback';

loadDefaultData();

const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/feedback' replace />
    },
    {
      path: '/roadmap',
      element: <RoadmapLayout />,
      children: [
        {
          index: true,
          element: <div>Roadmap Home - List</div>
        },
      ]
    },
    {
      path: '/feedback',
      element: <FeedbackLayout />,
      children: [
        {
          index: true,
          element: <Feedback />,
          loader: getAllFeedback,
        },
        {   
          path: 'new',
          element: <div>Feedback New</div>
        },
        {
          path: ':id',
          children: [
            {
              index: true,
              element: <div>Feedback Detail</div>
            },
            {
              path: 'edit',
              element: <div>Feedback Edit</div>
            }
          ]
        }
      ]
    }
  ]);
  

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
);
