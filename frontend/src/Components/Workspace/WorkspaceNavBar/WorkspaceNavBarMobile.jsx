import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import "./WorkspaceNavBarMobile.css";
import { useDropdown } from "../../../hooks/useDropdown";
import { useWorkspaceNav } from "../../../hooks/useWorkspaceNav";
import {
    DropdownMenu,
    DropdownItem,
    DropdownDivider
} from "../../Dropdown/DropdownMenu";
import { UserProfileDropdown } from "../../Dropdown/UserProfileDropdown";
import { DeactivateAccountModal } from "../../modal/DeactivateAccountModal";

const BAR_HEIGHT = 66;
const PAD_X = 8;
const ITEM_COUNT = 5;

function buildNotchedBarPath(width, height, cx) {
    const w = Math.max(width, 240);
    const h = height;
    const r = 20;
    const slotW = (w - PAD_X * 2) / ITEM_COUNT;

    const scale = Math.min(1, Math.max(0.72, slotW / 64));
    const hw = 46 * scale;
    const c1 = 27 * scale;
    const c2 = 33 * scale;
    const dipY = 34 * scale;

    const xL = cx - hw;
    const xR = cx + hw;

    // Transición continua cuando la muesca se acerca al borde izquierdo (ítem 1)
    const leftBlend = Math.min(1, Math.max(0, (r - xL) / (r + 12)));
    const leftCrestX = r * (1 - leftBlend) + Math.max(5, cx - 34 * scale) * leftBlend;
    const leftCrestY = 5.5 * leftBlend;
    const leftWallTopY = r * (1 - leftBlend) + (leftCrestY + 11) * leftBlend;
    const leftShoulderX = Math.max(leftCrestX, xL);
    const leftCtrl1X = Math.max(leftCrestX + 2, cx - c1);

    // Transición continua cuando la muesca se acerca al borde derecho (ítem 5)
    const rightDist = w - r - xR;
    const rightBlend = Math.min(1, Math.max(0, -rightDist / (r + 12)));
    const rightCrestX =
        (w - r) * (1 - rightBlend) + Math.min(w - 5, cx + 34 * scale) * rightBlend;
    const rightCrestY = 5.5 * rightBlend;
    const rightWallTopY = r * (1 - rightBlend) + (rightCrestY + 11) * rightBlend;
    const rightShoulderX = Math.min(rightCrestX, xR);
    const rightCtrl2X = Math.min(rightCrestX - 2, cx + c1);

    return [
        `M 0 ${leftWallTopY.toFixed(2)}`,
        `Q 0 ${leftCrestY.toFixed(2)} ${leftCrestX.toFixed(2)} ${leftCrestY.toFixed(2)}`,
        `L ${leftShoulderX.toFixed(2)} ${leftCrestY.toFixed(2)}`,
        `C ${leftCtrl1X.toFixed(2)} ${leftCrestY.toFixed(2)}, ${(cx - c2).toFixed(2)} ${dipY.toFixed(2)}, ${cx.toFixed(2)} ${dipY.toFixed(2)}`,
        `C ${(cx + c2).toFixed(2)} ${dipY.toFixed(2)}, ${rightCtrl2X.toFixed(2)} ${rightCrestY.toFixed(2)}, ${rightShoulderX.toFixed(2)} ${rightCrestY.toFixed(2)}`,
        `L ${rightCrestX.toFixed(2)} ${rightCrestY.toFixed(2)}`,
        `Q ${w.toFixed(2)} ${rightCrestY.toFixed(2)} ${w.toFixed(2)} ${rightWallTopY.toFixed(2)}`,
        `L ${w.toFixed(2)} ${(h - r).toFixed(2)}`,
        `Q ${w.toFixed(2)} ${h.toFixed(2)} ${(w - r).toFixed(2)} ${h.toFixed(2)}`,
        `L ${r.toFixed(2)} ${h.toFixed(2)}`,
        `Q 0 ${h.toFixed(2)} 0 ${(h - r).toFixed(2)}`,
        "Z"
    ].join(" ");
}

