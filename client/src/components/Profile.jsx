import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector(state => state.user.data?.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      {/* Profile Header */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 py-10 mb-6">
        
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <img src={user.profilepic} alt="" />
          </div>
          {/* User Information */}
          <div className="text-center">
            <p className="text-xl font-semibold">{user.fullname}</p>
            <p className="text-gray-700">{user.email}</p>
            
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Profile;
