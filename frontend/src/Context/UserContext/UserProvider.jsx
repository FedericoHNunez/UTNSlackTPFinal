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
            if (!userData) {
                getUserMe(userToken)
                    .then((res) => setUserData(res.data.user))
                    .catch(() => {
                        setUserToken(null);
                        setUserData(null);
                    });
            }
        } else {
            localStorage.removeItem("auth_token");
            setUserData(null);
        }
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
