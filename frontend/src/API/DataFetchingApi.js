"use strict";

export const getLinks = async (page= "1", search = null) => {
    const response = await fetch(`http://localhost:5000/api/all_links?page=${page}&search=${search}`, {
        method: "GET",
    });
    const responseData = await response.json();
    if (!response.ok) {
         const errorMessage = responseData?.error || "Error fetching links";
         throw new Error(errorMessage);
    }

    return responseData;
};

export const getLink = async (id) => {
    const response = await fetch(`http://localhost:5000/api/get-link/${id}`, {
        "method": "GET",
    });
    const responseData = await response.json();
    if (!response.ok) {
        switch (response.status) {
            case 404:
                throw new Response(responseData.error, {status:404});
            case 500:
                throw new Response(responseData.error, {status:500});
            default:
                throw new Response("Error to get Link");
        }
    }
    return responseData;
};

export const previewLink = async(username, id) => {
    const response = await fetch(`http://localhost:5000/api/${username}/${id}`, {
        "method": "GET",
    });
    const responseData = await response.json();
    if (!response.ok) {
        switch (response.status) {
            case 404:
                throw new Response(responseData.error, {status:404});
            case 500:
                throw new Response(responseData.error, {status:500});
            default:
                throw new Response("Error to get Link");
        }
    }
    return responseData;
}

export const updateLinksGroup = async ({id, links}) => {
    const response = await fetch(`http://localhost:5000/api/update-link/${id}`, {
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
    const response = await fetch(`http://localhost:5000/api/update-links-profile/${id}`, {
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
    const response = await fetch(`http://localhost:5000/api/delete-link-group/${id}`, {
        method: "DELETE",
    });
    const responseData = await response.json();
    if (!response.ok) {
        switch (response.status) {
            case 404:
                throw new Error(responseData.error);
            case 500:
                throw new Error(responseData.error);
            default:
                throw new Error("Error to delete Link");
        }
    }
    return responseData;
};



