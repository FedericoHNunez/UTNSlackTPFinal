import { Outlet, Routes, Route } from "react-router";
import { WorkspaceNavbar } from "../Components/WorkspaceNavBar";

export const WorkspaceLayout = () => {
    return (
        <>
            {/* Navbar de workspace */}


            <WorkspaceNavbar />

            <Outlet />
        </>
    );
}