import {
    DropdownMenu,
    DropdownItem,
    DropdownDivider
} from "./DropdownMenu";
import "./WorkspaceHistoryDropdown.css";

function HistoryEntryIcon({ type }) {
    if (type === "channel") {
        return (
            <span
                className="workspace-history-item-icon workspace-history-item-icon--channel"
                aria-hidden="true"
            >
                #
            </span>
        );
    }

    if (type === "dm") {
        return (
            <span
                className="workspace-history-item-icon workspace-history-item-icon--dm"
                aria-hidden="true"
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            </span>
        );
    }

    if (type === "dm-home") {
        return (
            <span
                className="workspace-history-item-icon workspace-history-item-icon--general"
                aria-hidden="true"
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            </span>
        );
    }

    return (
        <span
            className="workspace-history-item-icon workspace-history-item-icon--general"
            aria-hidden="true"
        >
            <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="4" y1="9" x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
                <line x1="10" y1="3" x2="8" y2="21" />
                <line x1="16" y1="3" x2="14" y2="21" />
            </svg>
        </span>
    );
}

export function WorkspaceHistoryDropdown({
    isOpen,
    recentItems = [],
    onSelectItem,
    onClearHistory
}) {
    return (
        <DropdownMenu
            isOpen={isOpen}
            position="bottom-left"
            className="workspace-history-dropdown"
        >
            <div className="workspace-history-dropdown-header">
                <span className="workspace-history-dropdown-title">
                    Historial reciente
                </span>
                <span className="workspace-history-dropdown-subtitle">
                    Navegación en este espacio
                </span>
            </div>

            <DropdownDivider />

            {recentItems.length === 0 ? (
                <p className="workspace-history-dropdown-empty">
                    Aún no hay ubicaciones recientes registradas.
                </p>
            ) : (
                <div className="workspace-history-dropdown-list">
                    {recentItems.map((item) => (
                        <button
                            key={item.path}
                            type="button"
                            role="menuitem"
                            className={`workspace-history-item ${
                                item.isCurrent ? "is-current" : ""
                            }`.trim()}
                            onClick={() => onSelectItem(item.path)}
                        >
                            <HistoryEntryIcon type={item.type} />
                            <span className="workspace-history-item-content">
                                <span className="workspace-history-item-label">
                                    {item.label}
                                </span>
                                <span className="workspace-history-item-meta">
                                    {item.subtitle}
                                </span>
                            </span>
                            {item.isCurrent && (
                                <span className="workspace-history-item-badge">
                                    Actual
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {recentItems.length > 1 && (
                <>
                    <DropdownDivider />
                    <DropdownItem variant="danger" onClick={onClearHistory}>
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                        </svg>
                        <span>Limpiar historial reciente</span>
                    </DropdownItem>
                </>
            )}
        </DropdownMenu>
    );
}

export default WorkspaceHistoryDropdown;
