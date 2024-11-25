import {createSlice} from "@reduxjs/toolkit";

const profile_data = localStorage.getItem("current-profile");
const parsedProfileData = profile_data ? JSON.parse(profile_data) : null;
const profileName = parsedProfileData ? parsedProfileData.profile_name : "";
const profileBio = parsedProfileData ? parsedProfileData.profile_bio : "";

const initialState = {
    profileName: profileName,
    profileBio: profileBio,
    bioIncluded: false,
    links: [],
    linksGroupImage: "",
    linksGroupName: "",
    shortDescription: "",
    category:  "",
    textColor: "#333333",
    commonColor: "#D9D9D9",
    backgroundColor: "#FFF",
    cardBackgroundColor: "#FFF",
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
            if (state[field] === "BioInclude") {
                state.bioSaved = value;
            }
            state[field] = value;
        },
        removeSavedLink: (state, action) => {
            const id = action.payload;
            state.links = state.links.filter((link) => link.id !== id);
        },
        toggleModal: (state, action) => {
            state.showModal = action.payload;
        },
        setBackgroundColor: (state, action) => {
            state.backgroundColor = action.payload;
        },
        resetSaveState: (state) => {
            return {
                ...initialState,
                profileName: state.profileName,
                profileBio: state.profileBio

            };
        },
        saveData: (state, action) => {
            return {...state, ...action.payload};
        },
        updateProfileName: (state, action) => {
            state.profileName = action.payload;
        },
        updateProfileBio: (state, action) => {
            state.profileBio = action.payload;
        },
        clearProfileBio: (state) => {
            state.profileBio = null;
        }
    }
});

export const {clearProfileBio, saveChooses, updateProfileName, updateProfileBio, saveData, resetSaveState, removeSavedLink, toggleModal, setBackgroundColor} = saveReducer.actions;
export default saveReducer.reducer;