import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Myexpense = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/get');
        setUsers(response.data.user);
      } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data.message : error.message);
      }
    };

    fetchUsers();
  }, []);

  console.log(users); // Log users data to verify

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 sm:p-4'>
      {users.map((group, index) => (
        <article key={index}
          className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
        >
          <div className="rounded-[10px] bg-white p-4 sm:p-6 font-semibold h-full">
            <h3 className='text-xl md:text-2xl lg:text-3xl mb-4'>{group.name}</h3>
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
