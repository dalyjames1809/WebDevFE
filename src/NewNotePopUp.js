import React, { useState } from 'react';
import Modal from 'react-modal';
import './ConfirmationDialog.css';
import './SettingsModal.css';

Modal.setAppElement('#root');

function NewNoteDialog({ handleClose, handleConfirm }) {
  const { username , userToken } = useUser();
  const [title, setTitle] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [validationError, setValidationError] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setValidationError('');
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCreateNote = async() => {
    if (!title) {
      setValidationError('Please enter a note title');
      openModal();
      return;
    }
    handleConfirm(title);
    try {
      const token = userToken;
 
       // Define the data to be sent in the POST request
       const noteData = {
         title: notename,
         content: noteContent,
       };
       
       const auth = 'Bearer ' + token;
       // Send the POST request
       const response = await fetch('https://notesapp343-aceae8559200.herokuapp.com/notes', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': auth,
         },
         body: JSON.stringify(noteData),
       });
       console.log(JSON.stringify(noteData));
       if (response.ok) {
         const data = await response.json();
         console.log('Note saved:', data.message);
         // You may want to handle the response data or do other actions here
       } else {
         const errorData = await response.json();
         console.error('Note saving failed:', errorData.message);
         // Handle the error as needed
       }
     } catch (error) {
       console.error('Error saving note:', error);
       // Handle the error as needed
     }
  };

  return (
    <div className="confirmation-dialog">
      <h1 className="settings-heading" style={{ marginBottom: '20px' }}>Add Note:</h1>
      <div className="info-block">
        <div className="label-column">
          <label>Enter a title for the new note:</label>
        </div>
        <div className="input-column">
          <input
            type="text"
            name="title"
            placeholder="Enter note title here..."
            style={{ color: 'black', fontSize: '16px' }}
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <label>Select the category for the new note:</label>
        <select className="bg-white border border-gray-300 input-box w-full" style={{ fontSize: '16px' }}>
          <option disabled value="">Select a category...</option>
          <option value="category1">To-Do List</option>
          <option value="category2">Class Note</option>
          <option value="category3">Work Note</option>
          <option value="category4">Summary</option>
          <option value="category5">Other</option>
        </select>
      </div>
      <div className="button-container" style={{ marginTop: '20px' }}>
        <button className="confirm-button" onClick={handleCreateNote}>Create Note</button>
        <button className="cancel-button" onClick={handleClose}>Cancel</button>
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
            justifyContent: 'center',
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

export default NewNoteDialog;
