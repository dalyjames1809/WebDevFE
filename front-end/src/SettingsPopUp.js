import React, {useState} from 'react';
import './SettingsModal.css';
import ConfirmationDialog from './DeletePopUp';

function SettingsPopup({ handleClose }) {
    const [formData, setFormData] = useState({
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      avatar: 'avatar.jpg',
      password: '********',
    });
  
    const [editMode, setEditMode] = useState(false);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleEdit = () => {
      setEditMode(true);
    };
  
    const handleSave = () => {
      setEditMode(false);
      // Add code here to handle saving the edited data
    };
  
    const [showConfirmation, setShowConfirmation] = useState(false);
  
    const handleDeleteAccount = () => {
      setShowConfirmation(true);
    }
  
    const handleConfirmDelete = () => {
      // Add code here to handle account deletion
      // ...
      setShowConfirmation(false); // Close the confirmation dialog after deletion
    }
  
    const handleCloseConfirmation = () => {
      setShowConfirmation(false);
    }
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h1 className="settings-heading">Settings</h1>
          <button className="close-button" onClick={handleClose}>Close</button>
  
          <div className="info-block">
            <div className="label-column">
              <label style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Name:</label>
            </div>
            <div className="input-column">
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{ color: 'black' }}
                />
              ) : (
                <span>{formData.name}</span>
              )}
            </div>
          </div>
  
          <div className="info-block">
            <div className="label-column">
              <label style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Surname:</label>
            </div>
            <div className="input-column">
              {editMode ? (
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  style={{ color: 'black' }}
                />
              ) : (
                <span>{formData.surname}</span>
              )}
            </div>
          </div>
  
          <div className="info-block">
            <div className="label-column">
              <label style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Email:</label>
            </div>
            <div className="input-column">
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{ color: 'black' }}
                />
              ) : (
                <span>{formData.email}</span>
              )}
            </div>
          </div>
  
          <div className="info-block">
            <div className="label-column">
              <label style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Avatar:</label>
            </div>
            <div className="input-column">
              {editMode ? (
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  style={{ color: 'black' }}
                />
              ) : (
                <span>{formData.avatar}</span>
              )}
            </div>
          </div>
  
          <div className="info-block">
            <div className="label-column">
              <label style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Password:</label>
            </div>
            <div className="input-column">
              {editMode ? (
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{ color: 'black' }}
                />
              ) : (
                <span>{formData.password}</span>
              )}
            </div>
          </div>
  
          {editMode ? (
            <button className="edit-button" onClick={handleSave}>Save</button>
          ) : (
            <button className="edit-button" onClick={handleEdit}>Edit Account</button>
          )}
          <button className="delete-button"  onClick={handleDeleteAccount}>Delete Account</button>
          {showConfirmation && (
          <div className="modal-overlay">
            <div className="modal-content">
              <ConfirmationDialog
                handleClose={handleCloseConfirmation}
                handleConfirm={handleConfirmDelete}
              />
            </div>
          </div>
        )}
        </div>
      </div>
    );
  }

export default SettingsPopup;