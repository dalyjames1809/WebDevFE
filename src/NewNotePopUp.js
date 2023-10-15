import React from 'react';
import './ConfirmationDialog.css';
import './SettingsModal.css';

function NewNoteDialog({ handleClose, handleConfirm }) {
  const noteName = e.target.title.value;
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
                    placeholder='Enter note title here...'
                    style={{ color: 'black' }}
                />
            </div>
        </div>

      <label>Select the category for the new note:</label>
      <select className="bg-white border border-gray-300 p-2 input-box w-full">
            <option disabled selected value="">Select a catogory...</option>
            <option value="category1">To-Do List</option>
            <option value="category2">Class Note</option>
            <option value="category3">Work Note</option>
            <option value="category4">Summary</option>
            <option value="category4">Other</option>
      </select>
      <button className="confirm-button" onClick={() => handleConfirm(noteName)}>Create Note</button>
      <button className="cancel-button" onClick={handleClose}>Cancel</button>
    </div>
  );
}

export default NewNoteDialog;