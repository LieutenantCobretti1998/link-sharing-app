"use strict";

import {getRefreshCSRFToken} from "../Helpers/AuthHelpers.js";

export const createUser = async (username, password, email) => {
    const response = await fetch("/api/register", {
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

export const updatePassword = async(token, new_password) => {
    const response  = await fetch(`/api/reset-password/${token}`, {
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
        const response = await fetch("/api/login", {
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
        return responseData;
};

export const logoutUser = async () => {
    const response = await fetch("/api/logout", {
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
    const response = await fetch("/api/forgot-password", {
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
    const response = await fetch("/api/token/refresh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': getRefreshCSRFToken(),
        },
        credentials: "include"
    });
    return response.ok;
}

export const checkAuthStatus = async () => {
    const response = await fetch("/api/auth_status", {
        method: "GET",
        credentials: "include",
    });
    if (response.ok) {
        return await response.json();
    } else {
        if (response.status === 401) {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
            } else {
                throw new Error('Session expired. Please log in again.');
            }
        }
        throw new Error("Failed to check user's authentication");
    }
};
