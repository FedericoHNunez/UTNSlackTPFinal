import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { ChannelScreen } from "../../screens/ChannelScreen/ChannelScreen.jsx";
import "./ChannelLayout.css";



export const ChannelLayout = () => {
    const { channel_id } = useParams();
    const [mobileLayer, setMobileLayer] = useState(channel_id ? "chat" : "channels");

    // Cambia automáticamente a la capa de chat en móvil cuando se selecciona un canal
    useEffect(() => {
        if (channel_id) {
            setMobileLayer("chat");
        } else {
            setMobileLayer("channels");
        }
    }, [channel_id]);

    const handleSidebarClick = (e) => {
        if (e.target.closest("a")) {
            setMobileLayer("chat");
        }
    };

    return (
        <>
            <aside
                className={`channel-layout-aside ${
                    mobileLayer === "channels" ? "is-mobile-active" : "is-mobile-hidden"
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
                            onClick={() => setMobileLayer("chat")}
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
                    mobileLayer === "chat" ? "is-mobile-active" : "is-mobile-hidden"
                }`}
                aria-label="Mensajes del canal"
            >
                <header className="channel-layout-mobile-bar channel-layout-mobile-bar--section">
                    <button
                        type="button"
                        className="channel-layout-back-btn"
                        onClick={() => setMobileLayer("channels")}
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

