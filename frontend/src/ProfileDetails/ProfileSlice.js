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
        resetProfileState: () => {
            return initialState;
        },
        fetchProfileData: (state, action) => {
            return {...state, ...action.payload};
        }
    }
});

export const {updateProfile, resetProfileState, removeLinksGroupImage, fetchProfileData} = profileReducer.actions;
export default profileReducer.reducer;
