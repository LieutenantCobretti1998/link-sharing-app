import {useForm} from "react-hook-form";
import MiniSpinner from "./MiniSpinner.jsx";
import Button from "./Button.jsx";
import {useMutation} from "@tanstack/react-query";
import {deleteProfile, updateProfileName} from "../API/Profiles.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../CustomLogic/AuthProvider.jsx";
import useHandleSessionExpired from "../CustomLogic/UseHandleSessionExpired.js";


function ManageProfile({onProfileNameChange}) {
    const profile_data = localStorage.getItem("current-profile");
    const handleSessionExpired = useHandleSessionExpired();
    const { refreshAuthStatus } = useContext(AuthContext)
    const navigate = useNavigate();
    const parsedProfileData = profile_data ? JSON.parse(profile_data) : null;
    const profileName = parsedProfileData.profile_name;
    const {register, handleSubmit, formState: {errors} } = useForm();
    const{mutate: saveNewProfileName, isLoading} = useMutation({
        mutationFn: (new_profile_name) => updateProfileName(new_profile_name),
        onSuccess: (data) => {
            onProfileNameChange(data.new_name);
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
            refreshAuthStatus();
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
            <div className="flex gap-10 items-center">
                <label htmlFor="change-user" className="block font-instrumentSemiBold text-lightBlack-1 text-[1.2rem]">
                    Change Profile Name
                </label>
                <input
                    placeholder={profileName}
                    type="text"
                    className="pl-5 border-lightBlack-2  p-1 border-[.5px] rounded-md focus:outline-none focus:border-primaryPurple focus:shadow-sm focus:shadow-primaryPurple"
                    id="change_user"
                    maxLength="25"
                    {...register("change_user", {
                        maxLength: "Max 25 char is allowed",
                        validate: (value) => value.trim() !== "" || "Whitespaces are not allowed"
                    })}
                />
                {errors.change_user &&
                    <p className="text-red text-end font-instrumentBold ">{errors.change_user.message}</p>}
            </div>
            <div className="absolute w-full inset-x-0 top-[85%]">
                <hr className="my-3 border-t-[3px] border-light-grey-2  w-full"/>
            </div>
            <div className="top-[88%] left-[2%]">
                <Button type={"delete"} typeForm={false} onclick={deleteCurrentProfile}>{isDeleting ? <MiniSpinner/> : "Delete"}</Button>
            </div>
            <div className="absolute top-[88%] left-[2%]">
                <Button type={"login"} typeForm={false} onclick={goToProfilesPage}>Change profile</Button>
            </div>
            <div className="absolute top-[88%] left-[90%]">
                <Button type={"update"} typeForm={true}>{isLoading ? <MiniSpinner/> : "Update"}</Button>
            </div>
        </form>
    );
}

export default ManageProfile;