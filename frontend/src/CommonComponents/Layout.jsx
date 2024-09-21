import Header from "./Header.jsx";
import {Outlet, useLocation, useNavigation} from 'react-router-dom';
import Spinner from "../UI/Spinner.jsx";
function Layout() {
    const location = useLocation();
    
    return (
        <>
            <Header />
            <main className={`flex bg-light-grey m-2 flex-grow gap-5 font-instrumentNormal ${location.pathname === "/preview" ? "justify-center" : ""}`}>
                <Outlet/>
            </main>
        </>
    );
}

export default Layout;