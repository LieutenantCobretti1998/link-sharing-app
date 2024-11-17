"use strict";

import {getRefreshCSRFToken} from "../Helpers/AuthHelpers.js";
import {VITE_BACKEND_API_BASE_URL_DEV, VITE_BACKEND_API_BASE_URL_PROD} from "./API_ROUTES.js";

const mode = import.meta.env.MODE;
const BACKEND_API_BASE_URL = mode === "development" ? VITE_BACKEND_API_BASE_URL_DEV : VITE_BACKEND_API_BASE_URL_PROD;

export const createUser = async (username, password, email) => {
    const response = await fetch(`${BACKEND_API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        })
    });
    const responseData = await response.json();
    if (!response.ok) {
         throw new Error(responseData.message);
    }
    return responseData;
};

export const resendEmail = async (email) => {
    const response = await fetch(`${BACKEND_API_BASE_URL}/send_email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
        })
    });
    const responseData = await response.json();
    if (!response.ok) {
         throw new Error(responseData.message);
    }
    return responseData;
};

export const submitEmail = async (token) => {
    const response  = await fetch(`${BACKEND_API_BASE_URL}/verify_email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: token,
        })
    })
    const responseData = await response.json();
    if (!response.ok) {
         throw new Error(responseData.message);
    }
    return responseData;
};

export const checkToken = async (token) => {
    return await fetch(`${BACKEND_API_BASE_URL}/check_token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: token,
        })
    });
}

export const updatePassword = async(token, new_password) => {
    const response  = await fetch(`${BACKEND_API_BASE_URL}/reset-password/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            updated_password: new_password,
        })
    })
    const responseData = await response.json();
    if (!response.ok) {
         throw new Error(responseData.message);
    }
    return responseData;
}

export const loginUser = async (email, password) => {
        const response = await fetch(`${BACKEND_API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                 "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const responseData = await response.json();
        if (!response.ok) {
             throw new Error(responseData.message);
        }
        localStorage.setItem("csrf_access_token", responseData.csrf_tokens.access_token);
        localStorage.setItem("csrf_refresh_token", responseData.csrf_tokens.refresh_token);
        return responseData;
};

export const logoutUser = async () => {
    const response = await fetch(`${BACKEND_API_BASE_URL}/logout`, {
            method: "POST",
            headers: {
                 "X-CSRF-TOKEN": getRefreshCSRFToken()
            },
            credentials: "include",
        });
        const responseData = await response.json();
        if (!response.ok) {
             throw new Error(responseData.message);
        }
        return responseData;
};

export const forgotPassword = async (email) => {
    const response = await fetch(`${BACKEND_API_BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
                 "Content-Type": "application/json"
            },
        body: JSON.stringify({
            email: email,
        })
    })
    const responseData = await response.json();
        if (!response.ok) {
             throw new Error(responseData.message);
        }
        return responseData;
}

export async function refreshAccessToken() {
    const response = await fetch(`${BACKEND_API_BASE_URL}/token/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': getRefreshCSRFToken(),
        },
        credentials: "include"
    });
    const responseData = await response.json();
    localStorage.setItem("csrf_access_token", responseData.access_csrf_token);
    return response.ok;
}

export const checkAuthStatus = async () => {
    const response = await fetch(`${BACKEND_API_BASE_URL}/auth_status`, {
        method: "GET",
        credentials: "include",
    });
    if (response.ok) {
        return await response.json();
    } else {
        if (response.status === 401) {
            const refreshed = await refreshAccessToken();
                if (refreshed) {
                    const retryResponse = await fetch(`${BACKEND_API_BASE_URL}/auth_status`, {
                    method: "GET",
                    credentials: "include",
                });
                if (retryResponse.ok) {
                    return retryResponse.json();
                }
            } else {
                throw new Error('Session expired. Please log in again.');
            }
        }
        throw new Error("Failed to check user's authentication");
    }
};
