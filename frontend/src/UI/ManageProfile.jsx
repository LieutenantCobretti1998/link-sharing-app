import {useForm} from "react-hook-form";
import MiniSpinner from "./MiniSpinner.jsx";
import Button from "./Button.jsx";


function ManageProfile() {
    const profile_data = localStorage.getItem("current-profile");
    const parsedProfileData = profile_data ? JSON.parse(profile_data) : null;
    const profileName = parsedProfileData.profile_name;
    const {register, handleSubmit, formState: {errors} } = useForm();
    return (
        <form className="flex gap-5 mt-10">
            <div className="flex gap-10 items-center">
                <label htmlFor="change-user" className="block font-instrumentSemiBold text-lightBlack-1 text-[1.2rem]">Change Profile Name</label>
                <input
                    placeholder={profileName}
                    type="text"
                    className="pl-10 border-lightBlack-2  p-1 border-[.5px] rounded-md focus:outline-none focus:border-primaryPurple focus:shadow-sm focus:shadow-primaryPurple"
                    id="change-user"
                    maxLength="25"
                    {...register("change-user", {
                        maxLength: "Max 25 char is allowed",
                        validate: (value) => value.trim() !== "" || "Pure whitespaces are not allowed"
                    })}
                />
            </div>
            <div className="absolute w-full inset-x-0 top-[85%]">
                <hr className="my-3 border-t-[3px] border-light-grey-2  w-full"/>
            </div>
            <div className="absolute top-[88%] left-[90%]">
                <Button type={"login"} typeForm={true}>{"Update"}</Button>
            </div>
        </form>
    );
}

export default ManageProfile;