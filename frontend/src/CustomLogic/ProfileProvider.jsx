import {createContext, useEffect, useState} from "react";

export const ProfileContext = createContext();

export function ProfileProvider({children}) {
    const [chosenProfile, setChosenProfile] = useState(() => {
        const storedProfile = localStorage.getItem("current-profile");
        return storedProfile ? storedProfile : null;
    });

    useEffect(() => {
        if (chosenProfile) {
            localStorage.setItem("current-profile", chosenProfile);
        } else {
            localStorage.removeItem("current-profile");
        }
    }, [chosenProfile]);
    return (
        <ProfileContext.Provider value={{ chosenProfile, setChosenProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}