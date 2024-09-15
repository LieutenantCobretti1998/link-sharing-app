import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    linksGroupImage: "",
    linksGroupName: "",
    shortDescription: "",
    category:  "",
    backgroundImage: ""
}

const profileReducer = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            const {field, value} = action.payload;
            state[field] = value;
        },
        removeLinksGroupImage: (state) => {
            state.linksGroupImage = "";
        }
    }
});

export const {updateProfile, removeLinksGroupImage} = profileReducer.actions;
export default profileReducer.reducer;
