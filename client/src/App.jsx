import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
    <Toaster/>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    </div>
  );
}

export default App;
