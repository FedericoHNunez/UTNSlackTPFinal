import { Navigate, Outlet } from "react-router";
import { UserContext } from "../Context/UserContext/UserContext";
import { useContext } from "react";

export const AuthMiddleware = () => {
    const { userToken } = useContext(UserContext);

    if (userToken) {
        return <Outlet />;
    } else {
        return <Navigate to="/home" />;
    }
};
