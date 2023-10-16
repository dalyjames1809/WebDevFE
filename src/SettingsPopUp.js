import React, {useState, useEffect} from 'react';
import './SettingsModal.css';
import ConfirmationDialog from './DeletePopUp';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function SettingsPopup({ handleClose }) {

  const { username, name, userID } = useUser();
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [validationError, setValidationErrors] = useState('');
  
  const [formData, setFormData] = useState({
    username: name,
    email: username,
    avatar: '',
    password: '*******',
  });

  const [editMode, setEditMode] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setEditMode(true);
    setFormData({
      ...formData,
      password: '',
    });
  };

  const handleSave = async (e) => {
    if (!formData.username) {
      setValidationErrors('Username is required');
      openModal();
      return;
    }
    if (!formData.email || !validateEmail(formData.email)) {
      setValidationErrors('Invalid or missing email');
      openModal();
      return;
    }
    if (!formData.password || !validatePassword(formData.password)) {
      setValidationErrors('Password must be at least 8 characters long');
      openModal();
      return;
    }

    console.log(userID);
    try {
      const response = await fetch(`https://notesapp343-aceae8559200.herokuapp.com/users/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username, email: formData.email, password: formData.password }),
      });

    if (response.ok) {
      const data = await response.json();
      console.log('Edit successful:', data.message);
      navigate('/');
    } else {
      const errorData = await response.json();
      console.error('Edit failed:', errorData.message);
    }
    } catch (error) {
    console.error('Error edit user:', error);
    }
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteAccount = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async (e) => {
    try {
      const response = await fetch(`https://notesapp343-aceae8559200.herokuapp.com/users/${userID}`, {
        method: 'DELETE',
      });

    if (response.ok) {
      const data = await response.json();
      console.log('Delete successful:', data.message);
      navigate('/');
    } else {
      const errorData = await response.json();
      console.error('Delete failed:', errorData.message);
    }
    } catch (error) {
    console.error('Error Delete user:', error);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setValidationErrors('');
  };

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
                  name="username"
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
                  type="text"
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
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: '300px',
            height: '150px',
            margin: 'auto',
            border: '1px solid #ccc',
            background: 'white',
            borderRadius: '5px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', // Center the content vertically
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <p>{validationError}</p>
        <button
          onClick={closeModal}
          style={{
            color: 'white',
            background: 'red',
            borderRadius: '10px',
            marginTop: '10px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </Modal>

      </div>
    );
  }

export default SettingsPopup;
