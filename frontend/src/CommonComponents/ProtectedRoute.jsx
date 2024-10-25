import {AuthContext} from "../CustomLogic/AuthProvider.jsx";
import {Navigate, useLocation} from "react-router-dom";
import {useContext} from "react";
import {ProfileContext} from "../CustomLogic/ProfileProvider.jsx";

function ProtectedRoute({children}) {
    const {authStatus} = useContext(AuthContext);
    switch (authStatus.authenticated ) {
        case null:
            return;
        case false:
            return <Navigate to="/login" replace />;
        case true:
            return children;

    }
}

export default ProtectedRoute;