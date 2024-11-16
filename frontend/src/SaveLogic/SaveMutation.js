"use strict";

import {getCSRFToken} from "../Helpers/AuthHelpers.js";
import {refreshAccessToken} from "../API/Login.js";
import {VITE_BACKEND_API_BASE_URL_DEV, VITE_BACKEND_API_BASE_URL_PROD} from "../API/API_ROUTES.js";

const mode = import.meta.env.MODE;
const BACKEND_API_BASE_URL = mode === "development" ? VITE_BACKEND_API_BASE_URL_DEV : VITE_BACKEND_API_BASE_URL_PROD;

const saveLink = async (newLinkData) => {
    const {showModal, ...rest} = newLinkData;
    const profile_data = localStorage.getItem("current-profile");
    const parsedProfileData = JSON.parse(profile_data);
    if (!parsedProfileData) {
        throw new Error("Profile is missed!");
    }
    const response = await fetch(`${BACKEND_API_BASE_URL}/save_link/${parsedProfileData.profile_id}`, {
        method: "POST",
        body: JSON.stringify(rest),
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": getCSRFToken()
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

export default saveLink;