import {configureStore} from "@reduxjs/toolkit";
import LinkSlice from "./LinksAddition/LinkSlice.js";

const store = configureStore({
    reducer: {
        link: LinkSlice
    }
})

export default store;