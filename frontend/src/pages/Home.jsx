import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Utensils, Users, ShieldAlert, ArrowRight, Leaf } from 'lucide-react';

const Home = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-earthyBlonde">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-indianGreen/5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-saffron/20 text-saffronDark text-sm font-medium">
                            <Leaf className="w-4 h-4" />
                            <span>Towards a Zero Hunger India</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold font-outfit text-gray-900 leading-tight">
                            Share Food, <br />
                            <span className="text-saffron">Save Lives.</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
                            "No Food Should Go To Waste While Someone Sleeps Hungry."
                            Join our network of donors and NGOs to redistribute surplus food to communities in need.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                            <Link to="/register?role=donor">
                                <button className="bg-saffron hover:bg-saffronDark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-xl shadow-saffron/30 flex items-center space-x-2">
                                    <span>Donate Food</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                            <Link to="/register?role=ngo">
                                <button className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center space-x-2 shadow-sm">
                                    <span>Register NGO</span>
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Hero Image / Shapes */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-saffron/20 to-indianGreen/20 rounded-full animate-pulse blur-3xl"></div>

                        {/* Main Hero Image */}
                        <div className="relative glassmorphism rounded-3xl p-4 transform rotate-2 hover:rotate-0 transition-transform duration-500 z-10">
                            <img src="/images/hero.png" alt="ANNADATA Food Donation" className="rounded-2xl shadow-lg w-full h-[500px] object-cover" />

                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-6 -left-6 glassmorphism p-4 rounded-2xl flex items-center space-x-4 animate-float bg-white/90">
                                <div className="bg-green-100 p-3 rounded-full text-green-600">
                                    <Utensils className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Meals Served</p>
                                    <p className="text-xl font-bold font-outfit text-gray-900">10,000+</p>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Floating Image */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-12 -right-12 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20"
                        >
                            <img src="/images/community.png" alt="Community Sharing" className="w-full h-full object-cover" />
                        </motion.div>

                        {/* Third Floating Image */}
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-12 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-white z-0"
                        >
                            <img src="/images/ngo.png" alt="NGO Volunteers" className="w-full h-full object-cover" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Role Cards Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold font-outfit text-gray-900 mb-4">How Can You Help?</h2>
                        <p className="text-gray-600">Choose your role in our ecosystem and start making an impact today.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Donor Card */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="glassmorphism p-8 rounded-[2rem] border border-gray-100 shadow-xl relative overflow-hidden group flex flex-col"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/10 rounded-full blur-2xl group-hover:bg-saffron/20 transition-colors"></div>
                            <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden">
                                <img src="/images/donor.png" alt="Donate Food" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <Utensils className="w-10 h-10 text-saffron mb-4 relative z-10 bg-white/50 backdrop-blur-md p-2 rounded-xl shadow-sm -mt-12 ml-2" />
                            <h3 className="text-2xl font-bold font-outfit text-gray-900 mb-3">Donate Food</h3>
                            <p className="text-gray-600 mb-6 flex-grow">"Turn your surplus food into someone's hope." Ideal for restaurants, weddings, and individuals.</p>
                            <Link to="/login" className="text-saffron font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform mt-auto">
                                <span>Start Donating</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>

                        {/* NGO Card */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="glassmorphism p-8 rounded-[2rem] border border-gray-100 shadow-xl relative overflow-hidden group flex flex-col"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indianGreen/10 rounded-full blur-2xl group-hover:bg-indianGreen/20 transition-colors"></div>
                            <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden">
                                <img src="/images/ngo.png" alt="NGO Community" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <Users className="w-10 h-10 text-indianGreen mb-4 relative z-10 bg-white/50 backdrop-blur-md p-2 rounded-xl shadow-sm -mt-12 ml-2" />
                            <h3 className="text-2xl font-bold font-outfit text-gray-900 mb-3">NGO / Community</h3>
                            <p className="text-gray-600 mb-6 flex-grow">"Receive food and distribute it to people in need." Ideal for registered NGOs and community helpers.</p>
                            <Link to="/login" className="text-indianGreen font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform mt-auto">
                                <span>Claim Food</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>

                        {/* Admin Card */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="glassmorphism p-8 rounded-[2rem] border border-gray-100 shadow-xl relative overflow-hidden group flex flex-col"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
                            <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden">
                                <img src="/images/admin.png" alt="Admin Dashboard" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <ShieldAlert className="w-10 h-10 text-blue-500 mb-4 relative z-10 bg-white/50 backdrop-blur-md p-2 rounded-xl shadow-sm -mt-12 ml-2" />
                            <h3 className="text-2xl font-bold font-outfit text-gray-900 mb-3">Admin Panel</h3>
                            <p className="text-gray-600 mb-6 flex-grow">"Monitor and manage the entire donation ecosystem." For official administrators to verify and track.</p>
                            <Link to="/login" className="text-blue-500 font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform mt-auto">
                                <span>Admin Login</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sustainability Message */}
            <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Leaf className="w-16 h-16 text-indianGreen mx-auto mb-8 animate-float" />
                    <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6">The Food Waste Reality</h2>
                    <p className="text-xl text-gray-300 leading-relaxed mb-10">
                        India produces enough food to feed its population, yet millions go hungry every day while tonnes of food are wasted in weddings, restaurants, and households. ANNADATA bridges this gap by providing a seamless technological solution for food redistribution.
                    </p>
                    <div className="text-2xl font-medium text-saffron italic">
                        "Sharing food is sharing love."
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
