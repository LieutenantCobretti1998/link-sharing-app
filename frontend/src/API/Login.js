"use strict";

export const createUser = async (username, password, email) => {
    const response = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
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

export const loginUser = async (email, password) => {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                 "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const responseData = await response.json();
        if (!response.ok) {
             throw new Error(responseData.message);
        }
        localStorage.setItem("access-token", responseData.access_token);
        return responseData;
};

export const checkAuthStatus = async () => {
    const token = localStorage.getItem("access-token");
    if (!token) {
        throw new Error("User is not authenticated");
    }
    const response = await fetch("/api/auth_status", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (response.ok) {
        const responsedData = await response.json()
        return responsedData;
    } else {
        throw new Error("Failed to check user's authentication");
    }
};
