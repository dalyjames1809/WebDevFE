import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);

  // Function to navigate back to the login page
  const goBack = () => {
    navigate('/');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('username', e.target.username.value);
    formData.append('email', e.target.email.value);
    formData.append('password', e.target.password.value);
  
    // Append the avatar file to the form data if it's not null
    if (avatar) {
      formData.append('avatar', avatar);
    }
  
    try {
      const response = await fetch('https://notesapp343-aceae8559200.herokuapp.com/users/register', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data.message);
        // You may also want to store the token in localStorage or a cookie for future authentication
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
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
    </div>
  );
}

export default SignUp;
