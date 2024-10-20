import {AuthContext} from "../CustomLogic/AuthProvider.jsx";
import {Navigate, useLocation} from "react-router-dom";
import {useContext} from "react";
import {ProfileContext} from "../CustomLogic/ProfileProvider.jsx";

function ProtectedRoute({children}) {
    const {authStatus} = useContext(AuthContext);
    const {chosenProfile} = useContext(ProfileContext);
    const location = useLocation();
    console.log(authStatus);
    console.log(chosenProfile)
    switch (authStatus.authenticated ) {
        case null:
            return;
        case false:
            return <Navigate to="/login" replace />;
        case true:
            // if (!chosenProfile && location.pathname !== "/profiles") {
            //     return <Navigate to="/profiles" replace />;
            // }
            return children

    }
}

export default ProtectedRoute;