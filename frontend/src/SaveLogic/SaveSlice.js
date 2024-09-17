import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showForm: false,
    links: [],
    linksGroupImage: "",
    linksGroupName: "",
    shortDescription: "",
    category:  "",
    backgroundImage: ""
}

const saveReducer = createSlice({
    name: "save",
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            const {field, value} = action.payload;
        }
    }
})