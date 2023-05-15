import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({children}) => {
    const { user } = useAuthContext();

    if (!user.email){
        return <Navigate to="/login" replace />
    }

    return (
        <>
            {children}
        </>
    );
};

export default PrivateRoute;