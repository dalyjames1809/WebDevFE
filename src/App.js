import React from 'react';
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
  const navigate = useNavigate();
  const { username, setUsername } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('https://notesapp343-aceae8559200.herokuapp.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username, // Assuming you use the username as the email for login
          password: password,
        }),
      });

      if (response.ok) {
        // If the login was successful, you can handle it here.
        const data = await response.json();
        setUsername(data.username);
        console.log('Login successful');
        console.log(data); // This will include the token or other response data from your backend.

        // Redirect to the home page or perform other actions.
        navigate('/home')
      } else {
        // Handle login failure here.
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        // You can display an error message to the user.
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

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
              type="sumbit" // Use type="button" to prevent form submission
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
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
