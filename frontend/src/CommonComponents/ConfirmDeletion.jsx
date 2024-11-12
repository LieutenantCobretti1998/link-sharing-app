import Button from "../UI/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteAccount} from "../API/deleteAccount.js";
import toast from "react-hot-toast";
import MiniSpinner from "../UI/MiniSpinner.jsx";
import {useContext} from "react";
import {ProfileContext} from "../CustomLogic/ProfileProvider.jsx";


function ConfirmDeletion({setIsOpen, resetMenu}) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { setChosenProfile } = useContext(ProfileContext);
    const {mutate: deleteAccountPermanently, isLoading} = useMutation({
        mutationFn: () => deleteAccount(),
        onSuccess: data => {
            setChosenProfile(null);
            queryClient.clear();
            navigate("/login");
            toast.success(data.message || "Profile name updated");
        },
        onError: (error) => {
            toast.error(error.message || "An Error occurred");
        }
    })

    return (
        <div className="fixed inset-0 bg-lightBlack-1 bg-opacity-50 flex items-center justify-center z-[1000]">
            <div className="max-xs:p-6 max-xs:max-w-[15rem] bg-white p-5 rounded-lg max-w-md w-full mx-auto text-center">
                <h2 className="max-xs:text-base text-xl font-bold mb-4">Are you sure?</h2>
                <p className="max-xs:text-[.9rem] mb-6">Do you really want to delete your account? All profiles will be deleted🥲.</p>
                <div className="flex justify-center space-x-4">
                    <Button disabled={isLoading} type="confirmUserDeletion" onclick={() => deleteAccountPermanently()}>{isLoading ? <MiniSpinner/> : "Yes"}</Button>
                    <Button disabled={isLoading}  type="cancelUserDeletion" onclick={() => {setIsOpen(false); resetMenu("Manage Profile")}}>No</Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeletion;