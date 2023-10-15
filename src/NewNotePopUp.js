import React, { useState } from 'react';
import './ConfirmationDialog.css';
import './SettingsModal.css';

function NewNoteDialog({ handleClose, handleConfirm }) {
  // Define a state variable to store the title input value
  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => {
    // Update the title state when the input value changes
    setTitle(e.target.value);
  };

  const handleCreateNote = () => {
    // Pass the title to the handleConfirm function
    handleConfirm(title);
  };

  return (
    <div className="confirmation-dialog">
      <h1 className="settings-heading">Add Note:</h1>
      <div className="info-block">
        <div className="label-column">
          <label>Enter a title for the new note:</label>
        </div>
        <div className="input-column">
          <input
            type="text"
            name="title"
            placeholder="Enter note title here..."
            style={{ color: 'black' }}
            value={title}
            onChange={handleTitleChange} // Add onChange event handler
          />
        </div>
      </div>

      <label>Select the category for the new note:</label>
      <select className="bg-white border border-gray-300 p-2 input-box w-full">
        <option disabled value="">Select a category...</option>
        <option value="category1">To-Do List</option>
        <option value="category2">Class Note</option>
        <option value="category3">Work Note</option>
        <option value="category4">Summary</option>
        <option value="category5">Other</option>
      </select>

      <button className="confirm-button" onClick={handleCreateNote}>Create Note</button>
      <button className="cancel-button" onClick={handleClose}>Cancel</button>
    </div>
  );
}

export default NewNoteDialog;
