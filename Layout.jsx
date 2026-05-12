import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    const linkStyle = ({ isActive }) => ({
        marginRight: "12px",
        textDecoration: "none",
        color: isActive ? "#2563eb" : "#333",
        fontWeight: isActive ? "700" : "400",
    });

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <header style={{ marginBottom: "24px" }}>
                <h1 style={{ marginBottom: "12px" }}>Carpe Diem</h1>

                <nav>
                    <NavLink to="/" style={linkStyle} end>
                        Daily Schedule
                    </NavLink>
                    <NavLink to="/planning" style={linkStyle}>
                        Planning
                    </NavLink>
                    <NavLink to="/user-info" style={linkStyle}>
                        User Info
                    </NavLink>
                    <NavLink to="/settings" style={linkStyle}>
                        Settings
                    </NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}