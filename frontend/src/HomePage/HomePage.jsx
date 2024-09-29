import Sidebar from "./SideBar/Sidebar.jsx";
import AllLinks from "./All Links/AllLinks.jsx";
import {useDispatch} from "react-redux";

function HomePage() {

    return (
        <>
            <Sidebar />
            <AllLinks />
        </>
    );
}

export default HomePage;