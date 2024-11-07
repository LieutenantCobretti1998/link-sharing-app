import {AuthContext} from "../CustomLogic/AuthProvider.jsx";
import {Navigate} from "react-router-dom";
import {useContext} from "react";


// eslint-disable-next-line react/prop-types
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