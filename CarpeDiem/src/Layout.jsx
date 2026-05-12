import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="app-shell">
            <header className="app-header">
                <h1 className="app-title">Carpe Diem</h1>

                <nav className="app-nav">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>
                        Daily Schedule
                    </NavLink>
                    <NavLink to="/planning" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Planning
                    </NavLink>
                    <NavLink to="/user-info" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        User Info
                    </NavLink>
                    <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Settings
                    </NavLink>
                </nav>
            </header>

            <main className="page-content">
                <Outlet />
            </main>
        </div>
    );
}