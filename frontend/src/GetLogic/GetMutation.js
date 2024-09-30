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
    console.log(responseData)
    return responseData;
}

