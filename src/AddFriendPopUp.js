import React, { useState } from 'react';
import './SettingsModal.css';

function AddFriendPopUp({ handleConfirm, handleClose }) {
  const [friendUsername, setFriendUsername] = useState('');

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
        <h2 className="settings-heading">Join a Friend:</h2>
        <div className="info-block">
          <div className="label-column">
            <label style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
              {/* Leave this part as it is */}
            </label>
          </div>
          <div className="input-column">
            <input
              type="text"
              placeholder="Enter friend username..."
              name="FriendUsername"
              value={friendUsername}
              onChange={(e) => setFriendUsername(e.target.value)}
              style={{
                color: 'black',
                fontSize: '1.5em', // Adjust the font size as needed
              }}
            />
          </div>
        </div>
        <button
          onClick={handleConfirm}
          className="send-request-button"
        >
          Send Request
        </button>
      </div>
    </div>
  );
}

export default AddFriendPopUp;

