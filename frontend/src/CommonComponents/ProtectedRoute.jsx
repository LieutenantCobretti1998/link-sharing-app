import {AuthContext} from "../CustomLogic/AuthProvider.jsx";
import {Navigate} from "react-router-dom";
import {useContext} from "react";

function ProtectedRoute({children}) {
    const {authStatus} = useContext(AuthContext);
    switch (authStatus.authenticated ) {
        case null:
            return;
        case false:
            return <Navigate to="/login" replace />;
        case true:
            return children

    }
}

export default ProtectedRoute;