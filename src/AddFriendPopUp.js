import React, { useState } from 'react';
import './SettingsModal.css';

function AddFriendPopUp({ notes, handleConfirm, handleClose }) {
  const [friendUsername, setFriendUsername] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSendRequest = () => {
    // Access the name of the selected note using the selectedCategory state
    const selectedNote = notes.find((note) => note.note_id === selectedCategory);
    if (selectedNote) {
      const selectedNoteName = selectedNote.title;
      // Now, you can use the selectedNoteName as needed
      console.log('Selected note name:', selectedNoteName);
    }

    // Rest of your code for sending the friend request
    // ...

    // Close the popup
    handleConfirm();
  };



  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
        <div className="info-block">
        <select 
          id="category-select"
          className="bg-white border border-gray-300 input-box w-full"
          style={{ fontSize: '16px' }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
            <option disabled value="">Select a note to share...</option>
            {notes.map((note) => (
                <option key={note.note_id} value={note.note_id}>
                  {note.title}
                </option>
              ))}
        </select>
          <div className="label-column">
            <label style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
              Join with Friend:
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
            <button
              onClick={handleSendRequest}
              className="send-request-button"
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFriendPopUp;
