import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './ConfirmationDialog.css';
import Home from './Home';

function Direct() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/loginPage" element={<Home />} />
      </Routes>
    </Router>
  );
}

function ConfirmationDialog({ handleClose, handleConfirm }) {
  const navigate = useNavigate();
  const navigateToLoginPage = () => {
    navigate('/loginPage');
  };
  return (
    <div className="confirmation-dialog">
      <h2>Are you sure you want to sign out?</h2>
      <button className="confirm-button" onClick={navigateToLoginPage}>Yes</button>
      <button className="cancel-button" onClick={handleClose}>No</button>
    </div>
  );
}

export default ConfirmationDialog;