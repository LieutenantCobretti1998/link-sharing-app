"use strict";

import {AuthContext} from "../CustomLogic/AuthProvider.jsx";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import useHandleSessionExpired from "../CustomLogic/UseHandleSessionExpired.js";

export function getCSRFToken() {
    const name = "csrf_access_token=";
    const decodeCookie = decodeURIComponent(document.cookie);
    const cookies = decodeCookie.split("; ");
    for(let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
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
        if(cookie.startsWith(name)) {
            return cookie.substring(name.length)
        }
    }
}

