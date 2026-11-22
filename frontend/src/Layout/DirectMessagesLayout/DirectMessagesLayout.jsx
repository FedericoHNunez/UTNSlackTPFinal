import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { ConversationList } from "../../Components/DirectMessagesList/DirectMessagesList.jsx";
import "../ChannelLayout/ChannelLayout.css";

export const MessagesPrivateLayout = () => {
    const { user_id } = useParams();
    const [mobileLayer, setMobileLayer] = useState(user_id ? "chat" : "members");

    useEffect(() => {
        if (user_id) {
            setMobileLayer("chat");
        } else {
            setMobileLayer("members");
        }
    }, [user_id]);

    const handleSidebarClick = (e) => {
        if (e.target.closest("a")) {
            setMobileLayer("chat");
        }
    };

    return (
        <>
            <aside
                className={`channel-layout-aside ${
                    mobileLayer === "members" ? "is-mobile-active" : "is-mobile-hidden"
                }`}
                aria-label="Lista de mensajes directos"
                onClick={handleSidebarClick}
            >
                {user_id && (
                    <header className="channel-layout-mobile-bar channel-layout-mobile-bar--aside">
                        <span className="channel-layout-mobile-title">Mensajes directos</span>
                        <button
                            type="button"
                            className="channel-layout-layer-btn"
                            onClick={() => setMobileLayer("chat")}
                        >
                            <span>Ir al chat →</span>
                        </button>
                    </header>
                )}
                <div className="channel-layout-aside-content">
          <ConversationList />
                </div>
            </aside>

            <section
                className={`channel-layout-section ${
                    mobileLayer === "chat" ? "is-mobile-active" : "is-mobile-hidden"
                }`}
                aria-label="Conversación privada"
            >
                <header className="channel-layout-mobile-bar channel-layout-mobile-bar--section">
                    <button
                        type="button"
                        className="channel-layout-back-btn"
                        onClick={() => setMobileLayer("members")}
                    >
                        <span>← Mensajes directos</span>
                    </button>
                </header>
                <div className="channel-layout-section-content">
                    <Outlet />
                </div>
            </section>
        </>
    );
};

export default MessagesPrivateLayout;

