import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2 space-y-4">
                    <div className="flex items-center space-x-3 text-white">
                        <img src="/images/logo.png" alt="ANNADATA Logo" className="h-10 w-10 rounded-lg object-contain" />
                        <span className="font-outfit font-bold text-2xl tracking-wide">
                            ANNADATA
                        </span>
                    </div>
                    <p className="max-w-md text-sm leading-relaxed">
                        "No Food Should Go To Waste While Someone Sleeps Hungry." <br />
                        Our mission is to connect surplus food from donors to those who need it the most, reducing food waste and hunger simultaneously across India.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-white font-semibold font-outfit text-lg">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-saffron transition-colors">Home</Link></li>
                        <li><Link to="/about" className="hover:text-saffron transition-colors">About Impact</Link></li>
                        <li><Link to="/login" className="hover:text-saffron transition-colors">Donate Food</Link></li>
                        <li><Link to="/register?role=ngo" className="hover:text-saffron transition-colors">Register NGO</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-white font-semibold font-outfit text-lg">Contact</h4>
                    <ul className="space-y-2 text-sm">
                        <li>support@annadata.in</li>
                        <li>+91 98765 43210</li>
                        <li>New Delhi, India</li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-center">
                <p>&copy; {new Date().getFullYear()} ANNADATA Food Sharing Network. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
