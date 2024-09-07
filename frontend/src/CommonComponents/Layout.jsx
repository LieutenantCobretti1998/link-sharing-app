import Header from "./Header.jsx";
import { Outlet } from 'react-router-dom';
function Layout() {
    return (
        <>
            <Header />
            <main className="flex bg-light-grey m-2 flex-grow gap-5 font-instrumentNormal">
                <Outlet />
            </main>
        </>
    );
}

export default Layout;