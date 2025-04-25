import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useLoginMutation} from '../../redux/services/authApi';
import {toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';

import {FiLock, FiLogIn, FiUser} from 'react-icons/fi';
import InputField from '../../components/InputField.jsx';
import Button from '../../components/Button.jsx';
import {setUser} from '../../redux/slices/authSlice.js';


const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const [formData, setFormData] = useState({
        userId: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        userId: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'userId') {
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { userId: '', password: '' };

        if (!formData.userId.trim()) {
            newErrors.userId = 'User ID is required';
            valid = false;
        } else if (isNaN(formData.userId)) {
            newErrors.userId = 'User ID must be a number';
            valid = false;
        } else if (formData.userId.length < 4) {
            newErrors.userId = 'User ID must be at least 4 digits';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const submissionData = {
            userId: Number(formData.userId),
            password: formData.password
        };

        try {
            const res = await login(submissionData).unwrap();
            dispatch(setUser({user: res.user, token: res.token}));
            toast.success('Login successful!');
            setFormData({ userId: '', password: '' });
            navigate('/admin')
        } catch (err) {
            toast.error(err?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-[90vh] bg-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
            <div>
                <div className="max-width bg-white w-full space-y-8 p-8 rounded-lg shadow-md">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Login
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Enter your User ID and Password
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <InputField
                                label="Employee ID"
                                name="userId"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={formData.userId}
                                onChange={handleChange}
                                leftIcon={<FiUser className="text-gray-400" />}
                                error={errors.userId}
                                placeholder="Enter your employee ID"
                                autoComplete="username"
                            />

                            <InputField
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                leftIcon={<FiLock className="text-gray-400" />}
                                error={errors.password}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                            />
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <Link to={''} className="font-medium text-primary-600 hover:text-primary-500">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="orange"
                                className="font-bold mt-4"
                                size="medium"
                                icon={<FiLogIn size={24} />}
                                iconPosition="left"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Log In'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
