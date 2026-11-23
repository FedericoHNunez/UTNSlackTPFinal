import { APP_FEATURES } from "../../constants/welcomeFeaturesConstants.jsx";
import "./MessagesChannelDefault.css";

export const MessagesChannelDefaultScreen = () => {
    return (
        <section className="channel-welcome" aria-label="Bienvenida a los canales">
            {/* Hero con presentación e ilustración animada */}
            <header className="channel-welcome-hero">
                <div className="channel-welcome-copy">
                    <div className="channel-welcome-badge">
                        <span className="channel-welcome-badge-dots" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                            <span />
                        </span>
                        <span>UTN Slack • Centro de Canales</span>
                    </div>

                    <h1 className="channel-welcome-title">
                        ¡Te damos la bienvenida a tu{" "}
                        <span className="channel-welcome-highlight">espacio de trabajo</span>!{" "}
                        <span className="channel-welcome-wave" role="img" aria-label="saludo">
                            👋
                        </span>
                    </h1>

                    <p className="channel-welcome-subtitle">
                        Aquí es donde fluye el trabajo en equipo. Seleccioná un canal en el panel
                        lateral para sumarte a la conversación o creá uno nuevo para organizar tu
                        próximo proyecto.
                    </p>

                    <div className="channel-welcome-pills" aria-hidden="true">
                        <span className="channel-welcome-pill"># general</span>
                        <span className="channel-welcome-pill"># entregas-tp</span>
                        <span className="channel-welcome-pill"># consultas</span>
                        <span className="channel-welcome-pill">+ Crear canal</span>
                    </div>
                </div>

                {/* Imagen SVG de referencia animada */}
                <div className="channel-welcome-visual" aria-hidden="true">
                    <svg
                        className="channel-welcome-illustration"
                        viewBox="0 0 380 280"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Halo pulsante de fondo */}
                        <circle
                            className="svg-pulse-ring"
                            cx="190"
                            cy="140"
                            r="105"
                            stroke="#611f69"
                            strokeOpacity="0.18"
                            strokeWidth="2"
                        />

                        {/* Ventana principal estilo Slack */}
                        <rect
                            x="35"
                            y="30"
                            width="310"
                            height="215"
                            rx="16"
                            fill="#1a1d21"
                        />
                        <rect
                            x="35"
                            y="30"
                            width="310"
                            height="34"
                            rx="16"
                            fill="#350d36"
                        />
                        {/* Barra superior con los 3 puntos */}
                        <circle cx="55" cy="47" r="5" fill="#e01e5a" />
                        <circle cx="71" cy="47" r="5" fill="#ecb22e" />
                        <circle cx="87" cy="47" r="5" fill="#2eb67d" />
                        <rect x="135" y="42" width="110" height="10" rx="5" fill="#522653" />

                        {/* Sidebar simulada */}
                        <path
                            d="M35 64H125V245H51C42.1634 245 35 237.837 35 229V64Z"
                            fill="#3f0e40"
                        />
                        <rect x="47" y="78" width="58" height="8" rx="4" fill="#ffffff" fillOpacity="0.85" />
                        <rect x="45" y="100" width="68" height="18" rx="5" fill="#1164a3" />
                        <rect x="52" y="106" width="46" height="6" rx="3" fill="#ffffff" />
                        <rect x="52" y="128" width="52" height="6" rx="3" fill="#ffffff" fillOpacity="0.45" />
                        <rect x="52" y="144" width="44" height="6" rx="3" fill="#ffffff" fillOpacity="0.45" />
                        <rect x="52" y="160" width="56" height="6" rx="3" fill="#ffffff" fillOpacity="0.45" />

                        {/* Área de chat clara */}
                        <path
                            d="M125 64H345V229C345 237.837 337.837 245 329 245H125V64Z"
                            fill="#ffffff"
                        />

                        {/* Mensaje 1 (Flotante) */}
                        <g className="svg-bubble-1">
                            <rect x="138" y="80" width="26" height="26" rx="6" fill="#36c5f0" />
                            <rect x="172" y="80" width="145" height="36" rx="8" fill="#f4ede4" />
                            <rect x="180" y="88" width="55" height="6" rx="3" fill="#491a54" />
                            <rect x="180" y="99" width="118" height="6" rx="3" fill="#616061" fillOpacity="0.6" />
                        </g>

                        {/* Mensaje 2 (Flotante con retardo) */}
                        <g className="svg-bubble-2">
                            <rect x="138" y="128" width="26" height="26" rx="6" fill="#2eb67d" />
                            <rect x="172" y="128" width="155" height="42" rx="8" fill="#edf9f3" />
                            <rect x="180" y="136" width="65" height="6" rx="3" fill="#1c7c50" />
                            <rect x="180" y="147" width="128" height="6" rx="3" fill="#616061" fillOpacity="0.6" />
                            <rect x="180" y="157" width="84" height="5" rx="2.5" fill="#616061" fillOpacity="0.4" />
                        </g>

                        {/* Indicador de "escribiendo..." animado */}
                        <rect x="138" y="184" width="66" height="22" rx="11" fill="#f4f4f4" />
                        <circle className="svg-typing-dot" cx="157" cy="195" r="3.5" fill="#611f69" />
                        <circle className="svg-typing-dot" cx="171" cy="195" r="3.5" fill="#36c5f0" />
                        <circle className="svg-typing-dot" cx="185" cy="195" r="3.5" fill="#e01e5a" />

                        {/* Caja de texto simulada abajo */}
                        <rect
                            x="138"
                            y="214"
                            width="192"
                            height="20"
                            rx="6"
                            stroke="#dddddd"
                            strokeWidth="1.5"
                            fill="#fafafa"
                        />
                        <rect x="312" y="218" width="14" height="12" rx="3" fill="#611f69" />

                        {/* Insignia flotante superior derecha */}
                        <g className="svg-badge-float">
                            <rect
                                x="292"
                                y="14"
                                width="72"
                                height="32"
                                rx="16"
                                fill="#ecb22e"
                            />
                            <text
                                x="328"
                                y="35"
                                textAnchor="middle"
                                fill="#1d1c1d"
                                fontSize="13"
                                fontWeight="800"
                                fontFamily="Plus Jakarta Sans, sans-serif"
                            >
                                #equipo 🚀
                            </text>
                        </g>
                    </svg>
                </div>
            </header>

            {/* Sección: Todo lo que se puede hacer con la app */}
            <div className="channel-welcome-features-section">
                <div className="channel-welcome-section-header">
                    <h2>Todo lo que podés hacer en la aplicación</h2>
                    <span>Explorá las herramientas de tu espacio</span>
                </div>

                <div className="channel-welcome-grid">
                    {APP_FEATURES.map((feature) => (
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

            {/* Guía rápida de primeros pasos */}
            <footer className="channel-welcome-steps" aria-label="Pasos para comenzar">
                <div className="channel-welcome-steps-title">
                    <span>¿Cómo empezar ahora?</span>
                </div>
                <ol className="channel-welcome-steps-list">
                    <li className="channel-welcome-step-item">
                        <span className="channel-welcome-step-num">1</span>
                        <span>Elegí un canal de la lista izquierda</span>
                    </li>
                    <li className="channel-welcome-step-item">
                        <span className="channel-welcome-step-num">2</span>
                        <span>O tocá &ldquo;+ Crear canal&rdquo; para uno nuevo</span>
                    </li>
                    <li className="channel-welcome-step-item">
                        <span className="channel-welcome-step-num">3</span>
                        <span>¡Enviá tu primer mensaje al equipo!</span>
                    </li>
                </ol>
            </footer>
        </section>
    );
};
