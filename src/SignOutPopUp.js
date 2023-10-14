import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfirmationDialog.css';

function ConfirmationDialog({ handleClose, handleConfirm }) {
  const navigate = useNavigate();

  // Define a function to navigate to the login page
  const navigateToLoginPage = () => {
    navigate('/');
  };

  return (
    <div className="confirmation-dialog">
      <h2>Are you sure you want to sign out?</h2>
      <button className="confirm-button" onClick={navigateToLoginPage}>
        Yes
      </button>
      <button className="cancel-button" onClick={handleClose}>
        No
      </button>
    </div>
  );
}

export default ConfirmationDialog;