function renderTabIcon(id, isActive, userInitial) {
    switch (id) {
        case "channels":
            return isActive ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M10.75 2.85a2 2 0 0 1 2.5 0l7 5.6a2 2 0 0 1 .72 1.93l-1.45 8.2A2 2 0 0 1 17.55 20.2H6.45a2 2 0 0 1-1.97-1.62l-1.45-8.2a2 2 0 0 1 .72-1.93l7-5.6Z"
                        fill="url(#mobileNavActiveGrad)"
                    />
                    <path
                        d="M9.4 15.1c1.45 1.15 3.75 1.15 5.2 0"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M10.75 2.85a2 2 0 0 1 2.5 0l7 5.6a2 2 0 0 1 .72 1.93l-1.45 8.2A2 2 0 0 1 17.55 20.2H6.45a2 2 0 0 1-1.97-1.62l-1.45-8.2a2 2 0 0 1 .72-1.93l7-5.6Z"
                        stroke="currentColor"
                        strokeWidth="1.85"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9.5 15.2c1.4 1.05 3.6 1.05 5 0"
                        stroke="currentColor"
                        strokeWidth="1.85"
                        strokeLinecap="round"
                    />
                </svg>
            );

        case "messages":
            return isActive ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M20.64 4.56a1.35 1.35 0 0 0-1.42-.3L3.96 9.88a1.35 1.35 0 0 0-.1 2.5l6.15 2.68 2.68 6.15a1.35 1.35 0 0 0 2.5-.1l5.62-15.26a1.35 1.35 0 0 0-.17-1.29Z"
                        fill="url(#mobileNavActiveGrad)"
                    />
                    <path
                        d="M10.1 15.05 15.8 9.35"
                        stroke="#ffffff"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                    />
                </svg>
            ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M20.5 4.6a1.25 1.25 0 0 0-1.3-.27L4.2 9.85a1.25 1.25 0 0 0-.09 2.31l6.04 2.62 2.62 6.04a1.25 1.25 0 0 0 2.31-.09l5.52-15a1.25 1.25 0 0 0-.1-1.13Z"
                        stroke="currentColor"
                        strokeWidth="1.85"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M10.15 14.78 15.5 9.45"
                        stroke="currentColor"
                        strokeWidth="1.85"
                        strokeLinecap="round"
                    />
                </svg>
            );

        case "activity":
            return isActive ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M12 3a6 6 0 0 0-6 6c0 4.5-1.8 6.5-2.55 7.4a1 1 0 0 0 .77 1.64h15.56a1 1 0 0 0 .77-1.64C19.8 15.5 18 13.5 18 9a6 6 0 0 0-6-6Z"
                        fill="url(#mobileNavActiveGrad)"
                    />
                    <path
                        d="M9.8 19.6a2.5 2.5 0 0 0 4.4 0"
                        stroke="url(#mobileNavActiveGrad)"
                        strokeWidth="2.1"
                        strokeLinecap="round"
                    />
                    <path
                        d="M9.5 7.6A3.6 3.6 0 0 1 12 6.5"
                        stroke="#ffffff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                </svg>
            ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M18 9A6 6 0 0 0 6 9c0 5-2.4 7-2.4 7h16.8S18 14 18 9Z"
                        stroke="currentColor"
                        strokeWidth="1.85"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M13.73 20a2 2 0 0 1-3.46 0"
                        stroke="currentColor"
                        strokeWidth="1.85"
                        strokeLinecap="round"
                    />
                </svg>
            );

        case "more":
            return isActive ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9.5" fill="url(#mobileNavActiveGrad)" />
                    <circle cx="7.8" cy="12" r="1.45" fill="#ffffff" />
                    <circle cx="12" cy="12" r="1.45" fill="#ffffff" />
                    <circle cx="16.2" cy="12" r="1.45" fill="#ffffff" />
                </svg>
            ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    />
                    <circle cx="8" cy="12" r="1.35" fill="currentColor" />
                    <circle cx="12" cy="12" r="1.35" fill="currentColor" />
                    <circle cx="16" cy="12" r="1.35" fill="currentColor" />
                </svg>
            );

        case "profile":
            return (
                <span
                    className={`workspace-nav-mobile-profile-avatar ${
                        isActive ? "is-active" : ""
                    }`}
                    aria-hidden="true"
                >
                    <span>{userInitial}</span>
                    <span className="workspace-nav-mobile-status-dot" />
                </span>
            );

        default:
            return null;
    }
}

