import Header from "./Header.jsx";
import {Outlet, useLocation} from 'react-router-dom';
function Layout() {
    const location = useLocation();
    return (
        <>
            <Header />
            <main className={`flex bg-light-grey m-2 flex-grow gap-5 font-instrumentNormal ${location.pathname === "/preview" ? "justify-center" : ""}`}>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;