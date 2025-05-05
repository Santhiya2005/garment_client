import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const valideValue = Object.values(data).every((el) => el);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            toast.error('Password and confirm password must be the same');
            return;
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: data,
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                navigate('/login');
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create an Account</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="text-gray-600 text-sm">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                            autoFocus
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="text-gray-600 text-sm">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="text-gray-600 text-sm">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                            <div
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-3 cursor-pointer"
                            >
                                {showPassword ? <FaRegEye className="text-gray-500" /> : <FaRegEyeSlash className="text-gray-500" />}
                            </div>
                        </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label htmlFor="confirmPassword" className="text-gray-600 text-sm">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm your password"
                            />
                            <div
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-3 cursor-pointer"
                            >
                                {showConfirmPassword ? <FaRegEye className="text-gray-500" /> : <FaRegEyeSlash className="text-gray-500" />}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={!valideValue}
                        className={`w-full py-3 rounded-md text-white font-semibold ${valideValue ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        Register
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-center mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Register;
