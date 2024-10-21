"use strict";

const saveLink = async (newLinkData) => {
    const {showModal, ...rest} = newLinkData;
    const profile_data = localStorage.getItem("current-profile");
    const parsedProfileData = JSON.parse(profile_data);
    if (!parsedProfileData) {
        throw new Error("Profile is missed!");
    }
    const token = localStorage.getItem("access-token");
    if (!token) {
        throw new Error("User is not authenticated");
    }
    const response = await fetch(`/api/save_link/${parsedProfileData.profile_id}`, {
        method: "POST",
        body: JSON.stringify(rest),
        headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
        }
    });
    const responseData = await response.json();
    if (!response.ok) {
         throw new Error(responseData.message);
    }
    return responseData;
}

export default saveLink;