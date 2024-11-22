import Header from "./Header.jsx";
import {Outlet, useLocation, useMatch, useNavigate} from 'react-router-dom';
import Spinner from "../UI/Spinner.jsx";
import {useMutation} from "@tanstack/react-query";
import saveLink from "../SaveLogic/SaveMutation.js";
import useHandleSessionExpired from "../CustomLogic/UseHandleSessionExpired.js";
import {useDispatch} from "react-redux";
import {resetLinksState} from "../LinksAddition/LinkSlice.js";
import {resetProfileState} from "../ProfileDetails/ProfileSlice.js";
import {resetSaveState} from "../SaveLogic/SaveSlice.js";
import toast from "react-hot-toast";

function Layout() {
    const location = useLocation();
    const dynamicMatch = useMatch("/:username/:id");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSessionExpired = useHandleSessionExpired();
    const mutation = useMutation({
        mutationFn: saveLink,
        onSuccess: (data) => {
            dispatch(resetLinksState());
            dispatch(resetProfileState());
            dispatch(resetSaveState());
            toast.success(data.message || "LinksGroup created Successfully.");
            navigate(`/`, {replace: true});
        },
        onError: (error) => {
            if (error.message === "Session expired. Please log in again.") {
                handleSessionExpired();
            }
            console.log(error)
            toast.success(error.error || "Something went wrong.");
        }
    });

    return (
        <>
            {mutation.isLoading ? (
                <Spinner />
            ): (
                <>
                <Header saveLinks={mutation.mutate} />
                <main className={`flex ${location.pathname === "/" && "max-sm:flex-col"} bg-light-grey m-2 flex-col flex-grow  font-instrumentNormal ${location.pathname.includes("preview-linksGroup")  || location.pathname.includes("/edit-preview") || location.pathname === "/"  || dynamicMatch  ? "justify-center" : ""}`}>
                    <Outlet/>
                </main>
                </>
            )}
        </>
    )
}

export default Layout;