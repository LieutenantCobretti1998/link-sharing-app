import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    profileImage: "",
    firstName: "",
    lastName: "",
    category:  "",
    email: "",
    backgroundImage: ""
}

const profileReducer = createSlice({
    name: "profile",
    initialState,
})