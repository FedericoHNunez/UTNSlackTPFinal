import { Outlet, Routes, Route } from "react-router";

import { ChannelScreen } from "../screens/ChannelScreen/ChannelScreen.jsx";
import WorkspaceNavbar from "../Components/WorkspaceNavBar/WorkspaceNavBar.jsx";

export const ChannelLayout = () => {

    return (
        <>
            <WorkspaceNavbar />
            <ChannelScreen />
            <Outlet />
        </>
    );
}