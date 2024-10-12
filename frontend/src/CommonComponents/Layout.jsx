import Header from "./Header.jsx";
import {Outlet, useLocation, useMatch, useNavigate} from 'react-router-dom';
import Spinner from "../UI/Spinner.jsx";
import {useMutation} from "@tanstack/react-query";
import saveLink from "../SaveLogic/SaveMutation.js";
import ServerError from "../UI/Errors/ServerError.jsx";
function Layout() {
    const location = useLocation();
    const dynamicMatch = useMatch("/:username/:id");
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: saveLink,
        onSuccess: () => {
            navigate("/", {replace: true});
        },
        onError: () => {
            return <ServerError />
        }
    });

    return (
        <>
            {mutation.isLoading ? (
                <Spinner />
            ): (
                <>
                <Header saveLinks={mutation.mutate} />
                <main className={`flex bg-light-grey m-2 flex-grow gap-5 font-instrumentNormal ${location.pathname === "/preview" || location.pathname.startsWith("/edit-preview") || location.pathname.startsWith("/preview-linksGroup") || dynamicMatch  ? "justify-center" : ""}`}>
                    <Outlet/>
                </main>
                </>
            )}
        </>
    )
}

export default Layout;