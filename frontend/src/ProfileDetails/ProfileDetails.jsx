import MobileOverview from "../UI/MobileOverview.jsx";
import {useDispatch, useSelector} from "react-redux";
import {platforms} from "../Platforms/PreDefaultPlatForms.jsx";
import {backgrounds} from "../BackgroundImages/BackgroundImages.jsx";
import Select from "react-select";
import {updateProfile} from "./ProfileSlice.js";
import Button from "../UI/Button.jsx";
import {useState} from "react";

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
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const links = useSelector((state) => state.link.links);
    const [description, setDescription] = useState("");
    const [linkName, setLinkName] = useState("");
    const [category, setCategory] = useState("");
    const maxCategoryLength = 20;
    const maxLinkNameLength = 30;
    const maxDescriptionLength = 150;

    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "shortDescription":
                if (event.target.value.length > maxDescriptionLength) return;
                setDescription(event.target.value);
                break;
            case "linksGroupName":
                if (event.target.value.length > maxLinkNameLength) return;
                setLinkName(event.target.value);
                break;
            case "category":
                if (event.target.value.length > maxCategoryLength) return;
                setCategory(event.target.value);
                break;
        }
        const {name, value} = event.target;
        dispatch(updateProfile({ field: name, value: value }));
    };

    const isStateEmpty = (state) => {
        return Object.values(state).every(value => value === "");
    }

    const getPlatformIcon = (label) => {
        const platform = platforms.find((p) => p.label === label);
        return platform ? platform.icon : null;
    };

    const getPlatformColor = (label) => {
        const platform = platforms.find((p) => p.label === label);
        return platform ? platform.color : null;
    };

    const getBackgroundImage = (label) => {
        const background = backgrounds.find((image) => image.value === label);
        return background ? background.image: null;
    }


    return (
        <>
            <MobileOverview profile={profile} getBackgroundImage={getBackgroundImage} links={links} getPlatformIcon={getPlatformIcon} getPlatformColor={getPlatformColor} />
            <section className="w-full bg-white p-10 relative rounded-md border-light-grey">
                <div className="pb-12">
                    <h2 className="font-bold text-lightBlack-1 text-3xl">Links Group Details</h2>
                    <p className="font-normal text-lightBlack-2 text-base">Add your details to create a personal touch
                        to your Links Group.</p>
                </div>
                <div
                    className="p-[1rem] mb-4  flex items-center justify-between bg-light-grey rounded-md border-light-grey">
                    <h2 className="font-bold text-lightBlack-2 text-base">Links Group picture</h2>
                    <button type="button"
                            className="bg-lightPurple1 flex flex-col items-center justify-center h-32 w-32 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
                            <path fill="#633CFF"
                                  d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"/>
                        </svg>
                        <span className="text-primaryPurple font-bold">+ Upload Links Group Image</span>
                    </button>
                    <p className="w-[215px] font-normal text-lightBlack-2 text-base">
                        Image must be below
                        1024x1024px. Use PNG or JPG format.
                    </p>
                </div>
                <div className="p-[1rem]  flex flex-col gap-10 bg-light-grey rounded-md border-light-grey">
                    <div className="relative flex justify-between items-center w-full">
                        <label className="font-bold text-lightBlack-2 text-base" htmlFor="firstName">Links Group Name*</label>
                        <input maxLength={maxLinkNameLength} value={linkName} name="linksGroupName"
                               onChange={handleInputChange} id="firstName"
                               type="text"
                               placeholder="Enter the link name for your group of links/link"
                               className=" w-[50%] pl-10 bg-white p-3 border-[.5px] rounded-md border-lightBlack-2 focus:outline-primaryPurple"
                        />
                        <p className="text-sm text-lightBlack-2 absolute right-0 bottom-[-20px]">
                            {maxLinkNameLength - linkName.length} characters left
                        </p>
                    </div>
                    <div className="relative flex justify-between items-center w-full">
                        <label className="font-bold text-lightBlack-2 text-base" htmlFor="shortDescription">Links Description*</label>
                        <textarea value={description} maxLength={maxDescriptionLength}  name="shortDescription" onChange={handleInputChange} id="shortDescription"
                                  placeholder="Enter the description for your group of links/link."
                               className="w-[50%] pl-10 bg-white p-3 border-[.5px] rounded-md border-lightBlack-2 focus:outline-primaryPurple" rows="3"
                        />
                        <p className="text-sm text-lightBlack-2 absolute right-0 bottom-[-20px]">
                            {maxDescriptionLength - description.length} characters left
                        </p>
                    </div>
                    <div className="relative flex justify-between items-center w-full">
                        <label className="font-bold text-lightBlack-2 text-base" htmlFor="category">Category*</label>
                        <input value={category} maxLength={maxCategoryLength} name="category" onChange={handleInputChange} id="category" type="text"
                               placeholder="Enter Category"
                               className=" w-[50%] pl-10 bg-white p-3 border-[.5px] rounded-md border-lightBlack-2 focus:outline-primaryPurple"
                        />
                        <p className="text-sm text-lightBlack-2 absolute right-0 bottom-[-20px]">
                            {maxCategoryLength - category.length} characters left
                        </p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <label className="font-bold text-lightBlack-2 text-base" htmlFor="backgroundImage">Background
                            Image*</label>
                        <div className="w-[50%]">
                            <Select
                                name="backgroundImage"
                                onChange={(selectedOption) => {
                                    dispatch(updateProfile({field: "backgroundImage", value: selectedOption.value}));
                                }}
                                id="backgroundImage"
                                options={backgrounds}
                                getOptionLabel={(option) => (
                                    <div className="flex items-center gap-2">
                                        {option.image && (

                                            <img
                                                src={option.image}
                                                alt={option.label}
                                                style={{width: '24px', height: '24px', borderRadius: '4px'}}
                                            />
                                        )}
                                        <span>{option.label}</span>
                                    </div>
                                )}
                                getOptionValue={option => option.label}
                                value={backgrounds.find((bg) => bg.value === profile.backgroundImage)}
                                styles={customStyles}
                                placeholder="Select a background"
                            />
                        </div>
                    </div>
                </div>
                <div className="border-t border-light-grey-100 mt-10 -mx-10"></div>
                <div className="mt-10 text-end">
                    <Button disabled={isStateEmpty(profile)} type="save">Save</Button>
                </div>
            </section>
        </>
    );
}

export default ProfileDetails;