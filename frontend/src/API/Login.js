"use strict";

export const createUser = async (username, password, email) => {
    const response = await fetch("http://localhost:5000/api/register", {
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
        const response = await fetch("http://localhost:5000/api/login", {
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
        return responseData;
};

export const checkAuthStatus = async () => {
    const response = await fetch("http://localhost:5000/api/auth_status", {
        method: "GET",
        credentials: "include"
    });
    if (response.ok) {
        return await response.json()
    } else {
        throw new Error("Failed to chck user's authentication");
    }
};
