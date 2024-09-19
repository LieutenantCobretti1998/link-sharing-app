import {useSelector} from "react-redux";

function Preview() {
    const {linksGroupName, shortDescription, linksGroupImage, textColor, commonColor} = useSelector((state) => state.profile);
    return (
            <div className="bg-white drop-shadow-md relative top-[-100px] rounded-xl h-auto flex flex-col align-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="500">
                    <circle cx="153.5" cy="112" r="48" fill="black"/>
                    <rect width="270" height="20" x="20" y="185" fill="black" rx="8"/>
                    <rect width="278" height="30" x="15" y="214" fill="black" rx="4"/>
                </svg>

            </div>
    );
}

export default Preview;