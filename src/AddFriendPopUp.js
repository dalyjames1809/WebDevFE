import React, {useState, useEffect} from 'react';
import './SettingsModal.css';

function AddFriendPopUp({ handleConfirm, handleClose }) {
    const [friendUsername, setFriendUsername] = useState('');
  
    return (
        <div className="modal-overlay">
        <div className="modal-content">
            <h1 className="AddFriend-heading">Add a Friend</h1>
            <button className="close-button" onClick={handleClose}>Close</button>
            <div className="info-block">
            <div className="label-column">
                <label style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Username of Friend:</label>
            </div>
            <div className="input-column">
                <input
                    type="text"
                    placeholder="Friend's Username"
                    name="FriendUsername"
                    value={friendUsername}
                    onChange={(e) => setFriendUsername(e.target.value)}
                    style={{ color: 'black' }}
                />
                <button onClick={handleConfirm}>Send Request</button>
            </div>
            </div>
        </div>
        </div>
    );
    }

export default AddFriendPopUp;