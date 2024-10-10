import {createSlice} from '@reduxjs/toolkit'

const initialState = {
   shortenUrl: ""
}

const shortenUrlReducer = createSlice({
    name: "shortenUrl",
    initialState,
    reducers: {
       setShortenUrl: (state, action) => {
            state.shortenUrl = action.payload;
       }
    }

});

export const {setShortenUrl} = shortenUrlReducer.actions;
export default shortenUrlReducer.reducer;
