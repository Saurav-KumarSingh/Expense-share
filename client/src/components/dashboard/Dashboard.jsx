import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoMenu, IoClose } from "react-icons/io5";
import { MdHome, MdGroupAdd } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../redux/slice/userSlice';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Dispatch to fetch user data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Select user data from the Redux store
  const user = useSelector(state => state.user.data?.user);
  console.log(user)
  localStorage.setItem('user',user)


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-black shadow-md z-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}>
        <div className="flex items-center justify-between p-4 text-white">
          <Link to="/" className="text-2xl font-bold">Expense</Link>
          <button onClick={toggleSidebar} className="md:hidden">
            <IoClose size={24} />
          </button>
        </div>
        <nav className="mt-4">
          <div className='flex flex-col justify-between min-h-[85vh]'>
            <div>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `block flex py-2 px-4 font-semibold text-white duration-200 ${isActive ? "bg-orange-100 text-orange-600" : "text-gray-700"} hover:bg-orange-200`
                }
              ><MdHome className='text-xl mx-2' />
                Home
              </NavLink>
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  `block flex py-2 px-4 font-semibold text-white duration-200 ${isActive ? "bg-orange-100 text-orange-600" : "text-gray-700"} hover:bg-orange-200`
                }
              >
                <MdGroupAdd className='text-xl mx-2' /> Add Expenses
              </NavLink>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  `block flex py-2 px-4 font-semibold text-white duration-200 ${isActive ? "bg-orange-100 text-orange-600" : "text-gray-700"} hover:bg-orange-200`
                }
              ><GiTakeMyMoney className='text-xl mx-2' />
                My Expenses
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex block py-2 px-4 font-semibold text-white duration-200 ${isActive ? "bg-orange-100 text-orange-600" : "text-gray-700"} hover:bg-orange-200`
                }
              ><RxAvatar className='text-xl mx-2 mt-[1px]'/>
              
              </NavLink>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between md:hidden">
          <Link to="/" className="text-2xl font-bold">Expense</Link>
          <button onClick={toggleSidebar}>
            <IoMenu size={24} />
          </button>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Content goes here */}
          <h1 className="text-3xl font-bold mb-4">Dashboard Content</h1>
          <p>Welcome, {user?.fullname || 'Guest'}</p>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
