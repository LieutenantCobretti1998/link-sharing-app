import {AuthContext} from "../CustomLogic/AuthProvider.jsx";
import {Navigate} from "react-router-dom";
import {useContext} from "react";

function ProtectedRoute({children}) {
    const {authStatus} = useContext(AuthContext);
    console.log(authStatus.authenticated)
    if (authStatus.authenticated === false) {
        return <Navigate to="/login" replace />
    }
    return children;
}

export default ProtectedRoute;