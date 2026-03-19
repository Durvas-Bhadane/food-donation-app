import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User as UserIcon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setMobileOpen(false);
        navigate('/');
    };

    const getDashboardLink = () => {
        if (!user) return '/login';
        if (user.role === 'admin') return '/admin';
        if (user.role === 'ngo') return '/ngo';
        return '/donor';
    };

    const isActive = (path) => location.pathname === path;

    const navLinkClass = (path) =>
        `hover:text-saffron transition-colors font-medium ${isActive(path) ? 'text-saffron' : ''}`;

    const closeMobile = () => setMobileOpen(false);

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 glassmorphism-dark text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3" onClick={closeMobile}>
                        <img src="/images/logo.png" alt="ANNADATA Logo" className="h-10 w-10 rounded-lg object-contain" />
                        <span className="font-outfit font-bold text-2xl tracking-wide">
                            ANNADATA
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className={navLinkClass('/')}>Home</Link>
                        <Link to="/about" className={navLinkClass('/about')}>About Impact</Link>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link to={getDashboardLink()} className={`flex items-center space-x-1 hover:text-saffron transition-colors ${isActive(getDashboardLink()) ? 'text-saffron' : ''}`}>
                                    <UserIcon className="h-5 w-5" />
                                    <span className="font-medium">Dashboard</span>
                                </Link>
                                <span className="text-gray-500 text-sm capitalize px-2 py-1 bg-white/10 rounded-full">{user.role}</span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-full transition-all"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login" className={navLinkClass('/login')}>Login</Link>
                                <Link to="/register">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-saffron hover:bg-saffronDark text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg shadow-saffron/30"
                                    >
                                        Join Us
                                    </motion.button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-700/50 overflow-hidden"
                    >
                        <div className="px-6 py-6 space-y-4">
                            <Link to="/" onClick={closeMobile} className={`block py-2 font-medium ${isActive('/') ? 'text-saffron' : 'text-white hover:text-saffron'} transition-colors`}>Home</Link>
                            <Link to="/about" onClick={closeMobile} className={`block py-2 font-medium ${isActive('/about') ? 'text-saffron' : 'text-white hover:text-saffron'} transition-colors`}>About Impact</Link>

                            {user ? (
                                <>
                                    <Link to={getDashboardLink()} onClick={closeMobile} className={`block py-2 font-medium ${isActive(getDashboardLink()) ? 'text-saffron' : 'text-white hover:text-saffron'} transition-colors`}>
                                        My Dashboard ({user.role})
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left py-2 font-medium text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={closeMobile} className="block py-2 font-medium text-white hover:text-saffron transition-colors">Login</Link>
                                    <Link to="/register" onClick={closeMobile}>
                                        <button className="w-full bg-saffron hover:bg-saffronDark text-white py-3 rounded-xl font-bold transition-colors mt-2">
                                            Join Us
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
