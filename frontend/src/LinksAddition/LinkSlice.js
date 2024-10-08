import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showForm: false,
    links: [],
}

const linkReducer = createSlice({
    name: 'Links',
    initialState,
    reducers: {
        showForm: (state) => {
            state.showForm = true;
        },

        addLink: (state) => {
            if (state.links.length < 5) {
                const newLink = {
                    id: Date.now() + Math.random(),
                    label: "GitHub",
                    url: "",
                };
                state.links.push(newLink);
            } else {
                alert("You can only add up to 5 links");
            }
        },
        updateLink: (state, action) => {
            const {id, updates} = action.payload;
            const linkIndex = state.links.findIndex((link) => link.id === id);
            if (linkIndex !== -1) {
                state.links[linkIndex] = {...state.links[linkIndex], ...updates };
            }
        },

        removeLink: (state, action) => {
            const id = action.payload;
            state.links = state.links.filter((link) => link.id !== id);
            if (state.links.length === 0) {
                state.showForm = false;
            }
        },
        resetLinksState: () => {
            return initialState;

        },
        fetchLinks: (state, action) => {
            state.links = action.payload;
        }
    },
});

export const {showForm, resetLinksState, addLink, updateLink, removeLink, fetchLinks} = linkReducer.actions;
export default linkReducer.reducer;