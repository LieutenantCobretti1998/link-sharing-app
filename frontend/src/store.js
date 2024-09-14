import {configureStore} from "@reduxjs/toolkit";
import LinkSlice from "./LinksAddition/LinkSlice.js";
import ProfileSlice from "./ProfileDetails/ProfileSlice.js";

const store = configureStore({
    reducer: {
        link: LinkSlice,
        profile: ProfileSlice,
    }
})

export default store;