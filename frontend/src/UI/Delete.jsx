import {useState} from "react";
import Button from "./Button.jsx";

function Delete({deleteLogic, setVisibility}) {
    const handleConfirmDelete = () => {
        deleteLogic();
        setVisibility(false);
    }
    const handleCancel = () => {
        setVisibility(false);
    }
    return (
        <div className="absolute bg-white bg-opacity-50 w-full h-full flex items-center justify-center">
                <div className="flex flex-col justify-center items-center">
                    <h3 className="text-2xl">Are you sure ?</h3>
                    <div className="flex gap-4">

                        <Button type="save" onclick={(e) => {e.stopPropagation(); handleConfirmDelete()}}>Yes</Button>
                        <Button type="save" onclick={(e) => {e.stopPropagation(); handleCancel()}}>No</Button>
                    </div>
                </div>
        </div>
    );
}

export default Delete;