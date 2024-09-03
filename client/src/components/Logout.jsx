import React from 'react';
import { useDispatch} from 'react-redux';
import { logout } from '../redux/slice/userSlice';
import { TbLogout } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logout());
      if (logout.fulfilled.match(resultAction)) {
        
        const responseMessage = resultAction.payload.message || 'Successfully logged out';
        await toast.success(responseMessage);
        navigate('/login'); 
      }
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="flex py-2 px-4 font-semibold text-white duration-200 hover:bg-slate-100 hover:text-black">
        <TbLogout className='text-xl mx-2 mt-1' />
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
