import "./WorkspaceHeader.css";

export const WorkspaceHeader = () => {
    return (
        <div className="workspace-header">
            <div className="workspace-header-search-group">
                <button type="button" className="workspace-header-btn">
                    <img alt="Atrás" />
                </button>
                <button type="button" className="workspace-header-btn">
                    <img alt="Adelante" />
                </button>
                <button type="button" className="workspace-header-btn">
                    <img alt="Historial" />
                </button>
                <form role="search" className="workspace-header-search-form">
                    <input
                        type="search"
                        aria-label="Buscar"
                        placeholder="Describe lo que estás buscando"
                        className="workspace-header-search-input"
                    />
                    <button type="submit" className="workspace-header-btn">
                        <img alt="Buscar" />
                    </button>
                </form>
                <button type="button" className="workspace-header-btn">
                    <img alt="Slack grupo" />
                </button>
            </div>
            <div className="workspace-header-actions">
                <button type="button" className="workspace-header-btn">
                    <img alt="Ayuda" />
                </button>
            </div>
        </div>
    );
};
