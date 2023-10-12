import React from 'react';
import './ConfirmationDialog.css';

function ConfirmationDialog({ handleClose, handleConfirm }) {
  return (
    <div className="confirmation-dialog">
      <h2>Are you sure you want to sign out?</h2>
      <button className="confirm-button" onClick={handleConfirm}>Yes</button>
      <button className="cancel-button" onClick={handleClose}>No</button>
    </div>
  );
}

export default ConfirmationDialog;