export function WorkspaceNavbarMobile() {
    const location = useLocation();
    const {
        currentWorkspace_id,
        userData,
        userInitial,
        isDirectMessagesActive,
        handleLogout
    } = useWorkspaceNav();

    const {
        isOpen: isMoreOpen,
        toggle: toggleMore,
        close: closeMore,
        dropdownRef: moreRef
    } = useDropdown();

    const {
        isOpen: isProfileOpen,
        toggle: toggleProfile,
        close: closeProfile,
        dropdownRef: profileRef
    } = useDropdown();

    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

    const routeIndex = isDirectMessagesActive ? 1 : 0;
    const [customTabIndex, setCustomTabIndex] = useState(null);

    // Sincroniza pestaña activa cuando cambia la ruta (Canales <-> Mensajes)
    useEffect(() => {
        setCustomTabIndex(null);
    }, [location.pathname]);

    const activeIndex = isProfileOpen
        ? 4
        : isMoreOpen
          ? 3
          : customTabIndex !== null
            ? customTabIndex
            : routeIndex;

    const barRef = useRef(null);
    const [barWidth, setBarWidth] = useState(360);
    const [animatedIndex, setAnimatedIndex] = useState(activeIndex);
    const animValueRef = useRef(activeIndex);

    useLayoutEffect(() => {
        const el = barRef.current;
        if (!el) return;

        const updateWidth = () => {
            const nextWidth = el.getBoundingClientRect().width;
            if (nextWidth > 0) {
                setBarWidth(nextWidth);
            }
        };

        updateWidth();

        if (typeof ResizeObserver !== "undefined") {
            const observer = new ResizeObserver(updateWidth);
            observer.observe(el);
            return () => observer.disconnect();
        }

        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        const prefersReduced =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced) {
            animValueRef.current = activeIndex;
            setAnimatedIndex(activeIndex);
            return;
        }

        const startVal = animValueRef.current;
        const targetVal = activeIndex;
        if (Math.abs(targetVal - startVal) < 0.001) {
            animValueRef.current = targetVal;
            setAnimatedIndex(targetVal);
            return;
        }

        const duration = 290;
        const startTime = performance.now();
        let rafId = null;

        const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = startVal + (targetVal - startVal) * eased;

            animValueRef.current = current;
            setAnimatedIndex(current);

            if (progress < 1) {
                rafId = requestAnimationFrame(tick);
            }
        };

        rafId = requestAnimationFrame(tick);
        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [activeIndex]);

    const slotWidth = (barWidth - PAD_X * 2) / ITEM_COUNT;
    const indicatorCx = PAD_X + (animatedIndex + 0.5) * slotWidth;
    const bubbleScale = Math.min(1, Math.max(0.74, slotWidth / 64));
    const bubbleSize = 50 * bubbleScale;
    const barPath = buildNotchedBarPath(barWidth, BAR_HEIGHT, indicatorCx);

    const channelsHref = currentWorkspace_id
        ? `/workspaces/${currentWorkspace_id}/channels`
        : "/workspaces";

    const messagesHref = currentWorkspace_id
        ? `/workspaces/${currentWorkspace_id}/MessagesPrivate`
        : "/workspaces";

    const onSelectRouteTab = (idx) => {
        setCustomTabIndex(idx);
        closeMore();
        closeProfile();
    };

    const onSelectActivityTab = () => {
        setCustomTabIndex(2);
        closeMore();
        closeProfile();
    };

    const onToggleMoreTab = () => {
        closeProfile();
        toggleMore();
    };

    const onToggleProfileTab = () => {
        closeMore();
        toggleProfile();
    };

    const onLogoutClick = () => {
        handleLogout(() => {
            closeProfile();
            closeMore();
        });
    };

    const onOpenDeactivateModal = () => {
        closeProfile();
        setIsDeactivateModalOpen(true);
    };

    const navItems = [
        {
            id: "channels",
            label: "Canales",
            type: "link",
            to: channelsHref,
            onClick: () => onSelectRouteTab(0)
        },
        {
            id: "messages",
            label: "Mensajes",
            ariaLabel: "Mensajes directos",
            type: "link",
            to: messagesHref,
            onClick: () => onSelectRouteTab(1)
        },
        {
            id: "activity",
            label: "Actividad",
            type: "button",
            onClick: onSelectActivityTab
        },
        {
            id: "more",
            label: "Más",
            ariaLabel: "Más herramientas y opciones",
            type: "more",
            onClick: onToggleMoreTab
        },
        {
            id: "profile",
            label: "Perfil",
            ariaLabel: userData?.userName ? `Perfil de ${userData.userName}` : "Perfil",
            type: "profile",
            onClick: onToggleProfileTab
        }
    ];

    return (
        <>
            <div className="workspace-nav-mobile">
                <svg
                    width="0"
                    height="0"
                    className="workspace-nav-mobile-svg-defs"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient
                            id="mobileNavActiveGrad"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#581c87" />
                            <stop offset="52%" stopColor="#7c3aed" />
                            <stop offset="100%" stopColor="#c084fc" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="workspace-nav-mobile-bar" ref={barRef}>
                    <svg
                        className="workspace-nav-mobile-bg-svg"
                        width={barWidth}
                        height={BAR_HEIGHT}
                        viewBox={`0 0 ${barWidth} ${BAR_HEIGHT}`}
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient
                                id="mobileNavBarFill"
                                x1="0%"
                                y1="0%"
                                x2="0%"
                                y2="100%"
                            >
                                <stop offset="0%" stopColor="#421244" />
                                <stop offset="100%" stopColor="#2c092d" />
                            </linearGradient>
                        </defs>
                        <path
                            d={barPath}
                            fill="url(#mobileNavBarFill)"
                            stroke="rgba(233, 213, 255, 0.28)"
                            strokeWidth="1.25"
                        />
                    </svg>

                    <span
                        className="workspace-nav-mobile-bubble"
                        style={{
                            width: `${bubbleSize}px`,
                            height: `${bubbleSize}px`,
                            left: `${indicatorCx - bubbleSize / 2}px`,
                            top: `${3 * bubbleScale - bubbleSize / 2}px`
                        }}
                        aria-hidden="true"
                    />

                    <ul className="workspace-nav-mobile-list">
                        {navItems.map((item, idx) => {
                            const isActive = activeIndex === idx;
                            const iconLiftStyle = isActive
                                ? { transform: `translateY(${-19 * bubbleScale}px)` }
                                : undefined;

                            if (item.type === "link") {
                                return (
                                    <li key={item.id} className="workspace-nav-mobile-item">
                                        <Link
                                            to={item.to}
                                            aria-label={item.ariaLabel || item.label}
                                            aria-current={isActive ? "page" : undefined}
                                            className={`workspace-nav-mobile-tab ${
                                                isActive ? "is-active" : ""
                                            }`}
                                            onClick={item.onClick}
                                        >
                                            <span
                                                className="workspace-nav-mobile-icon"
                                                style={iconLiftStyle}
                                            >
                                                {renderTabIcon(item.id, isActive, userInitial)}
                                            </span>
                                            <span className="workspace-nav-mobile-label">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            }

                            if (item.type === "more") {
                                return (
                                    <li
                                        key={item.id}
                                        className="workspace-nav-mobile-item workspace-nav-mobile-item--more"
                                        ref={moreRef}
                                    >
                                        <button
                                            type="button"
                                            aria-label={item.ariaLabel}
                                            aria-expanded={isMoreOpen}
                                            className={`workspace-nav-mobile-tab ${
                                                isActive ? "is-active" : ""
                                            }`}
                                            onClick={item.onClick}
                                        >
                                            <span
                                                className="workspace-nav-mobile-icon"
                                                style={iconLiftStyle}
                                            >
                                                {renderTabIcon(item.id, isActive, userInitial)}
                                            </span>
                                            <span className="workspace-nav-mobile-label">
                                                {item.label}
                                            </span>
                                        </button>

                                        <DropdownMenu isOpen={isMoreOpen} position="top-right">
                                            <span className="workspace-nav-mobile-more-heading">
                                                Más opciones
                                            </span>

                                            <DropdownItem onClick={closeMore}>
                                                <span
                                                    className="workspace-nav-mobile-more-icon"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        width="17"
                                                        height="17"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.9"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                        <polyline points="14 2 14 8 20 8" />
                                                    </svg>
                                                </span>
                                                <span>Archivos</span>
                                            </DropdownItem>

                                            <DropdownItem onClick={closeMore}>
                                                <span
                                                    className="workspace-nav-mobile-more-icon"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        width="17"
                                                        height="17"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.9"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <circle cx="7.5" cy="7.5" r="3" />
                                                        <circle cx="7.5" cy="16.5" r="3" />
                                                        <circle cx="16.5" cy="16.5" r="3" />
                                                        <path d="M16.5 4.5v6M13.5 7.5h6" />
                                                    </svg>
                                                </span>
                                                <span>Agentes y herramientas</span>
                                            </DropdownItem>

                                            <DropdownItem onClick={closeMore}>
                                                <span
                                                    className="workspace-nav-mobile-more-icon"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        width="17"
                                                        height="17"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.9"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <circle cx="12" cy="12" r="3" />
                                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                                    </svg>
                                                </span>
                                                <span>Administrador</span>
                                            </DropdownItem>

                                            <DropdownDivider />

                                            <DropdownItem onClick={closeMore}>
                                                <span
                                                    className="workspace-nav-mobile-more-icon"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        width="17"
                                                        height="17"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.9"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                                    </svg>
                                                </span>
                                                <span>Cambiar tema</span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </li>
                                );
                            }

                            if (item.type === "profile") {
                                return (
                                    <li
                                        key={item.id}
                                        className="workspace-nav-mobile-item workspace-nav-mobile-item--profile"
                                        ref={profileRef}
                                    >
                                        <button
                                            type="button"
                                            aria-label={item.ariaLabel}
                                            aria-expanded={isProfileOpen}
                                            className={`workspace-nav-mobile-tab ${
                                                isActive ? "is-active" : ""
                                            }`}
                                            onClick={item.onClick}
                                        >
                                            <span
                                                className="workspace-nav-mobile-icon"
                                                style={iconLiftStyle}
                                            >
                                                {renderTabIcon(item.id, isActive, userInitial)}
                                            </span>
                                            <span className="workspace-nav-mobile-label">
                                                {item.label}
                                            </span>
                                        </button>

                                        <UserProfileDropdown
                                            isOpen={isProfileOpen}
                                            position="top-right"
                                            userData={userData}
                                            userInitial={userInitial}
                                            onLogout={onLogoutClick}
                                            onDeactivate={onOpenDeactivateModal}
                                        />
                                    </li>
                                );
                            }

                            return (
                                <li key={item.id} className="workspace-nav-mobile-item">
                                    <button
                                        type="button"
                                        aria-label={item.ariaLabel || item.label}
                                        aria-pressed={isActive}
                                        className={`workspace-nav-mobile-tab ${
                                            isActive ? "is-active" : ""
                                        }`}
                                        onClick={item.onClick}
                                    >
                                        <span
                                            className="workspace-nav-mobile-icon"
                                            style={iconLiftStyle}
                                        >
                                            {renderTabIcon(item.id, isActive, userInitial)}
                                        </span>
                                        <span className="workspace-nav-mobile-label">
                                            {item.label}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <DeactivateAccountModal
                isOpen={isDeactivateModalOpen}
                onClose={() => setIsDeactivateModalOpen(false)}
                userName={userData?.userName}
                onDeactivated={onLogoutClick}
            />
        </>
    );
}

export default WorkspaceNavbarMobile;
