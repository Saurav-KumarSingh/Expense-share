import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/Login';
import ExpenseFrom from './components/ExpenseForm'
import { Toaster } from 'react-hot-toast'
import Myexpense from './components/Myexpense';
import Profile from './components/Profile';
import IndexPage from './components/dashboard/Indexpage';
import UpdateExpenseForm from './components/UpdateExpense';

const App = () => {
  return (
    <div>
    <Toaster/>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard />} >
            <Route index element={<IndexPage />} />
            <Route path='/dashboard/home' element={<IndexPage />} />
            <Route path='/dashboard/create-expense' element={ <ExpenseFrom/>} />
            <Route path='/dashboard/myexpense' element={ <Myexpense/>} />
            <Route path='/dashboard/update-expense/:id' element={ <UpdateExpenseForm/>} />
            <Route path='/dashboard/profile' element={ <Profile/>} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
