import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./AuthProvider.jsx";


function UseHandleSessionExpired() {
    const { setAuthStatus } = useContext(AuthContext);
    const navigate = useNavigate();

    return () => {
        setAuthStatus({
            authenticated: null,
        });
        navigate("/login", {replace: true});
    };
}

export default UseHandleSessionExpired;