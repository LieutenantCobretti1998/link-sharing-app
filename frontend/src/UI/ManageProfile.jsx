import {useForm} from "react-hook-form";
import MiniSpinner from "./MiniSpinner.jsx";
import Button from "./Button.jsx";
import {useMutation} from "@tanstack/react-query";
import {deleteProfile, updateProfileName} from "../API/Profiles.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import useHandleSessionExpired from "../CustomLogic/UseHandleSessionExpired.js";


// eslint-disable-next-line react/prop-types
function ManageProfile({onProfileNameChange}) {
    const profile_data = localStorage.getItem("current-profile");
    const handleSessionExpired = useHandleSessionExpired();
    const navigate = useNavigate();
    const parsedProfileData = profile_data ? JSON.parse(profile_data) : null;
    const profileName = parsedProfileData.profile_name;
    const {register, handleSubmit, formState: {errors} } = useForm();
    const{mutate: saveNewProfileName, isLoading} = useMutation({
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
    const goToProfilesPage = () => {
        navigate("/profiles");
    };

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
    const onSubmit = (data) => {
        const trimmedUsername = data.change_user.trim();
        saveNewProfileName(trimmedUsername);
    };
    return (
        <form className="flex flex-col gap-5 mt-10" onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("change_user", {
                        maxLength: "Max 25 char is allowed",
                        validate: (value) => value.trim() !== "" || "Whitespaces are not allowed",
                    })}
                />
            </div>
            {errors.change_user && (
                <p className="text-red font-instrumentBold mt-2">{errors.change_user.message}</p>
            )}
            <hr className="my-5 border-t-[3px] border-light-grey-2 w-full"/>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-2">
                    <Button disabled={isLoading || isDeleting} type={"delete"} typeForm={false} onclick={deleteCurrentProfile}>
                        {isDeleting ? <MiniSpinner/> : "Delete"}
                    </Button>
                    <Button type={"update"} typeForm={true}>
                        {isLoading ? <MiniSpinner/> : "Update"}
                    </Button>
                </div>
                    <Button type={"change-profile"} typeForm={false} onclick={goToProfilesPage} disabled={isLoading || isDeleting}>
                        Change Profile
                    </Button>
            </div>
        </form>

    );
}

export default ManageProfile;