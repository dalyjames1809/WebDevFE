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
          <h2 className="sendreq-heading">Join with Friend:</h2>
          <div className="input-column">
            <label htmlFor="friend-username">Friend's Username:</label>
            <input
              type="text"
              id="friend-username"
              placeholder="Enter friend username..."
              name="FriendUsername"
              value={friendUsername}
              onChange={(e) => setFriendUsername(e.target.value)}
              style={{
                color: 'black',
                fontSize: '1.5em',
                width: '100%', // Equal width for both input fields
              }}
            />
            <label htmlFor="category-select">Select a Note to Share:</label>
            <select
              id="category-select"
              className="bg-white border border-gray-300 input-box w-full"
              style={{
                fontSize: '23px',
                width: '100%', // Equal width for both input fields
              }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option disabled value="">
                Select a note to share...
              </option>
              {notes.map((note) => (
                <option key={note.note_id} value={note.note_id}>
                  {note.title}
                </option>
              ))}
            </select>
            <div style={{ marginTop: '30px' }}>
              <button onClick={handleSendRequest} className="send-request-button">
                Send Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFriendPopUp;
