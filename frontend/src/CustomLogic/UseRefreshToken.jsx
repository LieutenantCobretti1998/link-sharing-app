import {useContext} from 'react';
import {AuthContext} from "./AuthProvider.jsx";

function UseRefreshToken() {
    const {refreshStatus} = useContext(AuthContext);
    return refreshStatus();
}

export default UseRefreshToken;