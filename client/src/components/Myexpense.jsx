import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete,MdOutlineModeEdit } from "react-icons/md";
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const Myexpense = () => {
  const [users, setUsers] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/expense');
        setUsers(response.data.user);
      } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data.message : error.message);
      }
    };

    fetchUsers();
  }, [users]);

  
  const onDeletehandeler=async(id)=>{
    console.log(id)
    try {
      const DeletUser = await axios.delete(`/api/delete/${id}`)
      const response = DeletUser.data
      if (response.success) {
          toast.success(response.message)
      }
  } catch (error) {
      console.log(error)
  }
  }
  const onEdithandeler=async(expenseId)=>{
    console.log(expenseId)
    navigate(`/dashboard/update-expense/${expenseId}`)
  }

  if(users.length <= 0){
      return (<p className='mt-4 text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-700 bg-clip-text text-transparent'>You don't have any expense yet.</p>);
  }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 sm:p-4'>
      {users.map((group, index) => (
        <article key={index}
          className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
        >
          <div className="rounded-[10px] bg-white p-4 sm:p-6 font-semibold h-full">

            <div className='flex justify-between'>
              <h3 className='text-xl md:text-2xl lg:text-3xl mb-4'>{group.name}</h3>
              <div>
              <button type='submit' className=' h-8 px-2 mx-1 rounded bg-blue-50' onClick={()=>onEdithandeler(group._id)}><MdOutlineModeEdit className='text-blue-600 text-xl' /></button>
              <button type='submit' className=' h-8 px-2 mx-1 rounded bg-red-50' onClick={()=>onDeletehandeler(group._id)}><MdDelete className='text-red-600 text-xl' /></button>
              </div>
            </div>
            <div className='mt-4'>
              <div className='flex justify-between '>
                <p className='font-bold text-start w-1/3'>Name</p>
                <p className='font-bold text-start w-1/3'>Item</p>
                <p className='font-bold text-start w-1/3'>Expense</p>
              </div>
              <div className="text-center mt-4">
                {group.expensedata.length > 0 ? (
                  group.expensedata.map((expense, expIndex) => (
                    <div key={expIndex} className="mt-2 py-2 border-b border-gray-200 flex justify-between">
                      <p className='w-1/3  text-start'>{expense.contributer}</p>
                      <p className='w-1/3  text-start'>{expense.item}</p>
                      <p className='w-1/3  text-start'>₹ {expense.amount}</p>
                    </div>
                  ))
                ) : (
                  <p className='mt-4'>No expense data available</p>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Myexpense;
