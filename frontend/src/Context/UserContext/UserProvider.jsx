import { useEffect, useState } from "react";
import { UserContext } from "./UserContext.jsx";
import { getUserMe } from "../../services/authService.js";

export const UserProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(
        () => localStorage.getItem("auth_token") || null
    );
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userToken) {
                localStorage.setItem("auth_token", userToken);
                if (!userData) {
                    try {
                        const response = await getUserMe(userToken);
                        setUserData(response.data.user);
                    } catch (error) {
                        console.error("Error al obtener datos del usuario:", error);
                    }
                }
            } else {
                localStorage.removeItem("auth_token");
                setUserData(null);
            }
        };

        fetchUserData();
    }, [userToken]);

    const values = {
        userToken,
        setUserToken,
        userData,
        setUserData
    };

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
};
