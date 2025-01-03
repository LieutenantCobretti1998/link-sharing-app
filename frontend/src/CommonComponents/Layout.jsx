import Header from "./Header.jsx";
import {Outlet, useLocation, useMatch, useNavigate} from 'react-router-dom';
import Spinner from "../UI/Spinner.jsx";
import {useMutation} from "@tanstack/react-query";
import saveLink from "../SaveLogic/SaveMutation.js";
import useHandleSessionExpired from "../CustomLogic/UseHandleSessionExpired.js";
import {useDispatch, useSelector} from "react-redux";
import {resetLinksState} from "../LinksAddition/LinkSlice.js";
import {resetProfileState} from "../ProfileDetails/ProfileSlice.js";
import {resetSaveState} from "../SaveLogic/SaveSlice.js";
import toast from "react-hot-toast";

function Layout() {
    const location = useLocation();
    const dynamicMatch = useMatch("/:username/:id");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {backgroundColor} = useSelector((state) => state.saveChooses);
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
    const isPreviewPath = location.pathname.includes("preview-linksGroup") || location.pathname.includes("/edit-preview") || location.pathname.includes("new-group-preview");

    return (
        <>
            {mutation.isLoading ? (
                <Spinner />
            ): (
                <>
                <Header saveLinks={mutation.mutate} />
                <main className={`flex gap-2 ${location.pathname === "/" && "max-sm:flex-col"} bg-light-grey ${location.pathname.includes("preview-linksGroup")  || location.pathname.includes("/edit-preview") || location.pathname.includes("new-group-preview") ? "m-0 ": "m-2"}   flex-grow  font-instrumentNormal ${location.pathname.includes("preview-linksGroup")  || location.pathname.includes("/edit-preview") || location.pathname === "/"  || dynamicMatch  ? "justify-center" : ""}`}
                    style={{
                        backgroundColor: backgroundColor && isPreviewPath ? backgroundColor : "",
                    }}
                >
                    <Outlet/>
                </main>
                </>
            )}
        </>
    )
}

export default Layout;