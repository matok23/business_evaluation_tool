import { useState } from 'react';
import {
    Link,
    useNavigate,
} from 'react-router';

import { useAuth } from '../auth/AuthContext';

export default function DashboardHeader() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [isLoggingOut, setIsLoggingOut] =
        useState(false);

    async function handleLogout() {
        setIsLoggingOut(true);

        try {
            await logout();
            navigate('/login', {
                replace: true,
            });
        } finally {
            setIsLoggingOut(false);
        }
    }

    return (
        <header className="dashboard-header">
            <div className="dashboard-header-left">
                <Link
                    className="button button-primary"
                    to="/businesses/new"
                >
                    Create new business
                </Link>
            </div>

            <h1 className="dashboard-title">
                <Link
                    to="/dashboard"
                >
                    Dashboard
                </Link>
            </h1>

            <div className="dashboard-header-right">
                <button
                    className="button button-secondary"
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                >
                    {isLoggingOut ? 'Logging out…' : 'Logout'}
                </button>
            </div>
        </header>
    );
}