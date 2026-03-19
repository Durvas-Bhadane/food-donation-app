import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, MapPin, Building, ShieldCheck } from 'lucide-react';

const Register = () => {
    const { user, register } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if already logged in
    if (user) {
        const dest = user.role === 'admin' ? '/admin' : user.role === 'ngo' ? '/ngo' : '/donor';
        return <Navigate to={dest} replace />;
    }

    // Get role from URL query param, default to donor
    const queryParams = new URLSearchParams(location.search);
    const initialRole = queryParams.get('role') || 'donor';

    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: initialRole,
        address: '', city: '', contactNumber: '', ngoCertificate: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await register(formData);
            if (userData.role === 'admin') navigate('/admin');
            else if (userData.role === 'ngo') navigate('/ngo');
            else navigate('/donor');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex bg-earthyBlonde">
            {/* Left Image Section - Hidden on small screens */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <img
                    src="/images/hero.png"
                    alt="Community Food Sharing"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center justify-center p-12">
                    <div className="text-white max-w-xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-bold font-outfit mb-6"
                        >
                            Become a <span className="text-saffron">Catalyst</span><br /> for Change
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-200 leading-relaxed"
                        >
                            Join thousands of donors and NGOs working together to redistribute surplus food and eradicate hunger across India. Every meal counts.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 hidden md:block"></div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-xl w-full glassmorphism p-8 md:p-10 rounded-[2.5rem] relative"
                >
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold font-outfit text-gray-900">
                            Join Our Network
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Create an account to start sharing or receiving food
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center space-x-2">
                                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="relative col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Account Type</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="appearance-none rounded-xl relative block w-full px-4 py-3.5 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:border-saffron sm:text-sm bg-white/80 shadow-sm transition-all"
                                >
                                    <option value="donor">Food Donor (Individual/Restaurant)</option>
                                    <option value="ngo">NGO / Community Organization</option>
                                </select>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">{formData.role === 'ngo' ? "Organization Name" : "Full Name"}</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        name="name" type="text" required
                                        value={formData.name} onChange={handleChange}
                                        placeholder={formData.role === 'ngo' ? "Enter org name" : "John Doe"}
                                        className="pl-10 appearance-none rounded-xl w-full py-3.5 border border-gray-200 bg-white/80 shadow-sm focus:ring-2 focus:ring-saffron/50 focus:border-saffron sm:text-sm transition-all text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        name="email" type="email" required
                                        value={formData.email} onChange={handleChange}
                                        placeholder="you@example.com"
                                        className="pl-10 appearance-none rounded-xl w-full py-3.5 border border-gray-200 bg-white/80 shadow-sm focus:ring-2 focus:ring-saffron/50 focus:border-saffron sm:text-sm transition-all text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        name="password" type="password" required
                                        value={formData.password} onChange={handleChange}
                                        placeholder="••••••••"
                                        className="pl-10 appearance-none rounded-xl w-full py-3.5 border border-gray-200 bg-white/80 shadow-sm focus:ring-2 focus:ring-saffron/50 focus:border-saffron sm:text-sm transition-all text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Contact Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        name="contactNumber" type="text" required
                                        value={formData.contactNumber} onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="pl-10 appearance-none rounded-xl w-full py-3.5 border border-gray-200 bg-white/80 shadow-sm focus:ring-2 focus:ring-saffron/50 focus:border-saffron sm:text-sm transition-all text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="relative col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Full Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        name="address" type="text" required
                                        value={formData.address} onChange={handleChange}
                                        placeholder="123 Main St, Appt 4B"
                                        className="pl-10 appearance-none rounded-xl w-full py-3.5 border border-gray-200 bg-white/80 shadow-sm focus:ring-2 focus:ring-saffron/50 focus:border-saffron sm:text-sm transition-all text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="relative col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">City</label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        name="city" type="text" required
                                        value={formData.city} onChange={handleChange}
                                        placeholder="Mumbai"
                                        className="pl-10 appearance-none rounded-xl w-full py-3.5 border border-gray-200 bg-white/80 shadow-sm focus:ring-2 focus:ring-saffron/50 focus:border-saffron sm:text-sm transition-all text-gray-900"
                                    />
                                </div>
                            </div>

                            {formData.role === 'ngo' && (
                                <div className="relative col-span-1 md:col-span-2 pt-2">
                                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                        <label className="block text-sm font-medium text-blue-900 mb-1 ml-1">NGO Certificate Link</label>
                                        <div className="relative">
                                            <ShieldCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                                            <input
                                                name="ngoCertificate" type="text"
                                                value={formData.ngoCertificate} onChange={handleChange}
                                                placeholder="https://drive.google.com/... (Optional but recommended)"
                                                className="pl-10 appearance-none rounded-xl w-full py-3.5 border border-blue-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm transition-all text-gray-900"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-4">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                className="w-full flex justify-center py-4 px-4 rounded-xl text-white bg-saffron hover:bg-saffronDark shadow-xl shadow-saffron/20 font-bold text-lg transition-all"
                            >
                                Complete Registration
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-gray-600 font-medium pt-6 border-t border-gray-200/50">
                        Already have an account?{' '}
                        <Link to="/login" className="text-saffron hover:text-saffronDark transition-colors">
                            Sign in to your dashboard
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
