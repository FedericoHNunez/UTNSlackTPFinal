import { Navigate, Outlet } from "react-router";
import { UserContext } from "../Context/UserContext/UserContext";
import { useContext, useEffect } from "react";

export const AuthMiddleware = () => {
    const { userToken, fetchUserData } = useContext(UserContext);

    useEffect(() => {
        if (userToken) {
            fetchUserData();
        }
    }, [userToken]);

    if (userToken) {
        return <Outlet />;
    } else {
        return <Navigate to="/home" />;
    }
};
