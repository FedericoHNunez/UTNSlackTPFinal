import { Outlet, useParams } from "react-router";
import { ConversationList } from "../../Components/DirectMessagesList/DirectMessagesList.jsx";
import { useMobileLayer } from "../../hooks/useMobileLayer.js";
import "../ChannelLayout/ChannelLayout.css";

export const MessagesPrivateLayout = () => {
    const { user_id } = useParams();
    const {
        isSidebarActive,
        isChatActive,
        handleSidebarClick,
        showChatLayer,
        showSidebarLayer
    } = useMobileLayer(user_id, "members");

    return (
        <>
            <aside
                className={`channel-layout-aside ${
                    isSidebarActive ? "is-mobile-active" : "is-mobile-hidden"
                }`}
                aria-label="Lista de mensajes directos"
                onClick={handleSidebarClick}
            >
                <header className="channel-layout-mobile-bar channel-layout-mobile-bar--aside">
                    <span className="channel-layout-mobile-title">Mensajes directos</span>
                    {user_id && (
                        <button
                            type="button"
                            className="channel-layout-layer-btn"
                            onClick={showChatLayer}
                        >
                            <span>Ir al chat →</span>
                        </button>
                    )}
                </header>
                <div className="channel-layout-aside-content">
                    <ConversationList />
                </div>
            </aside>

            <section
                className={`channel-layout-section ${
                    isChatActive ? "is-mobile-active" : "is-mobile-hidden"
                }`}
                aria-label="Conversación privada"
            >
                <header className="channel-layout-mobile-bar channel-layout-mobile-bar--section">
                    <button
                        type="button"
                        className="channel-layout-back-btn"
                        onClick={showSidebarLayer}
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
