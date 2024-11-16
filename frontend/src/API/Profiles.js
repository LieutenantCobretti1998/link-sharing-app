"use strict";

import {getCSRFToken} from "../Helpers/AuthHelpers.js";
import {refreshAccessToken} from "./Login.js";
import {VITE_BACKEND_API_BASE_URL_DEV, VITE_BACKEND_API_BASE_URL_PROD} from "./API_ROUTES.js";

const mode = import.meta.env.MODE;
const BACKEND_API_BASE_URL = mode === "development" ? VITE_BACKEND_API_BASE_URL_DEV : VITE_BACKEND_API_BASE_URL_PROD;

export const createProfile = async(profileName) => {
    const response = await fetch(`${BACKEND_API_BASE_URL}/create_profile`, {
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
                const retryResponse = await fetch(`${BACKEND_API_BASE_URL}/create_profile`, {
                         method: "POST",
                         body: JSON.stringify({
                            new_profile_name: profileName,
                         }),
                         headers: {
                            "Content-Type": "application/json",
                            'X-CSRF-TOKEN': getCSRFToken()

                         },
                      });

                   const retryData = await retryResponse.json();
                   if (!retryResponse.ok) {
                    const errorMessage = retryData?.message || "Error fetching links after token refresh.";
                    throw new Error(errorMessage);
                   }
                   return retryData; // Return the data from the retried request
            } else {
                throw new Error('Session expired. Please log in again.');
            }
        }
             throw new Error(responseData.message);
        }
    return responseData;
};

export const allProfiles = async() => {
    const response = await fetch(`${BACKEND_API_BASE_URL}/related-profiles`, {
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
                    const retryResponse = await fetch(`${BACKEND_API_BASE_URL}/related-profiles`, {
                         method: "GET",
                         headers: {
                            "Content-Type": "application/json",

                         },
                         credentials: "include"
                      });
                   const retryData = await retryResponse.json();
                   if (!retryResponse.ok) {
                    const errorMessage = retryData?.message || "Error fetching links after token refresh.";
                    throw new Error(errorMessage);
                   }
                   return retryData; // Return the data from the retried request
                } else {
                    throw new Error('Session expired. Please log in again.');
                }
        }
             throw new Error(responseData.message);
        }
    return responseData;
}

export const chosenProfile = async (profileName) => {
    const response = await fetch(`${BACKEND_API_BASE_URL}/choose_profile/${profileName}`, {
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
                    const retryResponse = await fetch(`${BACKEND_API_BASE_URL}/choose_profile/${profileName}`, {
                         method: "GET",
                         headers: {
                            "Content-Type": "application/json",

                         },
                         credentials: "include"
                      });
                   const retryData = await retryResponse.json();
                   if (!retryResponse.ok) {
                    const errorMessage = retryData?.message || "Error fetching links after token refresh.";
                    throw new Error(errorMessage);
                   }
                   return retryData; // Return the data from the retried request
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
     const response = await fetch(`${BACKEND_API_BASE_URL}/change-profile-name/${parsedProfileData.profile_id}/${parsedProfileData.profile_name}`, {
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
                const retryResponse = await fetch(`${BACKEND_API_BASE_URL}/change-profile-name/${parsedProfileData.profile_id}/${parsedProfileData.profile_name}`, {
                         method: "PATCH",
                         body: JSON.stringify({"new_profile_name": new_profile_name}),
                         headers: {
                             "Content-Type": "application/json",
                             'X-CSRF-TOKEN': getCSRFToken()
                        },
                        credentials: "include"
                      });
                   const retryData = await retryResponse.json();
                   if (!retryResponse.ok) {
                    const errorMessage = retryData?.error || "Error fetching links after token refresh.";
                    throw new Error(errorMessage);
                   }
                   return retryData; // Return the data from the retried request
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
     const response = await fetch(`${BACKEND_API_BASE_URL}/delete-profile/${parsedProfileData.profile_id}/${parsedProfileData.profile_name}`, {
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
                const retryResponse = await fetch(`${BACKEND_API_BASE_URL}/delete-profile/${parsedProfileData.profile_id}/${parsedProfileData.profile_name}`, {
                         method: "DELETE",
                         headers: {
                             'X-CSRF-TOKEN': getCSRFToken()
                         },
                         credentials: "include"
                      });
                   const retryData = await retryResponse.json();
                   if (!retryResponse.ok) {
                    const errorMessage = retryData?.error || "Error fetching links after token refresh.";
                    throw new Error(errorMessage);
                   }
                   return retryData; // Return the data from the retried request
            } else {
                throw new Error('Session expired. Please log in again.');
            }
        }
        throw new Error(responseData.error);
    }
    return responseData;
}