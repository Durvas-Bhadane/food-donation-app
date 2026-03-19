import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
    const { user, login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Redirect if already logged in
    if (user) {
        const dest = user.role === 'admin' ? '/admin' : user.role === 'ngo' ? '/ngo' : '/donor';
        return <Navigate to={dest} replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(email, password);
            if (userData.role === 'admin') navigate('/admin');
            else if (userData.role === 'ngo') navigate('/ngo');
            else navigate('/donor');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex bg-earthyBlonde">
            {/* Left Image Section */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <img
                    src="/images/donor.png"
                    alt="Fresh Produce"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-saffronDark/80 to-saffron/40 flex items-center justify-center p-12 mix-blend-multiply"></div>
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-white max-w-xl z-10">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-5xl font-bold font-outfit mb-6"
                        >
                            Welcome Back to<br /> <span className="text-white font-extrabold tracking-wider">ANNADATA</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-white/90 leading-relaxed font-medium"
                        >
                            Log in to track your impact, request new pickups, or monitor the ecosystem.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-indianGreen/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 hidden md:block"></div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-md w-full glassmorphism p-8 md:p-10 rounded-[2.5rem] relative z-10"
                >
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold font-outfit text-gray-900">
                            Sign In
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Enter your details to access your dashboard
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center space-x-2">
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-5">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email" required
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 appearance-none rounded-xl w-full py-4 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:border-saffron sm:text-sm bg-white/80 shadow-sm transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="password" required
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 appearance-none rounded-xl w-full py-4 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:border-saffron sm:text-sm bg-white/80 shadow-sm transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                className="w-full flex justify-center py-4 px-4 border border-transparent font-bold text-lg rounded-xl text-white bg-saffron hover:bg-saffronDark shadow-xl shadow-saffron/20 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron"
                            >
                                Access Dashboard
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-gray-600 font-medium pt-6 border-t border-gray-200/50">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-saffron hover:text-saffronDark transition-colors">
                            Register here
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
