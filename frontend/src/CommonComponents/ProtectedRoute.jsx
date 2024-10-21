import {AuthContext} from "../CustomLogic/AuthProvider.jsx";
import {Navigate, useLocation} from "react-router-dom";
import {useContext} from "react";
import {ProfileContext} from "../CustomLogic/ProfileProvider.jsx";

function ProtectedRoute({children}) {
    const {authStatus} = useContext(AuthContext);
    const {chosenProfile} = useContext(ProfileContext);
    const tokenIsExist = localStorage.getItem("access-token");
    const profileIsExist = localStorage.getItem("current-profile");
    switch (authStatus.authenticated ) {
        case null:
            return;
        case false:
            return <Navigate to="/login" replace />;
        case true:
            if (!tokenIsExist) {
                return <Navigate to="/login" replace />;
            }
            return children

    }
}

export default ProtectedRoute;