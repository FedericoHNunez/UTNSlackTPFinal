import { ChannelContext } from "./ChannelContext.jsx";

export const ChannelProvider = ({ children }) => {
    const values = {};

    return (
        <ChannelContext.Provider value={values}>
            {children}
        </ChannelContext.Provider>
    );
};
