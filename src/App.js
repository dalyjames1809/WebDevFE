import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import SignUp from './SignUp'; // Create a SignUp component for the registration page
import Main from './Main'
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* SignUp Page */}
        <Route path="/register" element={<SignUp />} />

        {/* Main Page (Home Page After Login) */}
        <Route path="/home" element={<Main />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();
  const { setUsername } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || !password) {
      setErrorMessage('Please fill in both the username and password fields.');
      return;
    }

    setUsername(username);

    try {
      const response = await fetch('https://notesapp343-aceae8559200.herokuapp.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      if (response.ok) {
        // If the login was successful, you can handle it here.
        const data = await response.json();
        console.log('Login successful');
        console.log(data);
        navigate('/home');
      } else {
        // Handle login failure here.
        const errorData = await response.json();
        const errorMessage = errorData.message; // Assuming the error message is provided in the response.
        setErrorMessage(errorMessage); // Set the error message in state
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('An error occurred while logging in.'); // Set a generic error message
    }
  }
  
  return (
    <div className="bg-blue-900 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <img
          src="https://logodix.com/logo/1677281.png"
          className="w-32 h-32 mx-auto mb-4 rounded-full"
          alt="external logo"
        />
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Email</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
          {errorMessage && ( // Display error message conditionally
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
          <div className="mb-4">
            <label className="flex items-center italic">
              <input
                type="checkbox"
                className="mr-2"
              />
              Remember me
            </label>
          </div>
        </form>
        <p className="mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link className="text-blue-500 hover:underline" to="/register">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default App;

