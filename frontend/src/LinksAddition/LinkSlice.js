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

        hideForm: (state) => {
            state.showForm = false;
        },

        addLink: (state, action) => {
            state.links.push(action.payload);
        },

        removeLink: (state, action) => {
            state.links.splice(state.links.indexOf(action.payload), 1);
        }
    }
});

export const {showForm, hideForm, addLink, removeLink} = linkReducer.actions;
export default linkReducer.reducer;