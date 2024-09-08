function Button({type, children, isActive, onclick}) {
    let buttonClasses;

    switch (type) {
        case "header":
            buttonClasses = "w-24 h-9 p-0 border-[.5px] border-primaryPurple " +
                "rounded-md text-primaryPurple font-bold hover:bg-lightPurple2 transition duration-300 ease-in-out";
            break;
        case "main":
            buttonClasses = "w-full h-9 p-0 border-[.5px] " +
                "border-primaryPurple rounded-md text-primaryPurple " +
                "font-bold hover:bg-lightPurple2 transition duration-300 ease-in-out";
            break;

        case "save":
            buttonClasses = "w-24 h-9 p-0 hover:bg-primaryPurple rounded-md text-white bg-lightPurple1 font-regular transition duration-300 ease-in-out";
            break;

        case "links":
           buttonClasses = isActive
            ? "bg-lightPurple2 rounded-md pointer-events-none"
            : "hover:bg-lightPurple2 hover:border-lightPurple2 rounded-md transition duration-300";
    }
    return (
        <button onClick={onclick} className={buttonClasses}>{children}</button>
    );
}

export default Button;