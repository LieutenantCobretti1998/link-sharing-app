"use strict";

const saveLink = async (newLinkData) => {
    const {showModal, ...rest} = newLinkData;
    const response = await fetch("http://localhost:5000/api/save_link", {
        method: "POST",
        body: JSON.stringify(rest),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const responseData = await response.json();
    if (!response.ok) {
         throw new Error(responseData.message);
    }
    return responseData;
}

export default saveLink;