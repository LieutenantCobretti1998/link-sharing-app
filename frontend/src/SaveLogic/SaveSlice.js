import {createSlice} from "@reduxjs/toolkit";

const profile_data = localStorage.getItem("current-profile");
const parsedProfileData = profile_data ? JSON.parse(profile_data) : null;
const profileName = parsedProfileData ? parsedProfileData.profile_name : null;


const initialState = {
    profileName: profileName,
    links: [],
    linksGroupImage: "",
    linksGroupName: "",
    shortDescription: "",
    category:  "",
    textColor: "#333333",
    commonColor: "#D9D9D9",
    backgroundColor: "#FFF",
    backgroundImage: "",
    blendedColor: "",
    showModal: false,
}

const saveReducer = createSlice({
    name: "save",
    initialState,
    reducers: {
        saveChooses: (state, action) => {
            const {field, value} = action.payload;
            state[field] = value;
        },
        removeSavedLink: (state, action) => {
            const id = action.payload;
            state.links = state.links.filter((link) => link.id !== id);
        },
        toggleModal: (state, action) => {
            state.showModal = action.payload;
        },
        setBlendedColor: (state, action) => {
            state.blendedColor = action.payload;
        },
        resetSaveState: (state) => {
            return {
                ...initialState,
                profileName: state.profileName

            };
        },
        saveData: (state, action) => {
            return {...state, ...action.payload};
        },
        updateProfileName: (state, action) => {
            state.profileName = action.payload;
        },
    }
});

export const {saveChooses, updateProfileName, saveData, resetSaveState, removeSavedLink, toggleModal, setBlendedColor} = saveReducer.actions;
export default saveReducer.reducer;