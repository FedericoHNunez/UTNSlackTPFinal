import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { FocusModeContext } from "./FocusModeContext.jsx";

const FOCUS_STORAGE_KEY = "utn_slack_focus_mode";
const TRANSITION_FALLBACK_MS = 420;

function applyThemeAttribute(enabled) {
    const root = document.documentElement;
    if (enabled) {
        root.setAttribute("data-theme", "dark");
    } else {
        root.removeAttribute("data-theme");
    }
}

export const FocusModeProvider = ({ children }) => {
    const [isFocusMode, setIsFocusMode] = useState(() => {
        try {
            return localStorage.getItem(FOCUS_STORAGE_KEY) === "true";
        } catch {
            return false;
        }
    });

    const fallbackTimerRef = useRef(null);

    useEffect(() => {
        applyThemeAttribute(isFocusMode);

        try {
            localStorage.setItem(FOCUS_STORAGE_KEY, String(isFocusMode));
        } catch {
            // Ignorar errores de almacenamiento privado
        }
    }, [isFocusMode]);

    useEffect(() => {
        return () => {
            if (fallbackTimerRef.current) {
                clearTimeout(fallbackTimerRef.current);
            }
            const root = document.documentElement;
            root.classList.remove("theme-transitioning");
            root.removeAttribute("data-theme");
        };
    }, []);

    const toggleFocusMode = () => {
        const nextMode = !isFocusMode;
        const root = document.documentElement;
        const prefersReducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            setIsFocusMode(nextMode);
            return;
        }

        if (typeof document.startViewTransition === "function") {
            document.startViewTransition(() => {
                flushSync(() => {
                    setIsFocusMode(nextMode);
                });
                applyThemeAttribute(nextMode);
            });
            return;
        }

        root.classList.add("theme-transitioning");
        setIsFocusMode(nextMode);

        if (fallbackTimerRef.current) {
            clearTimeout(fallbackTimerRef.current);
        }
        fallbackTimerRef.current = setTimeout(() => {
            root.classList.remove("theme-transitioning");
        }, TRANSITION_FALLBACK_MS);
    };

    return (
        <FocusModeContext.Provider value={{ isFocusMode, toggleFocusMode }}>
            {children}
        </FocusModeContext.Provider>
    );
};
