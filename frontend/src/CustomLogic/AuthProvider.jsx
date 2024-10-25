import {createContext, useEffect, useState} from "react";
import {checkAuthStatus} from "../API/Login.js";
import {useNavigation} from "react-router-dom";
import useHandleSessionExpired from "./UseHandleSessionExpired.js";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [authStatus, setAuthStatus] = useState({
        authenticated: null,
    });
    const refreshAuthStatus = () => {
            checkAuthStatus()
                .then(data => {
                    setAuthStatus({
                        authenticated: data.authenticated,
                    });
                })
                .catch(() => {
                    setAuthStatus({
                        authenticated: false,
                    });
                });
    }
    useEffect(() => {
        refreshAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{authStatus, setAuthStatus, refreshAuthStatus}}>
            {children}
        </AuthContext.Provider>
    );
}
