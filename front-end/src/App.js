import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import SignUp from './SignUp'; // Create a SignUp component for the registration page
import Main from './Main'

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, including avatar file
    const formData = new FormData();
    formData.append('username', e.target.username.value);
  //  formData.append('avatar', avatar);
    formData.append('password', e.target.password.value);

    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });
    console.log(jsonData);
  };

  return (
      <div className="bg-blue-900 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <img
          src="https://logodix.com/logo/1677281.png" // URL of the external logo
          className="w-32 h-32 mx-auto mb-4 rounded-full"
          alt="external logo"
        />
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form  onSubmit={handleSubmit}> 
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
            <label className="block text-gray-600 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <Link to="/home">
            <button
              type="button" // Use type="button" to prevent form submission
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </Link>
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
