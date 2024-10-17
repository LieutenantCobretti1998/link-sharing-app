import {createContext, useEffect, useState} from "react";
import {checkAuthStatus} from "../API/Login.js";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [authStatus, setAuthStatus] = useState({
        authenticated: null,
        userCredentials: {
            "email": null,
            "profiles": null
        }
    });

    useEffect(() => {
        checkAuthStatus()
            .then(data => {
                setAuthStatus({
                    authenticated: data.authenticated,
                    userCredentials: data.user
                });
            })
            .catch(() => {
                setAuthStatus({
                    authenticated: false,
                    userCredentials: {
                        "email": null,
                        "profiles": null
                    }
                });
            });
    }, []);

    return (
        <AuthContext.Provider value={{authStatus, setAuthStatus}}>
            {children}
        </AuthContext.Provider>
    );
}
