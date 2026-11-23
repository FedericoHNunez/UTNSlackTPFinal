import { useEffect, useState } from "react";

export function useMobileLayer(activeId, sidebarLayerName = "sidebar") {
    const [mobileLayer, setMobileLayer] = useState(
        activeId ? "chat" : sidebarLayerName
    );

    useEffect(() => {
        if (activeId) {
            setMobileLayer("chat");
        } else {
            setMobileLayer(sidebarLayerName);
        }
    }, [activeId, sidebarLayerName]);

    const handleSidebarClick = (e) => {
        if (e.target.closest("a")) {
            setMobileLayer("chat");
        }
    };

    const showChatLayer = () => setMobileLayer("chat");
    const showSidebarLayer = () => setMobileLayer(sidebarLayerName);

    return {
        mobileLayer,
        setMobileLayer,
        isSidebarActive: mobileLayer === sidebarLayerName,
        isChatActive: mobileLayer === "chat",
        handleSidebarClick,
        showChatLayer,
        showSidebarLayer
    };
}

export default useMobileLayer;
