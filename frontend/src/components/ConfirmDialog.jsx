import { useEffect } from 'react';
import { IconTrash, IconX } from './Icons';

export function ConfirmDialog({ studentName, onConfirm, onCancel, loading }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onCancel]);

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="modal" role="alertdialog" aria-modal="true" style={{ maxWidth: 380 }}>
        <h2>
          🗑️ Delete Student
          <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={onCancel} aria-label="Close"><IconX /></button>
        </h2>
        <p className="confirm-text">
          Are you sure you want to remove <strong>{studentName}</strong>?<br />
          This action cannot be undone.
        </p>
        <div className="modal-footer">
          <button id="confirm-cancel-btn" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button id="confirm-delete-btn" className="btn btn-danger" onClick={onConfirm} disabled={loading}>
            <IconTrash />
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
