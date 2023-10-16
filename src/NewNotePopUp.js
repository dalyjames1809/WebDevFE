import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useUser } from './UserContext';
import './ConfirmationDialog.css';
import './SettingsModal.css';

Modal.setAppElement('#root');

function NewNoteDialog({ handleClose, handleConfirm }) {
  const {userToken, userID} = useUser();
  const [title, setTitle] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // Initialize it with a default value
  const [newCategory, setNewCategory] = useState(''); // New state for the input field

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

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const [categories, setCategories] = useState([]); // State to store fetched categories

  const fetchUserCategories = async () => {
    try {
      const token = userToken;
      const auth = 'Bearer ' + token;
      const response = await fetch('https://notesapp343-aceae8559200.herokuapp.com/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(userID)
        // Filter categories by user_id
        const filteredCategories = data.filter(category => category.user_id === userID);

        setCategories(filteredCategories); // Update the 'categories' state with the filtered categories
      } else {
        const errorData = await response.json();
        console.error('Error fetching categories:', errorData.message);
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    fetchUserCategories(); // Call the function to fetch and filter categories when the component mounts
  }, [userToken, userID]);

  const handleCreateNote = async () => {
    if (!title) {
      setValidationError('Please enter a note title');
      openModal();
      return;
    }
    handleConfirm(title);
  
    try { // Add try block here
      // Create a map of category names to their IDs
      console.log('categories:', categories);

      const categoryMap = {};
      for (const category of categories) {
        categoryMap[category.name] = category.category_id;
      }
      console.log('categoryMap:', categoryMap); // Add this line to check the contents of categoryMap

      const token = userToken;

      const category_id = categoryMap[selectedCategory]; // Look up the ID based on the selected category
  
      const noteData = {
        title: title,
        content: '',
        category_id: category_id, // Include the selected category ID
      };
  
      const auth = 'Bearer ' + token;
      // Send the POST request
      const response = await fetch(
        'https://notesapp343-aceae8559200.herokuapp.com/notes',
        {
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
  
  const handleCreateCategory = async () => {
    if (!newCategory) {
      setValidationError('Please enter a category name');
      openModal();
      return;
    }

    try {
      const token = userToken;

      const categoryData = {
        name: newCategory,
        user_id: userID,
      };

      const auth = 'Bearer ' + token;
      const response = await fetch(
        'https://notesapp343-aceae8559200.herokuapp.com/categories',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
          },
          body: JSON.stringify(categoryData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Category created:', data.message);
        setNewCategory(''); // Clear the input field after creating the category
        fetchUserCategories();

      } else {
        const errorData = await response.json();
        console.error('Category creation failed:', errorData.message);
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Error creating category:', error);
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
        <label>Select existing category for the new note:</label>
        <select
          className="bg-white border border-gray-300 input-box w-full"
          style={{ fontSize: '16px' }}
          value={selectedCategory}
          onChange={(e) => {
            const selectedValue = e.target.value;
            setSelectedCategory(selectedValue);
            console.log('Selected Category:', selectedValue); // Add this line to log the selected category
          }}
        >
          <option value="">All Notes</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <label>Create a new category for the note:</label>
        <div className="input-column">
          <input
            type="text"
            name="newCategory"
            placeholder="Enter category name..."
            style={{ color: 'black', fontSize: '16px' }}
            value={newCategory}
            onChange={handleNewCategoryChange}
          />
          <button
            className="create-category-button"
            onClick={handleCreateCategory}
          >
            Create Category
          </button>
        </div>

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
