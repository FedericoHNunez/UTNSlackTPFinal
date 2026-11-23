import { useEffect, useState } from "react";
import { UserContext } from "./UserContext.jsx";
import { getUserMe } from "../../services/authService.js";
import { useDeleteUser } from "../../hooks/fetch/useUser.js";

export const UserProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(
        () => localStorage.getItem("auth_token") || null
    );
    const [userData, setUserData] = useState(null);

    const {
        delete_user_loading,
        delete_user_error,
        delete_user_response,
        deleteUser
    } = useDeleteUser();

    useEffect(() => {
        if (userToken) {
            localStorage.setItem("auth_token", userToken);
        } else {
            localStorage.removeItem("auth_token");
            setUserData(null);
        }
    }, [userToken]);

    const fetchUserData = async () => {
        if (userToken && !userData) {
            try {
                const response = await getUserMe(userToken);
                if (response?.data?.user) {
                    setUserData(response.data.user);
                }
            } catch (error) {
                console.error("Error al obtener datos del usuario:", error);
            }
        }
    };

    const handleDeleteUser = () => {
        if (!userToken) return;
        deleteUser(userToken);
    };

    const values = {
        userToken,
        setUserToken,
        userData,
        setUserData,
        fetchUserData,
        delete_user_loading,
        delete_user_error,
        delete_user_response,
        handleDeleteUser
    };

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
};
