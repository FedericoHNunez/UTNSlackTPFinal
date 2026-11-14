import { SearchForm } from "../Forms/SearchForm/SearchForm";
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
                <SearchForm
                    placeholder="Describe lo que estas buscando"
                />
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
