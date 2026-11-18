import { Navigate, Outlet } from "react-router";
import { UserContext } from "../Context/UserContext/UserContext";
import { useContext, useEffect } from "react";
import { WorkspaceProvider } from "../Context/WorkspaceContext/WorkspaceProvider";
import { MembersProvider } from "../Context/MembersContext/MembersProvider";
import { ChannelProvider } from "../Context/ChannelContext/ChannelProvider";
import { MessagesProvider } from "../Context/MessagesContext/MessagesProvider";

export const AuthMiddleware = () => {
    const { userToken, fetchUserData } = useContext(UserContext);

    useEffect(() => {
        if (userToken) {
            fetchUserData();
        }
    }, [userToken]);

    if (userToken) {
        return (
            <WorkspaceProvider>
                <MembersProvider>
                    <ChannelProvider>
                        <MessagesProvider>
                            <Outlet />
                        </MessagesProvider>
                    </ChannelProvider>
                </MembersProvider>
            </WorkspaceProvider>
        );
    } else {
        return <Navigate to="/home" />;
    }
};
