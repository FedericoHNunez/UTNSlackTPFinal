import "../MessagesChannelDefault/MessagesChannelDefault.css";

const DM_FEATURES = [
    {
        id: "one-on-one",
        title: "Conversaciones 1 a 1 en privado",
        description:
            "Escribile directamente a cualquier miembro de tu espacio de trabajo para resolver dudas puntuales o coordinar tareas.",
        accent: "blue",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
        )
    },
    {
        id: "history",
        title: "Historial siempre disponible",
        description:
            "Todos los mensajes directos quedan guardados y ordenados cronológicamente para que puedas retomar cualquier charla.",
        accent: "green",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15.5 12" />
            </svg>
        )
    }
];

export const MessagesPrivateDefaultScreen = () => {
    return (
        <section className="channel-welcome" aria-label="Bienvenida a mensajes directos">
            <header className="channel-welcome-hero">
                <div className="channel-welcome-copy">
                    <div className="channel-welcome-badge">
                        <span className="channel-welcome-badge-dots" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                            <span />
                        </span>
                        <span>UTN Slack • Mensajes Directos</span>
                    </div>

                    <h1 className="channel-welcome-title">
                        Tus{" "}
                        <span className="channel-welcome-highlight">mensajes privados</span>{" "}
                        con el equipo 💬
                    </h1>

                    <p className="channel-welcome-subtitle">
                        Seleccioná a un miembro en el panel izquierdo para iniciar o continuar
                        una conversación privada uno a uno.
                    </p>
                </div>
            </header>

            <div className="channel-welcome-features-section">
                <div className="channel-welcome-section-header">
                    <h2>Comunicación directa con tus compañeros</h2>
                    <span>Elegí un contacto de la lista lateral para escribirle</span>
                </div>

                <div className="channel-welcome-grid">
                    {DM_FEATURES.map((feature) => (
                        <article key={feature.id} className="channel-feature-card">
                            <div
                                className={`channel-feature-icon channel-feature-icon--${feature.accent}`}
                                aria-hidden="true"
                            >
                                {feature.icon}
                            </div>
                            <div className="channel-feature-body">
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MessagesPrivateDefaultScreen;
