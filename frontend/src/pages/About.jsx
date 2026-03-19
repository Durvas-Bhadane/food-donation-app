import { motion } from 'framer-motion';
import { Heart, Leaf, Users, Utensils, TrendingUp, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const stats = [
        { icon: Utensils, value: '40%', label: 'Of food produced in India is wasted', color: 'text-red-500', bg: 'bg-red-50' },
        { icon: Users, value: '190M', label: 'Indians are undernourished', color: 'text-saffron', bg: 'bg-orange-50' },
        { icon: TrendingUp, value: '68M', label: 'Tonnes of food wasted yearly', color: 'text-blue-500', bg: 'bg-blue-50' },
        { icon: Globe, value: '₹92,000 Cr', label: 'Worth of food wasted annually', color: 'text-indianGreen', bg: 'bg-green-50' },
    ];

    const howItWorks = [
        { step: '01', title: 'Donor Lists Food', desc: 'Restaurants, caterers, households, or event organizers list surplus food with details like quantity, type, and expiry time.', color: 'border-saffron' },
        { step: '02', title: 'Admin Verifies', desc: 'Our admin team verifies the donation to ensure food safety and quality standards are met before listing it for NGOs.', color: 'border-blue-500' },
        { step: '03', title: 'NGO Requests Pickup', desc: 'Verified NGOs and community organizations browse available donations and request pickup of food that matches their needs.', color: 'border-indianGreen' },
        { step: '04', title: 'Food Reaches People', desc: 'The NGO collects the food and distributes it to communities in need — closing the loop from waste to nourishment.', color: 'border-purple-500' },
    ];

    const team = [
        { name: 'Our Vision', desc: 'A future where no edible food goes to waste while someone sleeps hungry. We believe technology can bridge the gap between surplus and scarcity.' },
        { name: 'Our Mission', desc: 'To build India\'s largest food redistribution network connecting donors, NGOs, and communities through a seamless digital platform.' },
        { name: 'Our Impact', desc: 'Every meal saved is a step towards zero hunger. We track every donation from creation to delivery, ensuring transparency and accountability.' },
    ];

    return (
        <div className="w-full">
            {/* Hero */}
            <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}></div>
                <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-saffron/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indianGreen/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div {...fadeInUp}>
                        <span className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-saffron text-sm font-medium mb-6">
                            <Heart className="w-4 h-4" />
                            <span>About ANNADATA</span>
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6 leading-tight">
                            Bridging the Gap Between<br />
                            <span className="text-saffron">Surplus</span> and <span className="text-indianGreen">Scarcity</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            ANNADATA is India's community-driven food sharing network that transforms surplus food into hope, one meal at a time. We connect generous donors with verified NGOs to ensure no plate goes to waste.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-outfit text-gray-900 mb-4">The Food Crisis in India</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">While India produces enough food to feed every citizen, the disconnect between production and distribution leads to heartbreaking waste and hunger.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="glassmorphism p-8 rounded-2xl text-center border border-gray-100">
                                <div className={`inline-flex p-4 rounded-2xl ${stat.bg} mb-4`}>
                                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                                </div>
                                <p className="text-3xl font-bold font-outfit text-gray-900 mb-1">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-earthyBlonde">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-outfit text-gray-900 mb-4">How ANNADATA Works</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">A simple 4-step process that transforms surplus food into served meals.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {howItWorks.map((item, i) => (
                            <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.15 }} className={`bg-white p-8 rounded-2xl shadow-sm border-l-4 ${item.color} relative`}>
                                <span className="text-6xl font-extrabold font-outfit text-gray-100 absolute top-4 right-4">{item.step}</span>
                                <h3 className="text-xl font-bold font-outfit text-gray-900 mb-3 relative z-10">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed relative z-10">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision / Mission / Impact */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((item, i) => (
                            <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.15 }} className="glassmorphism p-8 rounded-2xl border border-gray-100 text-center">
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 ${i === 0 ? 'bg-saffron/10 text-saffron' : i === 1 ? 'bg-indianGreen/10 text-indianGreen' : 'bg-blue-50 text-blue-500'}`}>
                                    {i === 0 ? <Heart className="w-7 h-7" /> : i === 1 ? <Globe className="w-7 h-7" /> : <TrendingUp className="w-7 h-7" />}
                                </div>
                                <h3 className="text-2xl font-bold font-outfit text-gray-900 mb-4">{item.name}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-saffron to-saffronDark text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div {...fadeInUp}>
                        <Leaf className="w-12 h-12 mx-auto mb-6 animate-float" />
                        <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6">Ready to Make a Difference?</h2>
                        <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
                            Whether you're a food donor with surplus to share, or an NGO looking to serve your community — we welcome you to ANNADATA.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/register?role=donor">
                                <button className="bg-white text-saffron hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg shadow-xl flex items-center space-x-2 transition-all">
                                    <span>Start Donating</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                            <Link to="/register?role=ngo">
                                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl flex items-center space-x-2 border border-white/30 transition-all">
                                    <span>Register as NGO</span>
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-16 bg-gray-900 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <p className="text-2xl md:text-3xl italic font-outfit font-light leading-relaxed text-gray-300">
                        "When you have more than you need, build a longer table — not a higher fence."
                    </p>
                    <p className="mt-4 text-saffron font-medium">— The spirit of ANNADATA</p>
                </div>
            </section>
        </div>
    );
};

export default About;
