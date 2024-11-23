import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import ManageProfile from "../UI/ManageProfile.jsx";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {logoutUser} from "../API/Login.js";
import useHandleSessionExpired from "../CustomLogic/UseHandleSessionExpired.js";
import Spinner from "../UI/Spinner.jsx";
import {updateProfileBio, updateProfileName} from "../SaveLogic/SaveSlice.js";
import {useDispatch} from "react-redux";
import ConfirmDeletion from "./ConfirmDeletion.jsx";
import {ProfileContext} from "../CustomLogic/ProfileProvider.jsx";


function Settings() {
    const [selectedMenu, setSelectedMenu] = useState("Manage Profile");
    const queryClient = useQueryClient();
    const { setChosenProfile } = useContext(ProfileContext);
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const handleSessionExpired = useHandleSessionExpired();
    const [parsedProfileData, setParsedProfileData] = useState(() => {
        const profile_data = localStorage.getItem("current-profile");
        return profile_data ? JSON.parse(profile_data) : null;
    });
    const profileName = parsedProfileData.profile_name;
    const currentUser = parsedProfileData.current_user;
    const handleProfileChange = (newProfileName) => {
        const updatedProfileData = {...parsedProfileData, profile_name: newProfileName};
        setParsedProfileData(updatedProfileData);
        localStorage.setItem("current-profile", JSON.stringify(updatedProfileData));
        dispatch(updateProfileName(newProfileName));
    };

    const handleProfileBioChange = (newProfileBio) => {
        const updatedProfileData = {...parsedProfileData, profile_bio: newProfileBio};
        setParsedProfileData(updatedProfileData);
        localStorage.setItem("current-profile", JSON.stringify(updatedProfileData));
        dispatch(updateProfileBio(newProfileBio));
    }

    const {mutate: logOut, isLoading: isLoggingOut} = useMutation({
        mutationFn: () => logoutUser(),
        onSuccess: () => {
            navigate("/login", {replace: true});
            setChosenProfile(null);
            queryClient.clear();
        },
        onError: (error) => {
            if (error.message === "Session expired. Please log in again.") {
                handleSessionExpired();
            }
            toast.error(error.message || "An Error occurred");
        }
    });
    const deleteAccount = () => {
        setSelectedMenu("deleteAccount");
        setModalOpen(true);
    }
    const renderContent = () => {
        switch (selectedMenu) {
            case "Manage Profile":
                return <ManageProfile onProfileBioChange={handleProfileBioChange} onProfileNameChange={handleProfileChange}/>;
            default:
                return null;
        }
    };
    return (
        <main className="flex justify-center items-center min-h-screen bg-grey">
            {modalOpen && <ConfirmDeletion setIsOpen={setModalOpen} resetMenu={setSelectedMenu} />}
            {isLoggingOut ? (
                <Spinner/>
            ) : (
                <section
                    className="bg-white flex rounded-md shadow-sm overflow-hidden w-[80%] max-lg:flex-col max-lg:w-full">
                    {/* Sidebar for Big Screens */}
                    <aside className="bg-light-grey-2 p-6 w-2/4 border-r border-light-grey hidden lg:block">
                        <div className="mb-10">
                            <h3 className="max-xs:text-[.8rem] text-lg text-lightBlack-3 mb-2">
                                Current User:{" "}
                                <strong className="text-lightBlack-1">{currentUser}</strong>
                            </h3>
                            <h3 className="max-xs:text-[.8rem] text-lg text-lightBlack-3">
                                Chosen Profile:{" "}
                                <strong className="text-lightBlack-1">{profileName}</strong>
                            </h3>
                        </div>
                        <ul>
                            <li
                                className={`flex items-center gap-3 p-2 my-5 ${
                                    selectedMenu === "Manage Profile"
                                        ? "bg-grey cursor-default"
                                        : "hover:bg-grey cursor-pointer"
                                } rounded-md group transition-colors duration-300`}
                                onClick={() => setSelectedMenu("Manage Profile")}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`ionicon max-sm:w-4 w-5 ${
                                        selectedMenu === "Manage Profile"
                                            ? "text-lightBlack-1"
                                            : "text-lightBlack-3 group-hover:text-lightBlack-1"
                                    } transition-colors duration-300`}
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="32"
                                    />
                                    <path
                                        d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeMiterlimit="10"
                                        strokeWidth="32"
                                    />
                                </svg>
                                <span
                                    className={`${
                                        selectedMenu === "Manage Profile"
                                            ? "text-lightBlack-1"
                                            : "text-lightBlack-3 group-hover:text-lightBlack-1"
                                    } max-sm:text-[.8rem] transition-colors duration-300`}
                                >
                  Manage Profile
                </span>
                            </li>
                            <li
                                className={`flex items-center gap-3 p-2 ${
                                    selectedMenu === "logOut"
                                        ? "bg-grey cursor-default"
                                        : "hover:bg-grey cursor-pointer"
                                } rounded-md group transition-colors duration-300`}
                                onClick={() => logOut()}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ionicon w-5 text-red"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="32"
                                    />
                                </svg>
                                <span className="text-red transition-colors duration-300">LogOut</span>
                            </li>

                            <li
                                className={`flex items-center gap-3 p-2 ${
                                    selectedMenu === "deleteAccount"
                                        ? "bg-grey cursor-default"
                                        : "hover:bg-grey cursor-pointer"
                                } rounded-md group transition-colors duration-300`}
                                onClick={() => deleteAccount()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon w-5 text-red" viewBox="0 0 512 512">
                                    <path
                                        d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
                                        fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="32"/>
                                    <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10"
                                          strokeWidth="32" d="M80 112h352"/>
                                    <path
                                        d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224"
                                        fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="32"/>
                                </svg>
                                <span className="text-red transition-colors duration-300">Delete Account</span>
                            </li>
                        </ul>
                    </aside>

                    {/* Sidebar for Small Screens */}
                    {isSidebarOpen && (
                        <aside
                            className="bg-light-grey-2 p-6 w-full border-b border-light-grey fixed inset-0 z-10 overflow-y-auto lg:hidden">
                            {/* Close Button */}
                            <button className="mb-4" onClick={() => setIsSidebarOpen(false)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ionicon w-6 h-6"
                                    viewBox="0 0 512 512"
                                >
                                    <title>Close</title>
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="32"
                                        d="M368 368L144 144M368 144L144 368"
                                    />
                                </svg>
                            </button>
                            <div className="mb-10">
                                <h3 className="text-lg text-lightBlack-3 mb-2">
                                Current User:{" "}
                                    <strong className="text-lightBlack-1">{currentUser}</strong>
                                </h3>
                                <h3 className="text-lg text-lightBlack-3">
                                    Chosen Profile:{" "}
                                    <strong className="text-lightBlack-1">{profileName}</strong>
                                </h3>
                            </div>
                            <ul>
                                <li
                                    className={`flex items-center gap-3 p-2 my-5 ${
                                        selectedMenu === "Manage Profile"
                                            ? "bg-grey cursor-default"
                                            : "hover:bg-grey cursor-pointer"
                                    } rounded-md group transition-colors duration-300`}
                                    onClick={() => {
                                        setSelectedMenu("Manage Profile");
                                        setIsSidebarOpen(false); // Close sidebar after selection
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`ionicon w-5 ${
                                            selectedMenu === "Manage Profile"
                                                ? "text-lightBlack-1"
                                                : "text-lightBlack-3 group-hover:text-lightBlack-1"
                                        } transition-colors duration-300`}
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="32"
                                        />
                                        <path
                                            d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeMiterlimit="10"
                                            strokeWidth="32"
                                        />
                                    </svg>
                                    <span
                                        className={`${
                                            selectedMenu === "Manage Profile"
                                                ? "text-lightBlack-1"
                                                : "text-lightBlack-3 group-hover:text-lightBlack-1"
                                        } transition-colors duration-300`}
                                    >
                                    Manage Profile
                                </span>
                                </li>
                                <li
                                    className={`flex items-center gap-3 p-2 ${
                                        selectedMenu === "logOut"
                                            ? "bg-grey cursor-default"
                                            : "hover:bg-grey cursor-pointer"
                                    } rounded-md group transition-colors duration-300`}
                                    onClick={() => {
                                        logOut();
                                        setIsSidebarOpen(false); // Close sidebar after logout
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ionicon w-5 text-red"
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="32"
                                        />
                                    </svg>
                                    <span className="text-red transition-colors duration-300">LogOut</span>
                                </li>
                                <li
                                    className={`flex items-center gap-3 p-2 ${
                                        selectedMenu === "deleteAccount"
                                            ? "bg-grey cursor-default"
                                            : "hover:bg-grey cursor-pointer"
                                    } rounded-md group transition-colors duration-300`}
                                    onClick={() => deleteAccount()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon w-5 text-red"
                                         viewBox="0 0 512 512">
                                        <path
                                            d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
                                            fill="none" stroke="currentColor" strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="32"/>
                                        <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10"
                                              strokeWidth="32" d="M80 112h352"/>
                                        <path
                                            d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224"
                                            fill="none" stroke="currentColor" strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="32"/>
                                    </svg>
                                    <span className="text-red transition-colors duration-300">Delete Account</span>
                                </li>
                            </ul>
                        </aside>
                    )}

                    {/* Main Content */}
                    <div className="h-[720px] p-8 w-full relative max-lg:h-auto overflow-y-auto">
                        <div className="flex justify-between items-center">
                            <button
                                className="lg:hidden"
                                onClick={() => setIsSidebarOpen(true)}
                            >
                                {/* Open Sidebar Button for Small Screens */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ionicon w-6 h-6"
                                    viewBox="0 0 512 512"
                                >
                                    <title>Menu</title>
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeMiterlimit="10"
                                        strokeWidth="32"
                                        d="M80 160h352M80 256h352M80 352h352"
                                    />
                                </svg>
                            </button>
                            <h1 className="max-sm:text-base font-instrumentBold text-3xl">{selectedMenu}</h1>
                            <Link to="/" className="group">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ionicon w-10"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                                        fill="lightGrey"
                                        stroke="lightGrey"
                                        strokeMiterlimit="10"
                                        strokeWidth="32"
                                        className="group-hover:fill-primaryPurple group-hover:stroke-primaryPurple transition-colors duration-300"
                                    />
                                    <path
                                        fill="none"
                                        stroke="grey"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="32"
                                        d="M320 320L192 192M192 320l128-128"
                                        className="group-hover:stroke-white transition-colors duration-300"
                                    />
                                </svg>
                            </Link>
                        </div>
                        <div className="inset-x-0 absolute">
                            <hr className="my-3 border-t-[3px] border-light-grey-2 w-full"/>
                        </div>
                        {renderContent()}
                    </div>
                </section>
            )}
        </main>
    );
}

export default Settings;