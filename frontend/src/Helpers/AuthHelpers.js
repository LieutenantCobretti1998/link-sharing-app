"use strict";

export function getCSRFToken() {
    const csrfAccessToken = localStorage.getItem("csrf_access_token");
    if (!csrfAccessToken) {
        return;
    }
    return csrfAccessToken;
}

export function getRefreshCSRFToken() {
    const csrfRefreshToken = localStorage.getItem("csrf_refresh_token");
    if (!csrfRefreshToken) {
        return;
    }
    return csrfRefreshToken;
}

