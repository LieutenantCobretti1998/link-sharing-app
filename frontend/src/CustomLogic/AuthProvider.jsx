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
    const refreshAuthStatus = () => {
        const token = localStorage.getItem("access-token");
        const profile_data = localStorage.getItem("current-profile");
        if(!token || !profile_data) {
             setAuthStatus({
                authenticated: false,
                userCredentials: {
                    email: null,
                    profiles: null
                }
            });
        } else {
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
        }
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
