import {useForm} from "react-hook-form";
import MiniSpinner from "./MiniSpinner.jsx";
import Button from "./Button.jsx";
import {useMutation} from "@tanstack/react-query";
import {deleteProfile, updateProfileBio, updateProfileName} from "../API/Profiles.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import useHandleSessionExpired from "../CustomLogic/UseHandleSessionExpired.js";


// eslint-disable-next-line react/prop-types
function ManageProfile({onProfileNameChange, onProfileBioChange}) {
    const profile_data = localStorage.getItem("current-profile");
    const handleSessionExpired = useHandleSessionExpired();
    const navigate = useNavigate();
    const parsedProfileData = profile_data ? JSON.parse(profile_data) : null;
    const profileName = parsedProfileData.profile_name;
    const profileBio = parsedProfileData.profile_bio;
    const {
        watch: watchProfileName,
        register: registerProfileName,
        handleSubmit: handleSubmitProfileName,
        formState: { errors: errorsProfileName }
    } = useForm();

    const {
        watch: watchBio,
        register: registerBio,
        handleSubmit: handleSubmitBio,
        formState: { errors: errorsBio }
    } = useForm();

    const{mutate: saveNewProfileName, isLoading: isloadingProfile} = useMutation({
        mutationFn: (new_profile_name) => updateProfileName(new_profile_name),
        onSuccess: (data) => {
            onProfileNameChange(data.new_name);
            toast.success(data.message || "Profile name updated");
            navigate(`/${data.new_name}/settings`, {replace: true});
        },
        onError: (error) => {
            if (error.message === "Session expired. Please log in again.") {
                handleSessionExpired();
            }
            toast.error(error.message || "An Error occurred");
        }
    });

    const{mutate: saveNewBio, isLoading: isLoadingBio} = useMutation({
        mutationFn: (new_profile_bio) => updateProfileBio(new_profile_bio),
        onSuccess: (data) => {
            toast.success(data.message || "Profile bio updated");
            onProfileBioChange(data.new_bio);
        },
        onError: (error) => {
            if (error.message === "Session expired. Please log in again.") {
                handleSessionExpired();
            }
            toast.error(error.message || "An Error occurred");
        }
    });

    const {mutate: deleteCurrentProfile, isLoading: isDeleting} = useMutation({
        mutationFn: () => deleteProfile(),
        onSuccess: () => {
            localStorage.removeItem("current-profile");
            navigate("/profiles", {replace: true});
        },
        onError: (error) => {
            if (error.message === "Session expired. Please log in again.") {
                handleSessionExpired();
            }
            toast.error(error.message || "An Error occurred");
        }
    })

    const goToProfilesPage = () => {
        navigate("/profiles");
    };
    const onSubmitProfileName = (data) => {
        const trimmedUsername = data.change_user.trim();
        saveNewProfileName(trimmedUsername);
    };
    const onSubmitBio = (data) => {
        const trimmedProfileBio = data.profile_bio.trim();
        saveNewBio(trimmedProfileBio);
    }
    return (
        <>
            <form className="flex flex-col gap-5 mt-10" onSubmit={handleSubmitProfileName(onSubmitProfileName)}>
                <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-start md:items-center">
                    <label
                        htmlFor="change_user"
                        className="block font-instrumentSemiBold text-lightBlack-1 text-lg md:text-[1.2rem]"
                    >
                        Change Profile Name
                    </label>
                    <input
                        placeholder={profileName}
                        type="text"
                        className="pl-5 border-lightBlack-2 p-1 border-[0.5px] rounded-md focus:outline-none focus:border-primaryPurple focus:shadow-sm focus:shadow-primaryPurple w-full md:w-auto"
                        id="change_user"
                        maxLength="25"
                        {...registerProfileName("change_user", {
                            maxLength: "Max 25 char is allowed",
                            validate: (value) => value.trim() !== "" || "Whitespaces are not allowed",
                        })}
                        />
                        <span className="text-sm  md:text-[.9rem] mt-1 md:self-center">
                            {25 - (watchProfileName("change_user")?.length || 0)} characters remaining
                        </span>
                </div>
                {errorsProfileName.change_user && (
                    <p className="text-red font-instrumentBold mt-2">{errorsProfileName.change_user.message}</p>
                )}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2">
                        <Button disabled={isloadingProfile || isDeleting || isLoadingBio} type={"delete"} typeForm={false}
                                onclick={deleteCurrentProfile}>
                            {isDeleting ? <MiniSpinner/> : "Delete"}
                        </Button>
                        <Button type={"update"} typeForm={true}>
                            {isloadingProfile ? <MiniSpinner/> : "Update"}
                        </Button>
                    </div>
                </div>
                <hr className="my-5 border-t-[3px] border-light-grey-2 w-full"/>
            </form>
            <form className="flex flex-col gap-5 mt-10" onSubmit={handleSubmitBio(onSubmitBio)}>
                <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-start md:items-center">
                    <label
                        htmlFor="profile_bio"
                        className="block font-instrumentSemiBold text-lightBlack-1 text-lg md:text-[1.2rem]"
                    >
                        Profile Bio
                    </label>
                    <textarea
                        placeholder={profileBio ? profileBio : "Write a brief bio about yourself..."}
                        className="pl-5 border-lightBlack-2 p-1 border-[0.5px] rounded-md focus:outline-none focus:border-primaryPurple focus:shadow-sm focus:shadow-primaryPurple w-full md:w-1/2"
                        id="profile_bio"
                        maxLength="280"
                    rows="3"
                    {...registerBio("profile_bio", {
                        maxLength: "Max 280 char is allowed",
                        validate: (value) => value.trim() !== "" || "Whitespaces are not allowed",
                    })}
                />
                <span className="text-sm  md:text-[.9rem] mt-1 md:self-center">
                        {280 - (watchBio("profile_bio")?.length || 0)} characters remaining
                </span>
            </div>
            {errorsBio.profile_bio && (
                <p className="text-red font-instrumentBold mt-2">{errorsBio.profile_bio.message}</p>
            )}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-2">
                    <Button disabled={isloadingProfile || isDeleting || isLoadingBio} type={"delete"} typeForm={false}
                            onclick={deleteCurrentProfile}>
                        {isDeleting ? <MiniSpinner/> : "Delete"}
                    </Button>
                    <Button type={"update"} typeForm={true}>
                        {isloadingProfile || isLoadingBio ? <MiniSpinner/> : "Update"}
                    </Button>
                </div>
            </div>
            <hr className="my-5 border-t-[3px] border-light-grey-2 w-full"/>
        </form>
            <div className="text-end">
                <Button type={"change-profile"} typeForm={false} onclick={goToProfilesPage}
                        disabled={isloadingProfile || isDeleting || isLoadingBio}>
                    Change Profile
                </Button>
            </div>
        </>

    );
}

export default ManageProfile;