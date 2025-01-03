import Sidebar from "./SideBar/Sidebar.jsx";
import AllLinks from "./All Links/AllLinks.jsx";
import {useEffect} from "react";
import {resetLinksState} from "../LinksAddition/LinkSlice.js";
import {resetProfileState} from "../ProfileDetails/ProfileSlice.js";
import {resetSaveState} from "../SaveLogic/SaveSlice.js";
import {useDispatch} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {DEFAULT_PAGE} from "../UI/GlobalVariables.js";
import {useQueryClient} from "@tanstack/react-query";


function HomePage() {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    let [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        dispatch(resetLinksState());
        dispatch(resetProfileState());
        dispatch(resetSaveState());
        queryClient.resetQueries({
            query: ["userLinks"],
        })
    }, []);

    useEffect(() => {
        if(!searchParams.get("page")) {
            const updateParams = new URLSearchParams(searchParams);
            updateParams.set("page", DEFAULT_PAGE);
            setSearchParams(updateParams);
        }
    }, [searchParams, setSearchParams]);
    return (
        <>
            <Sidebar />
            <AllLinks />
        </>
    );
}

export default HomePage;