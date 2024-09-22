"use strict";

const saveLink = async (newLinkData) => {
    const response = await fetch("http://127.0.0.1:5000/api/save_link", {
        method: "POST",
        body: JSON.stringify(newLinkData),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
         throw new Error('Failed to save link');
    }
    return response.json();
}

export default saveLink;