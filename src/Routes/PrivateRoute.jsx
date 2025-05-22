import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Providers/AuthProvider';
import LoadingSpinner from '../Components/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;