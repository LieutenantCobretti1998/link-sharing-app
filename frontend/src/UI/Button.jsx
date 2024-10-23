function Button({type, children, isActive, onclick, disabled, typeForm}) {
    let buttonClasses;
    switch (type) {
        case "home":
            buttonClasses = disabled
                ? "cursor-default"
                : "cursor-pointer"
            break;
        case "header":
            buttonClasses = "w-40 h-9 p-0 border-[.5px] border-primaryPurple " +
                "rounded-md text-primaryPurple font-bold hover:bg-lightPurple2 transition duration-300 ease-in-out";
            break;
        case "main":
            buttonClasses = disabled
            ? "w-full h-9 p-0 border-[.5px] border-gray-300 rounded-md text-gray-300 font-bold cursor-not-allowed transition duration-300 ease-in-out"
            : "w-full h-9 p-0 border-[.5px] border-primaryPurple rounded-md text-primaryPurple font-bold hover:bg-lightPurple2 transition duration-300 ease-in-out";
            break;
        case "login":
            buttonClasses = "mt-6 p-2 w-full h-auto hover:bg-primaryPurple rounded-md text-white bg-lightPurple1 font-regular transition duration-300 ease-in-out"
            break;
        case "save":
            buttonClasses = disabled
            ? "w-24 h-9 p-0 border-[.5px] border-gray-300 rounded-md text-gray-300 font-bold pointer-events-none cursor-default transition duration-300 ease-in-out"
            : "w-24 h-9 p-0 hover:bg-primaryPurple rounded-md text-white bg-lightPurple1 font-regular transition duration-300 ease-in-out";
            break;

        case "links":
           buttonClasses = isActive
            ? "bg-lightPurple2 rounded-md pointer-events-none"
            : "hover:bg-lightPurple2 hover:border-lightPurple2 rounded-md transition duration-300";
           break;

        case "shareLink":
            buttonClasses = "w-40 h-9 p-0 border-[.5px] border-primaryPurple " +
                "rounded-md text-white font-bold bg-primaryPurple hover:bg-primaryPurple3 transition duration-300 ease-in-out";
            break;
    }
    return (
        <button type={typeForm && "submit"} disabled={type==="main" && disabled} onClick={onclick} className={buttonClasses}>{children}</button>
    );
}

export default Button;