import Header from "./Header.jsx";
import {Outlet, useLocation} from 'react-router-dom';
import Spinner from "../UI/Spinner.jsx";
import {useMutation} from "@tanstack/react-query";
import saveLink from "../SaveLogic/SaveMutation.js";
function Layout() {
    const location = useLocation();
    const mutation = useMutation({
        mutationFn: saveLink,
    })
    return (
        <>
            {mutation.isLoading ? (
                <Spinner />
            ): (
                <>
                <Header saveLinks={mutation.mutate} />
                <main className={`flex bg-light-grey m-2 flex-grow gap-5 font-instrumentNormal ${location.pathname === "/preview" ? "justify-center" : ""}`}>
                    <Outlet/>
                </main>
                </>
            )}
        </>
    )
}

export default Layout;