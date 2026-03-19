import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-earthyBlonde">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-saffron border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to user's own dashboard if they try to access a wrong role's page
        if (user.role === 'admin') return <Navigate to="/admin" replace />;
        if (user.role === 'ngo') return <Navigate to="/ngo" replace />;
        return <Navigate to="/donor" replace />;
    }

    return children;
};

export default ProtectedRoute;
