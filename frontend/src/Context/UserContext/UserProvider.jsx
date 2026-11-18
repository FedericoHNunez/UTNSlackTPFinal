import { useEffect, useState } from "react";
import { UserContext } from "./UserContext.jsx";
import { getUserMe } from "../../services/authService.js";

export const UserProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(
        () => localStorage.getItem("auth_token") || null
    );
    const [userData, setUserData] = useState(null);

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

    const values = {
        userToken,
        setUserToken,
        userData,
        setUserData,
        fetchUserData
    };

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
};
