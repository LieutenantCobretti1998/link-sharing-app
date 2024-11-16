"use strict";

export function getCSRFToken() {
    const name = "csrf_access_token=";
    const decodeCookie = decodeURIComponent(document.cookie);
    const cookies = decodeCookie.split("; ");
    for(let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        console.log(cookie.substring(name.length))
        if(cookie.startsWith(name)) {
            return cookie.substring(name.length)
        }
    }
}

export function getRefreshCSRFToken() {
    const name = "csrf_refresh_token=";
    const decodeCookie = decodeURIComponent(document.cookie);
    const cookies = decodeCookie.split("; ");
    for(let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        console.log(cookie.substring(name.length))
        if(cookie.startsWith(name)) {
            return cookie.substring(name.length)
        }
    }
}

