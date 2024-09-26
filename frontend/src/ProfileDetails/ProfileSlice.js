import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    linksGroupImage: "",
    linksGroupName: "",
    shortDescription: "",
    category:  "",
    backgroundImage: "",
    textColor: "#333333",
    commonColor: "#D9D9D9",
    backgroundColor: "#FFF"
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
        },
        resetState: (state) => {
            return initialState;
        }
    }
});

export const {updateProfile, resetState, removeLinksGroupImage} = profileReducer.actions;
export default profileReducer.reducer;
