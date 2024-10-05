import {useState} from "react";

function Delete({deleteLogic, setVisibility}) {
    const handleConfirmDelete = () => {
        deleteLogic();
        setVisibility(false);
    }
    const handleCancel = () => {
        setVisibility(false);
    }
    return (
        <div>
            <div>
                <h3>Are you sure you want to delete the linksGroup ?😔</h3>
                <div>
                    <button onClick={handleConfirmDelete}>Yes</button>
                    <button onClick={handleCancel}>No</button>
                </div>
            </div>
        </div>
    );
}

export default Delete;