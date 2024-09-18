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
        saveChooses: (state, action) => {
            const {field, value} = action.payload;
            state[field] = value;
        }
    }
});

export const {saveChooses} = saveReducer.actions;
export default saveReducer.reducer;