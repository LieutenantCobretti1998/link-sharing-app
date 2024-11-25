// eslint-disable-next-line react/prop-types
function Button({type, children, isActive, onclick, disabled, typeForm}) {
    let buttonClasses;
    switch (type) {
        case "backToEditor":
            buttonClasses = "max-xs:p-1 sm:w-40 border-[.5px] border-primaryPurple h-9 p-1 bg-primaryPurple rounded-md text-white font-bold hover:bg-lightPurple3 transition duration-300 ease-in-out"
            break;
        case "home":
            buttonClasses = disabled
                ? "cursor-default"
                : "cursor-pointer"
            break;
        case "home-preview":
            buttonClasses = "max-xs:w-28 sm:w-40 h-9 p-0 border-[.5px] border-primaryPurple " +
                "rounded-md text-white font-bold bg-primaryPurple hover:bg-primaryPurple3 transition duration-300 ease-in-out";
            break;
        case "header":
            buttonClasses = "max-xs:w-[1.8rem] sm:border-primaryPurple sm:border-[.5px] max-sm:w-15 w-40 h-9 p-0" +
                " sm:hover:bg-lightPurple2 rounded-md text-primaryPurple font-bold transition duration-300 ease-in-out";
            break;
        case "main":
            buttonClasses = disabled
            ? "w-full h-9 p-0 border-[.5px] border-gray-300 rounded-md text-gray-300 font-bold cursor-not-allowed transition duration-300 ease-in-out"
            : "w-full h-9 p-0 border-[.5px] border-primaryPurple rounded-md text-primaryPurple font-bold hover:bg-lightPurple2 cursor-pointer transition duration-300 ease-in-out";
            break;
        case "addLink":
            buttonClasses = disabled
            ? "w-full h-9 p-0 border-[.5px] border-gray-300 rounded-md text-gray-300 font-bold cursor-not-allowed transition duration-300 ease-in-out"
            : "w-full h-9 p-0 border-[.5px] border-primaryPurple rounded-md text-primaryPurple font-bold hover:bg-lightPurple2 transition duration-300 ease-in-out";
            break;
        case "login":
            buttonClasses = disabled ?
                "mt-6 p-2 w-full h-auto hover:bg-primaryPurple cursor-not-allowed rounded-md text-white bg-lightPurple1 font-regular transition duration-300 ease-in-out":
                "mt-6 p-2 w-full h-auto hover:bg-primaryPurple rounded-md text-white bg-lightPurple1 font-regular transition duration-300 ease-in-out"
            break;
        case "logout":
            buttonClasses = disabled ?
                "mt-6 p-2 w-[75px] h-auto hover:bg-dark-red rounded-md text-white bg-red font-regular transition duration-300 ease-in-out pointer-events-none cursor-not-allowed":
                "mt-6 p-2 w-[75px] h-auto hover:bg-dark-red rounded-md text-white bg-red font-regular transition duration-300 ease-in-out"
            break;
        case "save":
            buttonClasses = disabled
            ? "max-sm:w-full w-24 h-9 p-0 border-[.5px] border-gray-300 rounded-md text-gray-300 font-bold pointer-events-none cursor-not-allowed transition duration-300 ease-in-out"
            : "max-sm:w-full w-24 h-9 p-0 hover:bg-primaryPurple rounded-md text-white bg-lightPurple1 font-regular transition duration-300 ease-in-out";
            break;
        case "yes":
            buttonClasses = disabled
            ? "w-24 h-9 p-0 border-[.5px] border-gray-300 rounded-md text-gray-300 font-bold pointer-events-none cursor-not-allowed transition duration-300 ease-in-out"
            : "w-24 h-9 p-0 hover:bg-primaryPurple rounded-md text-white bg-lightPurple1 font-regular transition duration-300 ease-in-out";
            break;
        case "no":
            buttonClasses = disabled
            ? "w-24 h-9 p-0 border-[.5px] border-gray-300 rounded-md text-gray-300 font-bold pointer-events-none cursor-not-allowed transition duration-300 ease-in-out"
            : "w-24 h-9 p-0 hover:bg-primaryPurple rounded-md text-white bg-lightPurple1 font-regular transition duration-300 ease-in-out";
            break;
        case "links":
           buttonClasses = isActive
            ? "bg-lightPurple2 rounded-md pointer-events-none"
            : "hover:bg-lightPurple2 hover:border-lightPurple2 rounded-md transition duration-300";
           break;

        case "shareLink":
            buttonClasses = "max-xs:w-28 w-40 h-9 p-0 border-[.5px] border-primaryPurple " +
                "rounded-md text-white font-bold bg-primaryPurple hover:bg-primaryPurple3 transition duration-300 ease-in-out";
            break;
        case "update":
            buttonClasses = disabled ?
                "mt-6 p-2 w-[75px] h-auto hover:bg-successGreenDark rounded-md text-white bg-successGreen font-regular transition duration-300 ease-in-out pointer-events-none cursor-not-allowed":
                "mt-6 p-2 w-[75px] h-auto hover:bg-successGreenDark rounded-md text-white bg-successGreen font-regular transition duration-300 ease-in-out"
            break;
        case "delete":
            buttonClasses = disabled ?
                "mt-6 p-2 w-[75px] h-auto hover:bg-dark-red rounded-md text-white bg-red font-regular transition duration-300 ease-in-out pointer-events-none cursor-not-allowed":
                "mt-6 p-2 w-[75px] h-auto hover:bg-dark-red rounded-md text-white bg-red font-regular transition duration-300 ease-in-out"
            break;
        case "change-profile":
            buttonClasses = disabled ?
                " mt-6 p-2 w-[150px] h-auto hover:bg-primaryPurple pointer-events-none cursor-not-allowed rounded-md text-white bg-lightPurple1 font-regular transition duration-300 ease-in-out":
                "mt-6 p-2 w-[150px] h-auto h-auto hover:bg-primaryPurple rounded-md text-white bg-lightPurple1 font-regular transition duration-300 ease-in-out"
            break;
        case "confirmUserDeletion":
            buttonClasses = disabled ?
                "mt-6 p-2 w-[75px] h-auto hover:bg-dark-red rounded-md text-white bg-red font-regular transition duration-300 ease-in-out pointer-events-none cursor-not-allowed":
                "mt-6 p-2 w-[75px] h-auto hover:bg-dark-red rounded-md text-white bg-red font-regular transition duration-300 ease-in-out"
            break;
        case "cancelUserDeletion":
            buttonClasses = disabled ?
                "mt-6 p-2 w-[75px] h-auto hover:bg-successGreenDark rounded-md text-white bg-successGreen font-regular transition duration-300 ease-in-out pointer-events-none cursor-not-allowed":
                "mt-6 p-2 w-[75px] h-auto hover:bg-successGreenDark rounded-md text-white bg-successGreen font-regular transition duration-300 ease-in-out"
            break;
        case "closeModalWindow":
            buttonClasses = "absolute top-4 right-4 group";
            break;
    }
    return (
        <button type={typeForm ? "submit": "button"} disabled={disabled} onClick={onclick} className={buttonClasses}>{children}</button>
    );
}

export default Button;