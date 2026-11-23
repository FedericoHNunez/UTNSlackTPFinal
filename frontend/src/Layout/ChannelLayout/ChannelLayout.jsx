import { Outlet, useParams } from "react-router";
import { ChannelScreen } from "../../screens/ChannelScreen/ChannelScreen.jsx";
import { useMobileLayer } from "../../hooks/useMobileLayer.js";
import "./ChannelLayout.css";

export const ChannelLayout = () => {
    const { channel_id } = useParams();
    const {
        isSidebarActive,
        isChatActive,
        handleSidebarClick,
        showChatLayer,
        showSidebarLayer
    } = useMobileLayer(channel_id, "channels");

    return (
        <>
            <aside
                className={`channel-layout-aside ${
                    isSidebarActive ? "is-mobile-active" : "is-mobile-hidden"
                }`}
                aria-label="Lista de canales"
                onClick={handleSidebarClick}
            >
                {channel_id && (
                    <header className="channel-layout-mobile-bar channel-layout-mobile-bar--aside">
                        <span className="channel-layout-mobile-title">Canales</span>
                        <button
                            type="button"
                            className="channel-layout-layer-btn"
                            onClick={showChatLayer}
                        >
                            <span>Ir al chat →</span>
                        </button>
                    </header>
                )}
                <div className="channel-layout-aside-content">
                    <ChannelScreen />
                </div>
            </aside>

            <section
                className={`channel-layout-section ${
                    isChatActive ? "is-mobile-active" : "is-mobile-hidden"
                }`}
                aria-label="Mensajes del canal"
            >
                <header className="channel-layout-mobile-bar channel-layout-mobile-bar--section">
                    <button
                        type="button"
                        className="channel-layout-back-btn"
                        onClick={showSidebarLayer}
                    >
                        <span>← Canales</span>
                    </button>
                </header>
                <div className="channel-layout-section-content">
                    <Outlet />
                </div>
            </section>
        </>
    );
};
