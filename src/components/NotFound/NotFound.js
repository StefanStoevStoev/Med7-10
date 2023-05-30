import React, {useContext} from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const NotFound = () => {
    const { papa } = useContext(AuthContext);
    return (
        <h2 className="SS">404 Няма връзка със сървъра {papa}</h2>
    );
};

export default NotFound;