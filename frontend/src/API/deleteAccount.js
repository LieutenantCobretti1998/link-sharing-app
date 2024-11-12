import {getCSRFToken} from "../Helpers/AuthHelpers.js";
import {refreshAccessToken} from "./Login.js";

export const deleteAccount = async() => {

     const response = await fetch('/api/delete-account', {
         method: "DELETE",
         headers: {
             'X-CSRF-TOKEN': getCSRFToken()
         },
         credentials: "include"
    });
    const responseData = await response.json();
    if (!response.ok) {
        if (response.status === 401) {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
            } else {
                throw new Error('Session expired. Please log in again.');
            }
        }
        throw new Error(responseData.error);
    }
    return responseData;
}