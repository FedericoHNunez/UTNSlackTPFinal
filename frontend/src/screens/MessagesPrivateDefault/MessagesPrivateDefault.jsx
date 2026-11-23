import { DM_FEATURES } from "../../constants/welcomeFeaturesConstants.jsx";
import "../MessagesChannelDefault/MessagesChannelDefault.css";

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
