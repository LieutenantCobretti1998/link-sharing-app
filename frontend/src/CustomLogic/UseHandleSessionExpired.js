import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./AuthProvider.jsx";
import {useQueryClient} from "@tanstack/react-query";
import {ProfileContext} from "./ProfileProvider.jsx";


function UseHandleSessionExpired() {
    const { setAuthStatus } = useContext(AuthContext);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {setChosenProfile} = useContext(ProfileContext);
    return () => {
         setAuthStatus({
            authenticated: null,
         });
         queryClient.clear();
         setChosenProfile(null);
        navigate("/login", {replace: true});
    };
}

export default UseHandleSessionExpired;