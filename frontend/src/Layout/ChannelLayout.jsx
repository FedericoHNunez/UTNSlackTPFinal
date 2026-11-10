import { Outlet, Routes, Route } from "react-router";
import { ChannelScreen } from "../screens/ChannelScreen/ChannelScreen.jsx";
import WorkspaceNavbar from "../Components/WorkspaceNavBar/WorkspaceNavBar.jsx";
import { WorkspaceHeader } from "../Components/WorkspaceHeader/WorkspaceHeader.jsx";
import "./ChannelLayout.css";

export const ChannelLayout = () => {

    return (
        <>
            <WorkspaceHeader />
            <WorkspaceNavbar />
            <ChannelScreen />
            <Outlet />
        </>
    );
}