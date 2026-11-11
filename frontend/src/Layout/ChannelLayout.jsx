import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { ChannelScreen } from "../screens/ChannelScreen/ChannelScreen.jsx";
import WorkspaceNavbar from "../Components/WorkspaceNavBar/WorkspaceNavBar.jsx";
import { WorkspaceHeader } from "../Components/WorkspaceHeader/WorkspaceHeader.jsx";
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
        <div
            className={`channel-layout ${
                mobileLayer === "chat" ? "is-mobile-chat-open" : "is-mobile-channels-open"
            }`}
        >
            {/* Barra superior de ancho completo */}
            <header className="channel-layout-header">
                <WorkspaceHeader />
            </header>

            {/* Contenedor principal de 3 columnas (Desktop) / Sistema de capas (Mobile) */}
            <div className="channel-layout-body">
                {/* Columna 1: Barra lateral de navegación global (Rail izquierdo en desktop / Barra inferior en móvil) */}
                <aside className="channel-layout-rail" aria-label="Navegación del espacio de trabajo">
                    <WorkspaceNavbar />
                </aside>

                {/* Marco principal que agrupa la lista de canales y el área de mensajes */}
                <div className="channel-layout-workspace">
                    {/* Columna 2 (Capa 1 en móvil): Lista de canales del workspace */}
                    <aside className="channel-layout-sidebar" aria-label="Lista de canales">
                        {channel_id && (
                            <div className="channel-layout-mobile-bar channel-layout-mobile-bar--sidebar">
                                <span className="channel-layout-mobile-title">Canales</span>
                                <button
                                    type="button"
                                    className="channel-layout-layer-btn"
                                    onClick={() => setMobileLayer("chat")}
                                >
                                    <span>Ir al chat</span>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        <div
                            className="channel-layout-sidebar-content"
                            onClick={handleSidebarClick}
                        >
                            <ChannelScreen />
                        </div>
                    </aside>

                    {/* Columna 3 (Capa 2 superpuesta en móvil): Contenido principal / Mensajes del canal */}
                    <main className="channel-layout-main" aria-label="Mensajes del canal">
                        <div className="channel-layout-mobile-bar channel-layout-mobile-bar--main">
                            <button
                                type="button"
                                className="channel-layout-back-btn"
                                onClick={() => setMobileLayer("channels")}
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                                <span>Canales</span>
                            </button>
                        </div>

                        <div className="channel-layout-main-content">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};
