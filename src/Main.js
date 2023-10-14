import React, {useState} from 'react';
import './Button.css'; // Assuming you have a CSS file named Button.css
import ColorPicker from './ColorPicker.js';
import './SettingsModal.css';
import SettingsPopup from './SettingsPopUp';
import ConfirmationDialog from './SignOutPopUp';
import NewNoteDialog from './NewNotePopUp';
import { useUser } from './UserContext';
import index from './index';

function Main() {

  const { username } = useUser();
  
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

  const [notes, setNotes] = useState([]);
  const [highestId, setHighestId] = useState(0);

  const addNote = () => {
    const newNote = { id: highestId + 1, text: `Note ${highestId + 1}` };
  
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
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, checked: !note.checked } : note
    );
    setNotes(updatedNotes);
  }

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
            <button onClick={addNote} className="w-1/2 py-2 px-4 bg-sky-600 text-white mr-2 hover:bg-sky-700 mb-2">+ Add Note</button>
            <button onClick={deleteCheckedNotes} className="w-1/2 py-2 px-4 bg-sky-600 text-white ml-2 hover:bg-sky-700 mb-2">- Delete Note</button>
          </div>
          <div className="mb-6"></div> {/* Adjust the value (2) to your desired spacing */}
          {/* Search Box */}
          <input
            type="text"
            className="bg-white border border-gray-300 p-2 mb-2 input-box w-full"
            placeholder="Search Notes..."
          />
           <button className="bg-sky-600 text-white py-2 px-4 hover:bg-sky-700 w-full">Search</button>
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
          </div>
          <textarea className="w-full h-full border border-gray-300 p-2 markup-textarea" placeholder="Start typing..."></textarea>
        </div>
      </div>
    </div>
  );
}

export default Main;

