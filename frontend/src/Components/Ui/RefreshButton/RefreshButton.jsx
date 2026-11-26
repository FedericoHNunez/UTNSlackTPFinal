import { useState } from "react";
import "./RefreshButton.css";

export const RefreshButton = ({
    onRefresh,
    variant = "light",
    label = "",
    title = "Actualizar",
    ariaLabel = "Actualizar contenido",
    className = ""
}) => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleClick = async (e) => {
        e.stopPropagation();
        if (isRefreshing || typeof onRefresh !== "function") return;

        setIsRefreshing(true);
        try {
            await Promise.all([
                Promise.resolve(onRefresh()),
                new Promise((resolve) => setTimeout(resolve, 450))
            ]);
        } finally {
            setIsRefreshing(false);
        }
    };

    return (
        <button
            type="button"
            className={`refresh-btn refresh-btn--${variant} ${
                label ? "refresh-btn--with-label" : ""
            } ${isRefreshing ? "is-refreshing" : ""} ${className}`.trim()}
            onClick={handleClick}
            disabled={isRefreshing}
            title={isRefreshing ? "Actualizando..." : title}
            aria-label={isRefreshing ? "Actualizando..." : ariaLabel}
        >
            <svg
                className="refresh-btn-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                <polyline points="21 3 21 9 15 9" />
            </svg>
            {label && (
                <span className="refresh-btn-label">
                    {isRefreshing ? "Actualizando..." : label}
                </span>
            )}
        </button>
    );
};

export default RefreshButton;
