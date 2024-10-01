import Header from "./Header.jsx";
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import Spinner from "../UI/Spinner.jsx";
import {useMutation} from "@tanstack/react-query";
import saveLink from "../SaveLogic/SaveMutation.js";
function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: saveLink,
        onSuccess: () => {
            navigate("/", {replace: true});
        }
    });

    return (
        <>
            {mutation.isLoading ? (
                <Spinner />
            ): (
                <>
                <Header saveLinks={mutation.mutate} />
                <main className={`flex bg-light-grey m-2 flex-grow gap-5 font-instrumentNormal ${location.pathname === "/preview" || location.pathname.startsWith("/edit-preview") ? "justify-center" : ""}`}>
                    <Outlet/>
                </main>
                </>
            )}
        </>
    )
}

export default Layout;