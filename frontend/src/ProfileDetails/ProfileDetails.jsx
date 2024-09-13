import MobileOverview from "../UI/MobileOverview.jsx";
import {useSelector} from "react-redux";
import {useState} from "react";
import {platforms} from "../Platforms/PreDefaultPlatForms.jsx";
import {backgrounds} from "../BackgroundImages/BackgroundImages.jsx";
import Select from "react-select";

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? '#A855F7' : '#A3A3A3', // Purple border on focus
        boxShadow: state.isFocused ? '0 0 0 1px #A855F7' : 'none',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? '#A855F7' // Selected option background
            : state.isFocused
                ? '#EDE9FE' // Focused option background
                : 'white',
        color: state.isSelected ? 'white' : 'black',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'white',
        border: '1px solid #A3A3A3',
        borderRadius: '0.375rem',
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: "#BEADFF", // Red color on focus

    }),
}

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
            <section className="w-full bg-white p-10 relative rounded-md border-light-grey">
                <div className="pb-12">
                    <h2 className="font-bold text-lightBlack-1 text-3xl">Profile Details</h2>
                    <p className="font-normal text-lightBlack-2 text-base">Add your details to create a personal touch to your profile.</p>
                </div>
                <div
                    className="p-[1rem] mb-4  flex items-center justify-between bg-light-grey rounded-md border-light-grey">
                    <h2 className="font-bold text-lightBlack-2 text-base">Profile picture</h2>
                    <button type="button" className="bg-lightPurple1 flex flex-col items-center justify-center h-32 w-32 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
                            <path fill="#633CFF"
                                  d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"/>
                        </svg>
                        <span className="text-primaryPurple font-bold">+ Upload Profile Image</span>
                    </button>
                    <p className="w-[215px] font-normal text-lightBlack-2 text-base">
                        Image must be below
                        1024x1024px. Use PNG or JPG format.
                    </p>
                </div>
                <div className="p-[1rem]  flex flex-col gap-10 bg-light-grey rounded-md border-light-grey">
                    <div className="flex justify-between items-center w-full">
                        <label className="font-bold text-lightBlack-2 text-base" htmlFor="firstName">First Name*</label>
                        <input id="firstName" type="text" placeholder="Enter First Name"
                               className=" w-[50%] pl-10 bg-white p-3 border-[.5px] rounded-md border-lightBlack-2 focus:outline-primaryPurple"/>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <label className="font-bold text-lightBlack-2 text-base" htmlFor="firstName">Last name*</label>
                        <input id="firstName" type="text" placeholder="Enter Last Name"
                               className=" w-[50%] pl-10 bg-white p-3 border-[.5px] rounded-md border-lightBlack-2 focus:outline-primaryPurple"/>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <label className="font-bold text-lightBlack-2 text-base" htmlFor="firstName">Category*</label>
                        <input id="firstName" type="text" placeholder="Enter Category"
                               className=" w-[50%] pl-10 bg-white p-3 border-[.5px] rounded-md border-lightBlack-2 focus:outline-primaryPurple"/>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <label className="font-bold text-lightBlack-2 text-base" htmlFor="firstName">Email*</label>
                        <input id="firstName" type="text" placeholder="Enter Email"
                               className=" w-[50%] pl-10 bg-white p-3 border-[.5px] rounded-md border-lightBlack-2 focus:outline-primaryPurple"/>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <label className="font-bold text-lightBlack-2 text-base" htmlFor="firstName">Background Image*</label>
                        <div className="w-[50%]">
                            <Select
                                id="backgroundList"
                                options={backgrounds}
                                getOptionLabel={(option) => (
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={option.image}
                                            alt={option.label}
                                            style={{width: '24px', height: '24px', borderRadius: '4px'}}
                                        />
                                        <span>{option.label}</span>
                                    </div>
                                )}
                                getOptionValue={option => option.label}
                                defaultValue={backgrounds[0]}
                                styles={customStyles}
                                placeholder = "Select background"
                                isSearchable={false}
                            />

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProfileDetails;