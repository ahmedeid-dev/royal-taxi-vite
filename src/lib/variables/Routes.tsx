// src/router/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../../pages/Layout/Layout';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/Signup/Signup';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import UpdateProfile from '../../pages/UpdateProfile/UpdateProfile';
import RequireAuth from '../context/RequireAuth';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: (
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                ),
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword />,
            },
            {
                path: '/update-profile',
                element: (
                    <RequireAuth>
                        <UpdateProfile />
                    </RequireAuth>
                ),
            },
            // Catch-all route for unknown paths
            {
                path: "*",
                element: <div> 404 Not Found</div>,
            },
        ],
    },
]);
