import { Outlet } from 'react-router';

import DashboardHeader from '../components/Dashboardheader';

export default function DashboardLayout() {
    return (
        <div className="dashboard-layout">
            <DashboardHeader />

            <main className="dashboard-content">
                <Outlet />
            </main>
        </div>
    );
}