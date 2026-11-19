import React from "react";
import "./Footer.css";

export const Footer = () => {
    return (
        <footer className="slack-footer">
            <nav className="slack-footer-nav" aria-label="Pie de página">
                <a
                    href="https://slack.com/downloads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="slack-footer-link slack-footer-download"
                >
                    <span>Descargar Slack</span>
                    <svg
                        className="slack-footer-cloud-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M6.5 19H18C20.2091 19 22 17.2091 22 15C22 12.9369 20.4377 11.2389 18.4312 11.0225C17.9597 7.62272 15.0372 5 11.5 5C7.63401 5 4.5 8.13401 4.5 12C4.5 12.1925 4.50777 12.3832 4.52298 12.5716C2.81242 13.1904 1.5 14.7161 1.5 16.5C1.5 17.8807 2.61929 19 4 19H6.5Z"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 10V16M12 16L9.5 13.5M12 16L14.5 13.5"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </a>

                <a
                    href="#privacidad"
                    onClick={(e) => e.preventDefault()}
                    className="slack-footer-link"
                >
                    Privacidad
                </a>

                <a
                    href="#terminos"
                    onClick={(e) => e.preventDefault()}
                    className="slack-footer-link"
                >
                    Términos
                </a>

                <a
                    href="#cookies"
                    onClick={(e) => e.preventDefault()}
                    className="slack-footer-link"
                >
                    Preferencias de cookies
                </a>

                <a
                    href="#opciones-privacidad"
                    onClick={(e) => e.preventDefault()}
                    className="slack-footer-link slack-footer-privacy-choices"
                >
                    <span>Sus opciones de privacidad</span>
                    <svg
                        className="slack-footer-privacy-icon"
                        width="28"
                        height="14"
                        viewBox="0 0 30 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <rect
                            x="0.75"
                            y="0.75"
                            width="28.5"
                            height="12.5"
                            rx="6.25"
                            fill="#0066FF"
                            stroke="#0066FF"
                            strokeWidth="1.5"
                        />
                        <path
                            d="M7 1.5H16.2L13.2 12.5H7C3.96243 12.5 1.5 10.0376 1.5 7C1.5 3.96243 3.96243 1.5 7 1.5Z"
                            fill="#FFFFFF"
                        />
                        <path
                            d="M5.5 7.2L7.8 9.5L12.2 4.8"
                            stroke="#0066FF"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19 4.8L23.4 9.2M23.4 4.8L19 9.2"
                            stroke="#FFFFFF"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                        />
                    </svg>
                </a>
            </nav>
        </footer>
    );
};

export default Footer;

