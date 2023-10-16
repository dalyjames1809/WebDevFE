import React, {useState, useEffect} from 'react';
import './SettingsModal.css';
import ConfirmationDialog from './DeletePopUp';
import { useUser } from './UserContext';

function SettingsPopup({ handleClose }) {

  const { username } = useUser();

  const [formData, setFormData] = useState({
    username: '',
    email: username,
    password: '',
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
  };

  const handleConfirmDelete = () => {
    // Add code here to handle account deletion
    // ...
    setShowConfirmation(false); // Close the confirmation dialog after deletion
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  // useEffect to fetch user data when the component is mounted
  useEffect(() => {
    // Replace 'userId' with the actual user ID you want to fetch
    fetch(`/users/bob`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // You may need to include a token for authentication here
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData(data.user); // Update formData with the user data
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h1 className="settings-heading">Settings</h1>
          <button className="close-button" onClick={handleClose}>Close</button>
  
          <div className="info-block">
            <div className="label-column">
              <label style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Username:</label>
            </div>
            <div className="input-column">
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.username}
                  onChange={handleInputChange}
                  style={{ color: 'black' }}
                />
              ) : (
                <span>{formData.username}</span>
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
                  type="text"
                  name="surname"
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
                  type="email"
                  name="email"
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
                  type="text"
                  name="avatar"
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
