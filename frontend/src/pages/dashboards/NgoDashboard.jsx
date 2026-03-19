import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MapPin, Package, Clock, Phone, AlertCircle } from 'lucide-react';

const NgoDashboard = () => {
    const { user } = useContext(AuthContext);
    const [donations, setDonations] = useState([]);
    const [requests, setRequests] = useState([]);

    const fetchData = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const [availableRes, requestsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/donations/available', config),
                axios.get('http://localhost:5000/api/donations/my-requests', config)
            ]);
            setDonations(availableRes.data);
            setRequests(requestsRes.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        if (user) fetchData();
    }, [user]);

    const requestPickup = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`http://localhost:5000/api/donations/${id}/request`, { requestMessage: "We can pick this up." }, config);
            alert("Pickup requested successfully. Wait for admin approval.");
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error requesting pickup');
        }
    };

    const markCompleted = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`http://localhost:5000/api/donations/${id}/complete`, {}, config);
            alert("Donation marked as completed!");
            fetchData();
        } catch (error) {
            alert("Error completing pickup");
        }
    }

    if (!user?.isApproved) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
                <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Account Pending Verification</h2>
                <p className="text-gray-600 mt-2">Your NGO account is currently waiting for admin approval.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
            <h1 className="text-3xl font-bold font-outfit text-gray-900 mb-8">NGO Community Dashboard</h1>

            <div className="mb-12">
                <h2 className="text-2xl font-bold font-outfit mb-6 text-gray-800">Available Foods Nearby</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {donations.map((d) => {
                        const isExpired = new Date(d.expiryTime) < new Date();
                        return (
                            <motion.div whileHover={{ y: -5 }} key={d._id} className={`glassmorphism p-6 rounded-2xl border ${isExpired ? 'border-red-300 bg-red-50/30' : 'border-indianGreen/20'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg">{d.foodType}</h3>
                                    {isExpired && (
                                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700 animate-pulse">EXPIRED</span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mb-4 italic">"{d.description}"</p>
                                <div className="space-y-2 text-sm text-gray-600 mb-6">
                                    <p className="flex items-center space-x-2"><Package className="w-4 h-4 text-indianGreen" /> <span>{d.quantity}</span></p>
                                    <p className="flex items-center space-x-2"><Clock className="w-4 h-4 text-indianGreen" /> <span className={`font-medium ${isExpired ? 'text-red-600' : 'text-red-500'}`}>{isExpired ? '⚠️ Expired: ' : 'Exp: '}{new Date(d.expiryTime).toLocaleString()}</span></p>
                                    <p className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-indianGreen" /> <span>{d.city}</span></p>
                                    <p className="flex items-center space-x-2"><Phone className="w-4 h-4 text-indianGreen" /> <span>Donated by: {d.donor?.name}</span></p>
                                </div>
                                {isExpired ? (
                                    <button disabled className="w-full bg-gray-200 text-gray-500 font-semibold py-2 rounded-xl cursor-not-allowed">
                                        Expired — Cannot Request
                                    </button>
                                ) : (
                                    <button onClick={() => requestPickup(d._id)} className="w-full bg-indianGreen/10 text-indianGreen hover:bg-indianGreen hover:text-white font-semibold py-2 rounded-xl transition-all">
                                        Request Pickup
                                    </button>
                                )}
                            </motion.div>
                        );
                    })}
                    {donations.length === 0 && <p className="text-gray-500 italic">No available donations currently.</p>}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-outfit mb-6 text-gray-800">Your Pickup Requests</h2>
                <div className="space-y-4">
                    {requests.map((r) => (
                        <div key={r._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center">
                            <div>
                                <p className="font-bold text-gray-800">{r.donation?.foodType} - {r.donation?.quantity}</p>
                                <p className="text-sm text-gray-500 mt-1">Requested on: {new Date(r.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center space-x-4 mt-4 md:mt-0">
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${r.status === 'approved' ? 'bg-green-100 text-green-700' : r.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {r.status.toUpperCase()}
                                </span>
                                {r.status === 'approved' && r.donation?.status === 'assigned' && (
                                    <button onClick={() => markCompleted(r.donation._id)} className="bg-indianGreen text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-green-700 transition">
                                        Mark Collected
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {requests.length === 0 && <p className="text-gray-500 italic">You haven't requested any pickups yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default NgoDashboard;
