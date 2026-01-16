import React from "react";
import "./ConfirmModal.css";

function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Konfirmasi</h3>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onCancel}>
                        Batal
                    </button>
                    <button className="btn-confirm" onClick={onConfirm}>
                        Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
