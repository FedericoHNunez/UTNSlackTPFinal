import React from "react";
import "./SpinnerLoading.css";
import { SlackLogo } from "../SlackLogo";

export const SpinnerLoading = ({ text = "Cargando...", fullScreen = false }) => {
    return (
        <div
            className={`spinner-wrapper ${fullScreen ? "spinner-fullscreen" : ""}`}
            role="status"
            aria-live="polite"
        >
            <div>
                <SlackLogo color="black" />
            </div>
            <div className="spinner-ring-container">
                <div className="spinner-ring" />
                <div className="spinner-dots">
                    <span className="spinner-dot spinner-dot-blue" />
                    <span className="spinner-dot spinner-dot-green" />
                    <span className="spinner-dot spinner-dot-yellow" />
                    <span className="spinner-dot spinner-dot-red" />
                </div>
            </div>
            {text && <p className="spinner-text">{text}</p>}
        </div>
    );
};

export default SpinnerLoading;

