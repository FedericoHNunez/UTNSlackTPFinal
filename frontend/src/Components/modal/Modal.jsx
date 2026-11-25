import { createPortal } from "react-dom";
import "./Modal.css";

export const Modal = ({ isOpen = true, onClose, title, children }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        e.stopPropagation();
        onClose?.();
    };

    return createPortal(
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div
                className="modal-card"
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="modal-header">
                    {title && <h2>{title}</h2>}
                    <button
                        type="button"
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="Cerrar"
                    >
                        &times;
                    </button>
                </header>

                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;

