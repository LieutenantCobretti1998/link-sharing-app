import {AuthContext} from "../CustomLogic/AuthProvider.jsx";
import {Navigate, useLocation} from "react-router-dom";
import {useContext} from "react";
import {ProfileContext} from "../CustomLogic/ProfileProvider.jsx";


// eslint-disable-next-line react/prop-types
function ProtectedRoute({children}) {
    const {authStatus} = useContext(AuthContext);
    const location = useLocation();
    const { chosenProfile } = useContext(ProfileContext);
    switch (authStatus.authenticated ) {
        case null:
            return;
        case false:
            return <Navigate to="/login" replace />;
        case true:
            if (!chosenProfile && (location.pathname !== "/profiles" && location.pathname !== "/login")) {
                return <Navigate to="/login" replace />;
            }
            return children;

    }
}

export default ProtectedRoute;