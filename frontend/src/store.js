import {configureStore} from "@reduxjs/toolkit";
import LinkSlice from "./LinksAddition/LinkSlice.js";
import ProfileSlice from "./ProfileDetails/ProfileSlice.js";
import SaveSlice from "./SaveLogic/SaveSlice.js";

const store = configureStore({
    reducer: {
        link: LinkSlice,
        profile: ProfileSlice,
        saveChooses: SaveSlice
    }
})

export default store;