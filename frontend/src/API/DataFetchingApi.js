"use strict";

export const getLinks = async () => {
    const response = await fetch("http://127.0.0.1:5000/api/all_links", {
        method: "GET",
    });
    const responseData = await response.json();
    if (!response.ok) {
         throw new Error("Error to get Links");
    }

    return responseData;
};

export const getLink = async (id) => {
    const response = await fetch(`http://127.0.0.1:5000/api/get-link/${id}`, {
        "method": "GET",
    });
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error("Error to get link");
    }
    return responseData;
};

export const updateLinksGroup = async ({id, links}) => {
    const response = await fetch(`http://127.0.0.1:5000/api/update-link/${id}`, {
         method: "PATCH",
         body: JSON.stringify(links),
         headers: {
             "Content-Type": "application/json"
         },
    });
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error("Error to update links");
    }
    return responseData;
};

export const updateLinksProfile = async ({id, profile}) => {
    const response = await fetch(`http://127.0.0.1:5000/api/update-links-profile/${id}`, {
         method: "PATCH",
         body: JSON.stringify(profile),
         headers: {
             "Content-Type": "application/json"
         },
    });
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error("Error to update links");
    }
    return responseData;
};

export const deleteLink = async (id) => {
    const response = await fetch(`http://127.0.0.1:5000/api/delete-link-group/${id}`, {
        method: "DELETE",
    });
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error("Error to get link");
    }
    return responseData;
}

