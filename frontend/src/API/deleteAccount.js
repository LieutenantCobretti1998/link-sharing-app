import {getCSRFToken} from "../Helpers/AuthHelpers.js";
import {refreshAccessToken} from "./Login.js";
import {VITE_BACKEND_API_BASE_URL_DEV, VITE_BACKEND_API_BASE_URL_PROD} from "./API_ROUTES.js";
const mode = import.meta.env.MODE;
const BACKEND_API_BASE_URL = mode === "development" ? VITE_BACKEND_API_BASE_URL_DEV : VITE_BACKEND_API_BASE_URL_PROD;

export const deleteAccount = async() => {

     const response = await fetch(`${BACKEND_API_BASE_URL}/delete-account`, {
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
                const retryResponse = await fetch(`${BACKEND_API_BASE_URL}/delete-account`, {
                         method: "DELETE",
                         headers: {
                             'X-CSRF-TOKEN': getCSRFToken()
                         },
                         credentials: "include"
                      });

                   const retryData = await retryResponse.json();
                   if (!retryResponse.ok) {
                    const errorMessage = retryData?.error || "Error fetching links after token refresh.";
                    throw new Error(errorMessage);
                   }
                   return retryData; // Return the data from the retried request
            } else {
                throw new Error('Session expired. Please log in again.');
            }
        }
        throw new Error(responseData.error);
    }
    return responseData;
}