import {useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import ManageProfile from "../UI/ManageProfile.jsx";

function Settings() {
    const [selectedMenu, setSelectedMenu] = useState("Manage Profile");
    const navigate = useNavigate();
    const profile_data = localStorage.getItem("current-profile");
    const parsedProfileData = profile_data ? JSON.parse(profile_data) : null;
    const profileName = parsedProfileData.profile_name;
    const currentUser = parsedProfileData.current_user

    const renderContent = () => {
        switch (selectedMenu) {
            case "Manage Profile":
                return <ManageProfile />;
            case "logOut":
                return null;
        }
    }
    return (
        <main className="flex justify-center items-center h-screen bg-grey">
            <section className="bg-white flex rounded-md shadow-sm overflow-hidden w-[80%]">
                <aside className="bg-light-grey-2 p-6 w-2/4 border-r border-light-grey">
                    <div className="mb-10">
                        <h3 className="text-lg text-lightBlack-3 mb-2">Current User: <strong
                            className="text-lightBlack-1">{currentUser}</strong></h3>
                        <h3 className="text-lg text-lightBlack-3">Chosen Profile: <strong
                            className="text-lightBlack-1">{profileName}</strong></h3>
                    </div>
                    <ul>
                        <li className={`flex item-center gap-3 p-2 my-5 ${selectedMenu === "Manage Profile" ? "bg-grey cursor-default": "hover:bg-grey cursor-pointer"} rounded-md group transition-colors duration-300`}
                            onClick={() => setSelectedMenu("Manage Profile")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`ionicon w-5  ${selectedMenu === "Manage Profile" ? "text-lightBlack-1": "text-lightBlack-3 group-hover:text-lightBlack-1"} transition-colors duration-300`} viewBox="0 0 512 512">
                                <path
                                    d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                                    fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="32"/>
                                <path
                                    d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                                    fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
                            </svg>
                            <span className={`${selectedMenu === "Manage Profile" ? "text-lightBlack-1": "text-lightBlack-3 group-hover:text-lightBlack-1"} transition-colors duration-300`}>Manage Profile</span>
                        </li>
                        <li className={`flex item-center gap-3 p-2 ${selectedMenu === "logOut" ? "bg-grey cursor-default" : "hover:bg-grey cursor-pointer"} rounded-md group transition-colors duration-300`}
                            onClick={() => setSelectedMenu("logOut")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon w-5 text-red"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
                                    fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="32"/>
                            </svg>
                            <span
                                className={`text-red transition-colors duration-300`}>LogOut</span>
                        </li>
                    </ul>
                </aside>
                <div className="h-[720px] p-8 w-full relative">
                    <div className="flex justify-between items-center">
                        <h1 className="font-instrumentBold text-3xl ">{selectedMenu}</h1>
                        <Link to="/" className="group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon w-10" viewBox="0 0 512 512">
                                <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                                      fill="lightGrey" stroke="ligghtGrey" strokeMiterlimit="10" strokeWidth="32" className="group-hover:fill-primaryPurple group-hover:stroke-primaryPurple transition-colors duration-300"/>
                                <path fill="none" stroke="grey" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="32" d="M320 320L192 192M192 320l128-128" className="group-hover:stroke-white transition-colors duration-300"/>
                            </svg>
                        </Link>
                    </div>
                    <div className="inset-x-0 absolute">
                        <hr className="my-3 border-t-[3px] border-light-grey-2  w-full"/>
                    </div>
                    {renderContent()}
                </div>
            </section>
        </main>
    );
}

export default Settings;