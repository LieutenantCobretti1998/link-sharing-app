import {createContext, useEffect, useState} from "react";
import {checkAuthStatus} from "../API/Login.js";


export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [authStatus, setAuthStatus] = useState({
        authenticated: null,
    });
    const refreshAuthStatus = () => {
            checkAuthStatus()
                .then(data => {
                    console.log(data)
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
