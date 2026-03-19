import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { PlusCircle, Clock, CheckCircle, Package, MapPin } from 'lucide-react';

const DonorDashboard = () => {
    const { user } = useContext(AuthContext);
    const [donations, setDonations] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        foodType: '', quantity: '', expiryTime: '',
        address: user?.address || '', city: user?.city || '',
        description: '', image: ''
    });

    const fetchDonations = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/donations/my-donations', config);
            setDonations(data);
        } catch (error) {
            console.error("Error fetching donations", error);
        }
    };

    useEffect(() => {
        if (user) fetchDonations();
    }, [user]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('http://localhost:5000/api/donations', formData, config);
            setShowForm(false);
            fetchDonations();
            setFormData({ foodType: '', quantity: '', expiryTime: '', address: user.address, city: user.city, description: '', image: '' });
        } catch (err) {
            alert(err.response?.data?.message || 'Error creating donation');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold font-outfit text-gray-900">Donor Dashboard</h1>
                    <p className="text-gray-600">Welcome, {user?.name}</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-saffron text-white px-6 py-2 rounded-full font-medium shadow-lg hover:bg-saffronDark flex items-center space-x-2 transition"
                >
                    <PlusCircle className="w-5 h-5" />
                    <span>Donate Food</span>
                </button>
            </div>

            {showForm && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glassmorphism p-8 rounded-3xl mb-10">
                    <h2 className="text-xl font-bold mb-6 font-outfit">Create Donation</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input name="foodType" placeholder="Food Type (e.g. Cooked Rice, Raw Veggies)" required value={formData.foodType} onChange={handleChange} className="p-3 rounded-xl border border-gray-200" />
                        <input name="quantity" placeholder="Quantity (e.g. For 50 people, 10 Kg)" required value={formData.quantity} onChange={handleChange} className="p-3 rounded-xl border border-gray-200" />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Expiry Date & Time</label>
                            <input name="expiryTime" type="datetime-local" required value={formData.expiryTime} onChange={handleChange} className="p-3 rounded-xl border border-gray-200 w-full" />
                        </div>
                        <input name="city" placeholder="City" required value={formData.city} onChange={handleChange} className="p-3 rounded-xl border border-gray-200" />
                        <input name="address" placeholder="Pickup Address" required value={formData.address} onChange={handleChange} className="p-3 rounded-xl border border-gray-200 md:col-span-2" />
                        <textarea name="description" placeholder="Brief Description (e.g. fresh from wedding party last night)" required value={formData.description} onChange={handleChange} className="p-3 rounded-xl border border-gray-200 md:col-span-2" rows="3"></textarea>
                        <button type="submit" className="md:col-span-2 bg-saffron text-white py-3 rounded-xl font-bold shadow-md hover:bg-saffronDark">Submit Donation</button>
                    </form>
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donations.map((d) => (
                    <motion.div whileHover={{ y: -5 }} key={d._id} className="glassmorphism p-6 rounded-2xl relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <span className="font-bold text-lg text-gray-800">{d.foodType}</span>
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${d.status === 'completed' ? 'bg-green-100 text-green-700' : d.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : d.status === 'approved' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                {d.status.toUpperCase()}
                            </span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600 mb-6">
                            <p className="flex items-center space-x-2"><Package className="w-4 h-4 text-saffron" /> <span>{d.quantity}</span></p>
                            <p className="flex items-center space-x-2"><Clock className="w-4 h-4 text-saffron" /> <span>Expires: {new Date(d.expiryTime).toLocaleString()}</span></p>
                            <p className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-saffron" /> <span>{d.address}, {d.city}</span></p>
                        </div>
                        {d.status === 'completed' && <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full blur-xl"></div>}
                    </motion.div>
                ))}
                {donations.length === 0 && <p className="text-gray-500 italic col-span-3">No donations made yet. Your impact starts here!</p>}
            </div>
        </div>
    );
};

export default DonorDashboard;
