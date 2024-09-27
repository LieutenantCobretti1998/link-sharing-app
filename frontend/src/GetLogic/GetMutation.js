"use strict";

const getLinks = async () => {
    const response = await fetch("http://127.0.0.1:5000/api/all_links", {
        method: "GET",
    });
    const responseData = await response.json();
    console.log(responseData);
    if (!response.ok) {
         throw new Error("Error to get Links");
    }
    return responseData;
};

export default getLinks;