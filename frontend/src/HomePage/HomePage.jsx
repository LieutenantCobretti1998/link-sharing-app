import Sidebar from "./SideBar/Sidebar.jsx";
import AllLinks from "./All Links/AllLinks.jsx";
import {useEffect} from "react";
import {resetLinksState} from "../LinksAddition/LinkSlice.js";
import {resetProfileState} from "../ProfileDetails/ProfileSlice.js";
import {resetSaveState} from "../SaveLogic/SaveSlice.js";
import {useDispatch} from "react-redux";


function HomePage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetLinksState());
        dispatch(resetProfileState());
        dispatch(resetSaveState());
    }, []);
    return (
        <>
            <Sidebar />
            <AllLinks />
        </>
    );
}

export default HomePage;