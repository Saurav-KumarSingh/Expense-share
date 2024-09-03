import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
    
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            const adduser = await axios.post('/api/register', formData)
            const response = adduser.data
            if (response.success) {
                console.log(response.message);
                toast.success(response.message);
                navigate('/dashboard')

            }
            console.log(response)
        } catch (error) {
            console.log(error.Message)
        }
    };

    return (
        <div className="flex font-poppins items-center justify-center min-w-screen max-h-screen">
            <div className="grid gap-8">
                <div id="back-div" className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
                    <div className="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
                        <h1 className="pt-2 pb-2 font-bold text-5xl dark:text-gray-400 text-center cursor-default">
                            Sign Up
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="fullname" className="mb-2 text-lg">Name</label>
                                <input
                                    id="fullname"
                                    className="border  p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                                    type="text"
                                    placeholder="Name"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="mb-2 text-lg">Email</label>
                                <input
                                    id="email"
                                    className="border  p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="mb-2 text-lg">Password</label>
                                <input
                                    id="password"
                                    className="border  p-3 mb-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button
                                className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                                type="submit"
                            >
                                SIGN UP
                            </button>
                        </form>
                        <div className="flex flex-col mt-4 items-center justify-center text-sm">
                            <h3>
                                <span className="cursor-default dark:text-gray-300">Have an account?</span>
                                <Link className="group text-blue-400 transition-all duration-100 ease-in-out" to='/login'>
                                    <span className="underline">Log in</span>
                                </Link>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
