"use strict";

import {getCSRFToken} from "../Helpers/AuthHelpers.js";
import {refreshAccessToken} from "./Login.js";

export const createProfile = async(profileName) => {
    const response = await fetch("/api/create_profile", {
        method: "POST",
        body: JSON.stringify({
            new_profile_name: profileName,
        }),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': getCSRFToken()

        },
    });

    const responseData = await response.json();
        if (!response.ok) {
            if (response.status === 401) {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
            } else {
                throw new Error('Session expired. Please log in again.');
            }
        }
             throw new Error(responseData.message);
        }
    return responseData;
};

export const allProfiles = async() => {
    const response = await fetch(`/api/related-profiles`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        },
        credentials: "include"
    });
    const responseData = await response.json();
        if (!response.ok) {
            if (response.status === 401) {
                const refreshed = await refreshAccessToken();
                if (refreshed) {
                } else {
                    throw new Error('Session expired. Please log in again.');
                }
        }
             throw new Error(responseData.message);
        }
    return responseData;
}

export const chosenProfile = async (profileName) => {
    const response = await fetch(`/api/choose_profile/${profileName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        },
        credentials: "include"
    });
    const responseData = await response.json();
        if (!response.ok) {
            if (response.status === 401) {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
            } else {
                throw new Error('Session expired. Please log in again.');
            }
        }
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
     const response = await fetch(`/api/change-profile-name/${parsedProfileData.profile_id}/${parsedProfileData.profile_name}`, {
         method: "PATCH",
         body: JSON.stringify({"new_profile_name": new_profile_name}),
         headers: {
             "Content-Type": "application/json",
             'X-CSRF-TOKEN': getCSRFToken()
        },
        credentials: "include"
    });
    const responseData = await response.json();
    if (!response.ok) {
        if (response.status === 401) {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
            } else {
                throw new Error('Session expired. Please log in again.');
            }
        }
        throw new Error(responseData.error);
    }
    return responseData;
};

export const deleteProfile = async() => {
    const profile_data = localStorage.getItem("current-profile");
    const parsedProfileData = JSON.parse(profile_data);
    if (!parsedProfileData) {
        throw new Error("Profile is missed!");
    }
     const response = await fetch(`/api/delete-profile/${parsedProfileData.profile_id}/${parsedProfileData.profile_name}`, {
         method: "DELETE",
         headers: {
             'X-CSRF-TOKEN': getCSRFToken()
         },
         credentials: "include"
    });
    const responseData = await response.json();
    if (!response.ok) {
        if (response.status === 401) {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
            } else {
                throw new Error('Session expired. Please log in again.');
            }
        }
        throw new Error(responseData.error);
    }
    return responseData;
}