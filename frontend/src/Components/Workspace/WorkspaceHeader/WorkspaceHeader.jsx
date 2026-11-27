import { SearchForm } from "../../Forms/SearchForm/SearchForm";
import { useDropdown } from "../../../hooks/useDropdown";
import { useWorkspaceNav } from "../../../hooks/useWorkspaceNav";
import { useWorkspaceHistory } from "../../../hooks/useWorkspaceHistory";
import { useWorkspaceSearch } from "../../../hooks/useWorkspaceSearch";
import { WorkspaceInfoDropdown } from "../../Dropdown/WorkspaceInfoDropdown";
import { WorkspaceHistoryDropdown } from "../../Dropdown/WorkspaceHistoryDropdown";
import { WorkspaceSearchDropdown } from "../../Dropdown/WorkspaceSearchDropdown";
import "./WorkspaceHeader.css";

export const WorkspaceHeader = () => {
    const {
        currentWorkspaceObj,
        currentWorkspaceInitials,
        handleBackToWorkspaces
    } = useWorkspaceNav();

    const {
        canGoBack,
        canGoForward,
        previousItem,
        nextItem,
        recentItems,
        goBack,
        goForward,
        navigateToPath,
        clearHistory
    } = useWorkspaceHistory();

    const {
        isOpen: isWorkspaceInfoOpen,
        toggle: toggleWorkspaceInfo,
        close: closeWorkspaceInfo,
        dropdownRef: workspaceInfoRef
    } = useDropdown();

    const {
        isOpen: isHistoryOpen,
        toggle: toggleHistory,
        close: closeHistory,
        dropdownRef: historyRef
    } = useDropdown();

    const {
        isOpen: isSearchOpen,
        open: openSearch,
        close: closeSearch,
        dropdownRef: searchRef
    } = useDropdown();

    const {
        query: searchQuery,
        activeTab: searchTab,
        setActiveTab: setSearchTab,
        channels: searchedChannels,
        members: searchedMembers,
        messages: searchedMessages,
        totalCount: searchTotalCount,
        isSearchingMessages,
        searchError,
        inputRef: searchInputRef,
        handleChangeQuery,
        handleClearQuery,
        handleSelectChannel,
        handleSelectMember,
        handleSelectMessage,
        handleSubmitFirstResult,
        handleInputKeyDown
    } = useWorkspaceSearch({
        isOpen: isSearchOpen,
        openDropdown: openSearch,
        closeDropdown: closeSearch
    });

    const workspaceName = currentWorkspaceObj?.workspace_name || "el espacio de trabajo";
    const backTitle = previousItem
        ? `Atrás a ${previousItem.displayTitle} (Alt+←)`
        : "Sin historial anterior";
    const forwardTitle = nextItem
        ? `Adelante a ${nextItem.displayTitle} (Alt+→)`
        : "Sin historial siguiente";

    const handleSelectHistoryItem = (path) => {
        navigateToPath(path);
        closeHistory();
    };

    const handleClearHistory = () => {
        clearHistory();
        closeHistory();
    };

    return (
        <div className="workspace-header">
            <div className="workspace-header-mobile-ws" ref={workspaceInfoRef}>
                <button
                    type="button"
                    className="workspace-header-ws-avatar-btn"
                    title={currentWorkspaceObj?.workspace_name || "Espacio de trabajo"}
                    aria-label="Información del espacio de trabajo"
                    aria-expanded={isWorkspaceInfoOpen}
                    onClick={toggleWorkspaceInfo}
                >
                    {currentWorkspaceInitials}
                </button>

                <WorkspaceInfoDropdown
                    isOpen={isWorkspaceInfoOpen}
                    position="bottom-left"
                    workspaceObj={currentWorkspaceObj}
                    workspaceInitials={currentWorkspaceInitials}
                    onBackToWorkspaces={() => handleBackToWorkspaces(closeWorkspaceInfo)}
                />
            </div>

            <div className="workspace-header-search-group">
                <button
                    type="button"
                    className="workspace-header-btn"
                    aria-label={backTitle}
                    title={backTitle}
                    disabled={!canGoBack}
                    onClick={goBack}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                </button>
                <button
                    type="button"
                    className="workspace-header-btn"
                    aria-label={forwardTitle}
                    title={forwardTitle}
                    disabled={!canGoForward}
                    onClick={goForward}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </button>
                <div className="workspace-header-history" ref={historyRef}>
                    <button
                        type="button"
                        className={`workspace-header-btn ${
                            isHistoryOpen ? "is-active" : ""
                        }`.trim()}
                        aria-label="Historial reciente"
                        aria-expanded={isHistoryOpen}
                        aria-haspopup="menu"
                        title="Historial reciente"
                        onClick={toggleHistory}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="12" cy="12" r="9" />
                            <polyline points="12 7 12 12 15.5 12" />
                        </svg>
                    </button>

                    <WorkspaceHistoryDropdown
                        isOpen={isHistoryOpen}
                        recentItems={recentItems}
                        onSelectItem={handleSelectHistoryItem}
                        onClearHistory={handleClearHistory}
                    />
                </div>
                <div className="workspace-header-search-wrapper" ref={searchRef}>
                    <SearchForm
                        placeholder={`Buscar en ${workspaceName}`}
                        value={searchQuery}
                        onChange={handleChangeQuery}
                        onFocus={openSearch}
                        onKeyDown={handleInputKeyDown}
                        onSubmit={handleSubmitFirstResult}
                        onClear={handleClearQuery}
                        inputRef={searchInputRef}
                    />
                    <WorkspaceSearchDropdown
                        isOpen={isSearchOpen}
                        workspaceName={workspaceName}
                        query={searchQuery}
                        activeTab={searchTab}
                        onChangeTab={setSearchTab}
                        channels={searchedChannels}
                        members={searchedMembers}
                        messages={searchedMessages}
                        totalCount={searchTotalCount}
                        isSearchingMessages={isSearchingMessages}
                        searchError={searchError}
                        onSelectChannel={handleSelectChannel}
                        onSelectMember={handleSelectMember}
                        onSelectMessage={handleSelectMessage}
                    />
                </div>
                <button
                    type="button"
                    className="workspace-header-btn workspace-header-slack-btn"
                    aria-label="Slack grupo"
                    title="Slack grupo"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 122.8 122.8"
                        aria-hidden="true"
                    >
                        <path
                            d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
                            fill="#e01e5a"
                        />
                        <path
                            d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
                            fill="#36c5f0"
                        />
                        <path
                            d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
                            fill="#2eb67d"
                        />
                        <path
                            d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
                            fill="#ecb22e"
                        />
                    </svg>
                </button>
            </div>
            <div className="workspace-header-actions">
                <button
                    type="button"
                    className="workspace-header-btn workspace-header-help-btn"
                    aria-label="Ayuda"
                    title="Ayuda"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                </button>
          
            </div>
        </div>
    );
};
