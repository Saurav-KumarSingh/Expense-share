import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const GroupExpenseForm = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    members: [''],  // Members array will store ObjectIds as strings
    expensedata: [{ contributer: '', item: '', amount: '' }],
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleInputChange = (e, fieldName, index) => {
    const { name, value } = e.target;

    if (fieldName === 'members' || fieldName === 'expensedata') {
      const newField = [...formData[fieldName]];

      if (fieldName === 'members') {
        newField[index] = value;  // Directly store ObjectId string
      } else {
        newField[index][name] = value;
      }
      setFormData({ ...formData, [fieldName]: newField });

      if (fieldName === 'members') {
        const filtered = users.filter(user =>
          user.email.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(filtered);
        setDropdownOpen(true);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOptionClick = (userId, index) => {
    const newMembers = [...formData.members];
    newMembers[index] = userId;  // Store ObjectId string in members array
    setFormData({ ...formData, members: newMembers });
    setDropdownOpen(false);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex(prev => Math.min(prev + 1, filteredUsers.length - 1));
    } else if (e.key === 'ArrowUp') {
      setActiveIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (activeIndex !== null) {
        handleOptionClick(filteredUsers[activeIndex]._id, index);  // Use ObjectId instead of email
      }
    }
  };

  const addMemberField = () => {
    setFormData({ ...formData, members: [...formData.members, ''] });  // Add new empty string for ObjectId
  };

  const addExpenseField = () => {
    setFormData({
      ...formData,
      expensedata: [...formData.expensedata, { contributer: '', item: '', amount: '' }],
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/alluser');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data.message : error.message);
        toast.error('Failed to fetch users'); // Show an error toast to the user
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    try {
      const adduser = await axios.post('/api/addexpense', formData);
      const response = adduser.data;
      if (response.success) {
        console.log(response.message);
        toast.success(response.message);
        navigate('/dashboard');
      }
      console.log(response);
    } catch (error) {
      console.log(error.message);
      toast.error('Error submitting form'); // Show an error toast to the user
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Create Group Expense</h2>
      <form onSubmit={handleSubmit}>
        {/* Group Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Group Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange(e, 'name')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Members */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Members</label>
          {formData.members.map((memberId, index) => (
            <div key={index} className="relative">
              <input
                type="text"
                name="member"
                value={users.find(user => user._id === memberId)?.email || ''}
                onChange={(e) => handleInputChange(e, 'members', index)}
                onClick={() => setDropdownOpen(true)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 100)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
              />
              {dropdownOpen && filteredUsers.length > 0 && (
                <ul className="absolute left-0 right-0 mt-1 max-h-48 bg-white border border-gray-300 rounded-md shadow-lg overflow-auto z-10">
                  {filteredUsers.map((user, idx) => (
                    <li
                      key={user._id}
                      onClick={() => handleOptionClick(user._id, index)}  // Use ObjectId
                      className={`p-2 hover:bg-gray-100 cursor-pointer ${activeIndex === idx ? 'bg-gray-200' : ''}`}
                    >
                      {user.email}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addMemberField}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            + Add Member
          </button>
        </div>

        {/* Expense Data */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Expenses</label>
          {formData.expensedata.map((expense, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name="contributer"
                placeholder="Contributer"
                value={expense.contributer}
                onChange={(e) => handleInputChange(e, 'expensedata', index)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <input
                type="text"
                name="item"
                placeholder="Item"
                value={expense.item}
                onChange={(e) => handleInputChange(e, 'expensedata', index)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={expense.amount}
                onChange={(e) => handleInputChange(e, 'expensedata', index)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                required
                min="0"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addExpenseField}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            + Add Expense
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GroupExpenseForm;
