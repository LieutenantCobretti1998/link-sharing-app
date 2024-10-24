"use strict";

export const createProfile = async(profileName) => {
    const token = localStorage.getItem("access-token");
    if (!token) {
        throw new Error("User is not authenticated");
    }
    const response = await fetch("/api/create_profile", {
        method: "POST",
        body: JSON.stringify({
            new_profile_name: profileName,
        }),
        headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
        },
    });

    const responseData = await response.json();
        if (!response.ok) {
             throw new Error(responseData.message);
        }
    return responseData;
};

export const chosenProfile = async (profileName) => {
    const token = localStorage.getItem("access-token");
    if (!token) {
        throw new Error("User is not authenticated");
    }
    const response = await fetch(`/api/choose_profile/${profileName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
        },
    })
    const responseData = await response.json();
        if (!response.ok) {
             throw new Error(responseData.message);
        }
    return responseData;
};

export const updateProfileName = async(new_profile_name) => {
    const profile_data = localStorage.getItem("current-profile");
    const parsedProfileData = JSON.parse(profile_data);
    if (!parsedProfileData) {
        throw new Error("Profile is missed!");
    }
    const token = localStorage.getItem("access-token");
    if (!token) {
        throw new Error("User is not authenticated");
    }
     const response = await fetch(`/api/change-profile-name/${parsedProfileData.profile_id}/${parsedProfileData.profile_name}`, {
         method: "PATCH",
         body: JSON.stringify({"new_profile_name": new_profile_name}),
         headers: {
             "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const responseData = await response.json();
    if (!response.ok) {
        console.log(responseData)
        throw new Error(responseData.error);
    }
    return responseData;
};