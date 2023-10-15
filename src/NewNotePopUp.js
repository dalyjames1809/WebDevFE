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

  const handleCreateNote = async () => {
    // Create an object to represent the note data
    const newNote = {
      title: title,
      content: 'user content', // Replace this with your actual note content
    };

    // Define the URL and the request headers
    const url = 'https://notesapp343-aceae8559200.herokuapp.com/notes';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkI…TEyfQ.P2NTBq2oQIxgSvISQHQWqD9L_Fw_Y1njIWZF_ZmJR3A'; // Replace with your actual authentication token

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    // Send the POST request
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        // Note created successfully
        console.log('Note created successfully');
        // Close the dialog or perform other actions
        handleClose();
      } else {
        // Handle the error if the request is not successful
        console.error('Failed to create the note');
        // You may want to show an error message to the user
      }
    } catch (error) {
      console.error('Error creating the note:', error);
      // Handle any network or other errors here
    }
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
