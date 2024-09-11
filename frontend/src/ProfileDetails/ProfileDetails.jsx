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
                <div className="pb-12 flex justify-between bg-light-grey rounded-md border-light-grey">
                    <h2 className="font-bold text-lightBlack-1 text-3xl">Profile picture</h2>
                </div>
            </section>
        </>
    );
}

export default ProfileDetails;