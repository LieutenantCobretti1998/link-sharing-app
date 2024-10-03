import {createSlice} from "@reduxjs/toolkit";

const initialState = {
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
        resetSaveState: () => {
            return initialState;
        },
        saveData: (state, action) => {
            return {...state, ...action.payload};
        },
    }
});

export const {saveChooses, saveData, resetSaveState, removeSavedLink, toggleModal, setBlendedColor} = saveReducer.actions;
export default saveReducer.reducer;