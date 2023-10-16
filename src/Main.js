import React, {useState} from 'react';
import './Button.css'; // Assuming you have a CSS file named Button.css
import ColorPicker from './ColorPicker.js';
import './SettingsModal.css';
import SettingsPopup from './SettingsPopUp';
import ConfirmationDialog from './SignOutPopUp';
import NewNoteDialog from './NewNotePopUp';
import { useUser } from './UserContext';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Main() {

  const { username , userToken } = useUser();
  //console.log(userToken);
  const [notename, setNoteName] = useState("");
  // State to manage selected note and its content
  const [selectedNote, setSelectedNote] = useState(null);

  const [noteContent, setNoteContent] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [validationError, setValidationError] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setValidationError('');
  };
  
  function changeFontSize(direction) {
    var textarea = document.querySelector('.markup-textarea');
    var currentSize = window.getComputedStyle(textarea, null).getPropertyValue('font-size');
    var newSize = parseInt(currentSize);

    if (direction === 'increase') {
      newSize += 2; // Increase font size by 2 pixels
    } else if (direction === 'decrease') {
      newSize -= 2; // Decrease font size by 2 pixels
    }

    textarea.style.fontSize = newSize + 'px';
  }

  function toggleBold() {
    var textarea = document.querySelector('.markup-textarea');
    textarea.style.fontWeight = (textarea.style.fontWeight === 'bold') ? 'normal' : 'bold';
  }

  function toggleItalics() {
    var textarea = document.querySelector('.markup-textarea');
    textarea.style.fontStyle = (textarea.style.fontStyle === 'italic') ? 'normal' : 'italic';
  }

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [sortByRecent, setSortByRecent] = useState(true);

  const handleColorChange = (color) => {
    var textarea = document.querySelector('.markup-textarea');
    textarea.style.color = color;
    setShowColorPicker(false);
  }

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  }

  

  const [showNewNoteDialog, setShowNewNoteDialog] = useState(false);

  const openNewNoteDialog = () => {
    setShowNewNoteDialog(true);
  };

  const closeNewNoteDialog = () => {
    setShowNewNoteDialog(false);
  };

  const handleConfirmAddNote = (noteName) => {
    const newNote = { id: highestId + 1, text: noteName, checked: false };
    if (selectedNote) {
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id ? { ...note, checked: false } : note
      );
      setNotes(updatedNotes);
    }
    setNoteName(noteName);
    addNote(newNote);
    setSelectedNote(newNote); // Select the newly added note
    closeNewNoteDialog();
  };
  

  const [notes, setNotes] = useState([]);
  const [highestId, setHighestId] = useState(0);

  const addNote = (newNote) => {
    if (sortByRecent) {
      setNotes([newNote, ...notes]);
    } else {
      setNotes([...notes, newNote]);
    }
    setHighestId(highestId + 1);
  }

  const deleteCheckedNotes = () => {
    const updatedNotes = notes.filter(note => !note.checked);
    setNotes(updatedNotes.map((note, index) => ({ ...note, id: index })));
    setHighestId(updatedNotes.length);
  }

  const handleCheckboxChange = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, checked: !note.checked } : { ...note, checked: false }
    );
    setNotes(updatedNotes);
  
    // Find the note that corresponds to the clicked checkbox
    const clickedNote = updatedNotes.find((note) => note.id === id);
  
    // If the clicked note is selected, populate the noteContent state with its text
    if (clickedNote.checked) {
      setNoteContent(clickedNote.content);
      setNoteName(clickedNote.text);
      setSelectedNote(clickedNote);
    } else {
      // Clear the noteContent when a note is deselected
      setNoteName("")
      setNoteContent("");
    }
  
  };

  const handleSaveNoteChanges = async () => {
    // When you save changes, update the clickedNote's text with the content in the text box.
    if (selectedNote) {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2MiwiZXhwIjoxNjk3NDUyMDU3fQ.75ncPvlx6uwAcPbWaV1JbUGOBi1Px0XdQ98Eao798QQ';
  
        // Define the data to be sent in the POST request
        const noteData = {
          title: "James",
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
  
      // Now, update the note content in your app's state
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id ? { ...note, content: noteContent } : note
      );
      setNotes(updatedNotes);
      console.log('Content saved!');
      setValidationError('Content saved!');
      openModal();
    }
  };
  
  
  const handleSortClick = () => {
    setSortByRecent(!sortByRecent);
    setNotes(prevNotes => [...prevNotes].reverse());
  }

  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

  const toggleSettingsPopup = () => {
    setShowSettingsPopup(!showSettingsPopup);
  }

  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleSignOut = () => {
    setShowConfirmation(true);
  }

  const handleConfirmSignOut = () => {
    // Add code here to handle account deletion
    // ...
    setShowConfirmation(false); // Close the confirmation dialog after deletion
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [originalNotes, serOrigNote] = useState('');

  const handleSearch = () => {
    // Filter the notes based on the search query
    resetSearch();
    serOrigNote(notes);

    if (!searchQuery){
      setValidationError('Please provide a note title you are search for!');
      openModal();
      return;
    }

    const filteredNotes = notes.filter((note) =>
      note.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update the displayed notes
    setNotes(filteredNotes);
  };

  const resetSearch = () => {
    // Clear the search query and display all notes
    setSearchQuery('');
    setNotes(originalNotes); // Assuming "originalNotes" contains the unfiltered list of notes
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Top Blue Bar */}
      <div className="bg-gradient-to-r from-sky-200 via-sky-500 to-sky-700 p-8 text-white relative text-center flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://logodix.com/logo/1677281.png" // URL of the external logo
            className="w-16 h-16 rounded-full mr-4"
            alt="external logo"
          />
        </div>
        <div className="mr-4">
          <h2 className="text-4xl font-funky mb-4 inline">{username ? `Welcome, ${username}` : 'Welcome'}</h2>
        </div>
        <div className="flex items-center">
          <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
          {showConfirmation && (
          <div className="modal-overlay">
            <div className="modal-content">
              <ConfirmationDialog
                handleClose={handleCloseConfirmation}
                handleConfirm={handleConfirmSignOut}
              />
            </div>
          </div>
        )}
          <i className="fa fa-cogs text-white text-3xl ml-2 settings-icon" onClick={toggleSettingsPopup}></i>
      </div>
      {showSettingsPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <SettingsPopup handleClose={toggleSettingsPopup} />
          </div>
        </div>
      )}
      </div>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-sky-50 text-white w-80 p-4 flex-col justify-between">
          {/* Buttons */}
          <div className="flex justify-between mb-2">
            <button onClick={openNewNoteDialog} className="w-1/2 py-2 px-4 bg-sky-600 text-white mr-2 hover:bg-sky-700 mb-2">+ Add Note</button>
            {showNewNoteDialog && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <NewNoteDialog
                    handleClose={closeNewNoteDialog}
                    handleConfirm={handleConfirmAddNote}
                  />
                </div>
              </div>
            )}

            <button onClick={deleteCheckedNotes} className="w-1/2 py-2 px-4 bg-sky-600 text-white ml-2 hover:bg-sky-700 mb-2">- Delete Note</button>
          </div>
          <div className="mb-6"></div> {/* Adjust the value (2) to your desired spacing */}
          {/* Search Box */}
          <input
            type="text"
            className="bg-white border border-gray-300 p-2 mb-2 input-box w-full"
            placeholder="Search Notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        <div className="flex"> {/* Container for search and reset buttons */}
          <button
            className="bg-sky-600 text-white py-2 px-24 hover:bg-sky-700" /* Increase the width using px */
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="bg-gray-400 text-white py-2 px-3 hover:bg-gray-500 ml-2"
            onClick={resetSearch}
          >
            <i className="fas fa-redo"></i> {/* Replace with your circular arrow icon (refresh) */}
          </button>
        </div>
            {/* Label and Sort Icon */}
            <div className="mb-6"></div> {/* Adjust the value (2) to your desired spacing */}
            <div className="flex items-center mb-6">
            <div className="flex-shrink-0 mr-2">
              <label className="text-sky-600 font-bold">Sort Notes (most recent):</label>
            </div>
            <div className="flex justify-center">
              <i 
              className="fa fa-sort text-2xl text-sky-600 hover:text-sky-700 cursor-pointer"
              onClick={handleSortClick}>
              </i>
            </div>
        </div>

      <label className="text-sky-600 font-bold">Filter Notes by Category:</label>
      <div className="mb-2"></div> {/* Adjust the value (2) to your desired spacing */}
      <select className="bg-white border border-gray-300 p-2 input-box w-full">
        <option value="category1">All Notes</option>
        <option value="category2">Category 1</option>
        <option value="category3">Category 2</option>
      </select>

      <div className="mb-8"></div> {/* Adjust the value (2) to your desired spacing */}
      <div className="bg-white p-4 border border-gray-300 mt-4 rounded h-[380px] overflow-auto">
        <h3 className="text-sky-600 font-bold mb-2">Your Notes:</h3>
        <ul className="list-disc">
            {notes.map((note, index) => (
            <li key={note.id}>
              <input type="checkbox" className="mr-2" checked={note.checked} onChange={() => handleCheckboxChange(note.id)} />
              <span style={{ color: note.checked ? 'gray' : 'black' }}>{note.text}</span>
            </li>
            ))}
          </ul>
      </div>
        </div>
        {/* Markup Text Area */}
        <div className="flex-1 p-4">
          <div className="toolbar">
            <button onClick={() => changeFontSize('increase')} style={{marginRight: '10px'}}><i className="fas fa-plus"></i></button>
            <button onClick={() => changeFontSize('decrease')} style={{marginRight: '10px'}}><i className="fas fa-minus"></i></button>
            <button onClick={toggleBold} style={{marginRight: '10px'}}><i className="fas fa-bold"></i></button>
            <button onClick={toggleItalics} style={{marginRight: '10px'}}><i className="fas fa-italic"></i></button>
            <button onClick={toggleColorPicker}><i className="fas fa-paint-brush"></i></button>
            {showColorPicker && <ColorPicker onChange={handleColorChange} />}
            <button onClick={handleSaveNoteChanges} style={{ marginLeft: '10px' }}>
            <i className="fas fa-save"></i> {/* Add your save icon here */}
            </button>
          </div>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 input-box"
            placeholder="Note Title"
            value={notename}
            onChange={(e) => setNoteName(e.target.value)}
          />
          <textarea
            className="w-full h-full border border-gray-300 p-2 markup-textarea"
            placeholder="Start typing..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            readOnly={!selectedNote} // Disable editing if no note is selected
          />
        </div>
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

export default Main;
