import MobileOverview from "../UI/MobileOverview.jsx";
import {useSelector} from "react-redux";
import {useState} from "react";
import {platforms} from "../Platforms/PreDefaultPlatForms.jsx";

function ProfileDetails() {
    const links = useSelector((state) => state.link.links);
    const [showModal, setShowModal] = useState(false);

    const getPlatformIcon = (label) => {
        const platform = platforms.find((p) => p.label === label);
        return platform ? platform.icon : null;
    };

    const getPlatformColor = (label) => {
        const platform = platforms.find((p) => p.label === label);
        return platform ? platform.color : null;
    };
    return (
        <>
            <MobileOverview links={links} getPlatformIcon={getPlatformIcon} getPlatformColor={getPlatformColor} />
            <section className="w-full bg-white p-10 relative">
                <div className="pb-12">
                    <h2 className="font-bold text-lightBlack-1 text-3xl">Profile Details</h2>
                    <p className="font-normal text-lightBlack-2 text-base">Add your details to create a personal touch to your profile.</p>
                </div>
                <div
                    className="p-[1rem] mb-4  flex items-center justify-between bg-light-grey rounded-md border-light-grey">
                    <h2 className="font-bold text-lightBlack-2 text-base">Profile picture</h2>
                    <button className="bg-lightPurple1 flex flex-col items-center justify-center h-32 w-32 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
                            <path fill="#633CFF"
                                  d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"/>
                        </svg>
                        <span className="text-primaryPurple font-bold">+ Upload Profile Image</span>
                    </button>
                    <button className="bg-lightPurple1 flex flex-col items-center justify-center h-32 w-32 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
                            <path fill="#633CFF"
                                  d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"/>
                        </svg>
                        <span className="text-primaryPurple font-bold">+ Upload Background Image</span>
                    </button>
                    <p className=" p-[.75rem] w-[215px] font-normal text-lightBlack-2 text-base">Image must be below
                        1024x1024px. Use PNG or JPG format.</p>
                </div>
                <div className="p-[1rem]  flex bg-light-grey rounded-md border-light-grey">
                    <div className="flex">
                        <label htmlFor="firstName">First Name*</label>
                        <input id="firstName" type="text" placeholder="Enter First Name"/>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProfileDetails;