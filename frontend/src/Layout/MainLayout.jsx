import { Outlet } from "react-router";
import WorkspaceNavbar from "../Components/WorkspaceNavBar/WorkspaceNavBar.jsx";
import { WorkspaceHeader } from "../Components/WorkspaceHeader/WorkspaceHeader.jsx";
import "./MainLayout.css";


export const NavLayout = () => {
    return (
        <div className="nav-layout">
            <header className="nav-layout-header">
                <WorkspaceHeader />
            </header>
            <nav className="nav-layout-nav" aria-label="Navegación del espacio de trabajo">
                <WorkspaceNavbar />
            </nav>
            <main className="nav-layout-main">
                <Outlet />
            </main>
        </div>
    );
};


