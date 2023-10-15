import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

function SignUp() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [imageValidationError, setImageValidationError] = useState(''); // Add image validation state

  const goBack = () => {
    navigate('/');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setImageValidationError(''); // Clear previous image validation error
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isImageValid = (image) => {
    if (!image) {
      setValidationError('Please upload an avatar image');
      return false;
    }

    return true;
  };

  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!username || !email || !password) {
      setValidationError('Please fill in all fields');
      openModal();
      return;
    }

    if (!isEmailValid(email)) {
      setValidationError('Please enter a valid email address');
      openModal();
      return;
    }

    if (!isPasswordValid(password)) {
      setValidationError('Password must have at least 8 characters');
      openModal();
      return;
    }

    if (!isImageValid(avatar)) { // Validate the uploaded avatar
      openModal();
      return;
    }

    try {
      const response = await fetch('https://notesapp343-aceae8559200.herokuapp.com/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data.message);
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setValidationError('');
    setImageValidationError(''); // Clear image validation error
  };


  return (
    <div className="bg-orange-700 min-h-screen flex justify-center items-center relative">
      {/* Back Button */}
      <button
        onClick={goBack}
        className="text-white hover:underline absolute top-4 left-4"
      >
        &#8592; Back to Login
      </button>

      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        {/* Image in Top-Right Corner */}
        <img
          src="https://logodix.com/logo/1677281.png"
          className="w-20 h-20 absolute top-4 right-4 rounded-full"
          alt="external logo"
        />

        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Email</label>
            <input
              type="text"
              name="email"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded-md"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
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
          justifyContent: 'center', // Center the content vertically
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

export default SignUp;

