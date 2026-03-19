import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Activity, Users, PackageOpen, CheckCircle, AlertTriangle, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({});
    const [users, setUsers] = useState([]);
    const [donations, setDonations] = useState([]);
    const [requests, setRequests] = useState([]);

    const fetchData = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const [statsRes, usersRes, donationsRes, requestsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/stats', config),
                axios.get('http://localhost:5000/api/admin/users', config),
                axios.get('http://localhost:5000/api/admin/donations', config),
                axios.get('http://localhost:5000/api/admin/requests', config)
            ]);
            setStats(statsRes.data);
            setUsers(usersRes.data);
            setDonations(donationsRes.data);
            setRequests(requestsRes.data);
        } catch (error) {
            console.error("Admin fetch error", error);
        }
    };

    useEffect(() => {
        if (user && user.role === 'admin') fetchData();
    }, [user]);

    const handleNgoApproval = async (id, isApproved) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`http://localhost:5000/api/admin/users/${id}/approve`, { isApproved }, config);
            fetchData();
        } catch (e) {
            alert('Error updating NGO');
        }
    };

    const handleDonationApproval = async (id, status) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`http://localhost:5000/api/admin/donations/${id}/approve`, { status }, config);
            fetchData();
        } catch (e) {
            alert('Error verifying donation');
        }
    };

    const assignNgo = async (requestId) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`http://localhost:5000/api/admin/requests/${requestId}/assign`, {}, config);
            fetchData();
        } catch (e) {
            alert('Error assigning NGO');
        }
    };

    const deleteDonation = async (id) => {
        if (!window.confirm('Are you sure you want to remove this donation?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/admin/donations/${id}`, config);
            fetchData();
        } catch (e) {
            alert('Error deleting donation');
        }
    };

    const expiredDonations = donations.filter(d => new Date(d.expiryTime) < new Date() && d.status !== 'completed');

    if (user?.role !== 'admin') return <div className="p-8 text-center bg-red-50 text-red-600 font-bold">Access Denied</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
            <h1 className="text-3xl font-bold font-outfit text-gray-900 mb-8">Admin Control Panel</h1>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="glassmorphism p-6 rounded-2xl border-t-4 border-blue-500">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-500 font-medium">Total Users</p>
                        <Users className="text-blue-500 w-5 h-5" />
                    </div>
                    <p className="text-3xl font-bold">{stats.totalDonors + stats.totalNGOs || 0}</p>
                </div>
                <div className="glassmorphism p-6 rounded-2xl border-t-4 border-saffron">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-500 font-medium">Total Donations</p>
                        <PackageOpen className="text-saffron w-5 h-5" />
                    </div>
                    <p className="text-3xl font-bold">{stats.totalDonations || 0}</p>
                </div>
                <div className="glassmorphism p-6 rounded-2xl border-t-4 border-indianGreen">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-500 font-medium">Completed</p>
                        <CheckCircle className="text-indianGreen w-5 h-5" />
                    </div>
                    <p className="text-3xl font-bold">{stats.completedDonations || 0}</p>
                </div>
                <div className="glassmorphism p-6 rounded-2xl border-t-4 border-indigo-500">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-500 font-medium">Meals Served</p>
                        <Activity className="text-indigo-500 w-5 h-5" />
                    </div>
                    <p className="text-3xl font-bold">{stats.mealsServed || 0}</p>
                </div>
            </div>

            {/* Expired Donations Alert */}
            {expiredDonations.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex items-start space-x-4">
                    <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-red-800">⚠️ {expiredDonations.length} Expired Donation{expiredDonations.length > 1 ? 's' : ''} Found</h3>
                        <p className="text-sm text-red-600 mb-4">These donations have passed their expiry time and should be removed to keep the platform clean.</p>
                        <div className="space-y-3">
                            {expiredDonations.map(d => (
                                <div key={d._id} className="bg-white p-4 rounded-xl flex justify-between items-center border border-red-100">
                                    <div>
                                        <p className="font-bold text-gray-800">{d.foodType} <span className="text-xs font-normal text-gray-500">({d.quantity})</span></p>
                                        <p className="text-xs text-red-500">Expired: {new Date(d.expiryTime).toLocaleString()} • By {d.donor?.name}</p>
                                    </div>
                                    <button onClick={() => deleteDonation(d._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-1 transition">
                                        <Trash2 className="w-4 h-4" />
                                        <span>Remove</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* NGO Approvals */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-4 font-outfit border-b pb-2">Pending NGO Verification</h2>
                    <ul className="divide-y">
                        {users.filter(u => u.role === 'ngo' && !u.isApproved).map(ngo => (
                            <li key={ngo._id} className="py-4 flex justify-between items-center">
                                <div>
                                    <p className="font-bold">{ngo.name}</p>
                                    <p className="text-xs text-gray-500">Cert: {ngo.ngoCertificate} • {ngo.city}</p>
                                </div>
                                <div className="space-x-2">
                                    <button onClick={() => handleNgoApproval(ngo._id, true)} className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-medium hover:bg-green-200">Verify</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Donation Approvals */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-4 font-outfit border-b pb-2">Pending Donations to Approve</h2>
                    <ul className="divide-y">
                        {donations.filter(d => d.status === 'pending').map(don => (
                            <li key={don._id} className="py-4 flex justify-between items-center">
                                <div>
                                    <p className="font-bold">{don.foodType} <span className="text-xs font-normal text-gray-500">({don.quantity})</span></p>
                                    <p className="text-xs text-gray-500">By {don.donor?.name} • Expires: {new Date(don.expiryTime).toLocaleString()}</p>
                                </div>
                                <div className="space-x-2">
                                    <button onClick={() => handleDonationApproval(don._id, 'approved')} className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium hover:bg-blue-200">Approve</button>
                                    <button onClick={() => handleDonationApproval(don._id, 'rejected')} className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-medium hover:bg-red-200">Reject</button>
                                    <button onClick={() => deleteDonation(don._id)} className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-200"><Trash2 className="w-4 h-4 inline" /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Assign NGOs to Donations */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4 font-outfit border-b pb-2">NGO Pickup Requests</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600">
                                <tr>
                                    <th className="p-3">Donation</th>
                                    <th className="p-3">NGO Requested</th>
                                    <th className="p-3">Address</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {requests.filter(r => r.status === 'pending').map(req => (
                                    <tr key={req._id}>
                                        <td className="p-3 font-medium">{req.donation?.foodType}</td>
                                        <td className="p-3">{req.ngo?.name}</td>
                                        <td className="p-3">{req.donation?.address}</td>
                                        <td className="p-3"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold">Pending</span></td>
                                        <td className="p-3">
                                            <button onClick={() => assignNgo(req._id)} className="bg-indianGreen text-white px-4 py-1.5 rounded-full font-medium hover:bg-green-700">Assign NGO</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
