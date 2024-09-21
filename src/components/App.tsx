import React, { useState } from 'react';
import AadharForm from './AadharForm';
import DLForm from './DLForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const isValidUser = process.env.VITE_VERCEL_ADMIN_USERNAME === username && process.env.VITE_VERCEL_ADMIN_PASSWORD === password;
    if (isValidUser) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Rental Riders</h1>
          <h2 className="text-xl font-semibold">Customer Document Verification</h2>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoggedIn ? (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Logout
              </button>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
              <AadharForm />
              <DLForm />
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 text-center">Login to Access Forms</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Login
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

