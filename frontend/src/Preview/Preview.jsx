import {useSelector} from "react-redux";
import {backgrounds} from "../BackgroundImages/BackgroundImages.jsx";

function Preview() {
    const getBackgroundImage = (label) => {
        const background = backgrounds.find((image) => image.value === label);
        return background ? background.image: null;
    };
    const {linksGroupName, shortDescription, linksGroupImage, textColor, commonColor, backgroundColor, backgroundImage} = useSelector((state) => state.saveChooses);
    return (
            <div className="drop-shadow-md relative top-[-100px] rounded-xl h-auto flex flex-col align-center justify-center"
                 style={{
                     backgroundColor: backgroundImage ? "white" : backgroundColor,
                     backgroundImage: `url(${getBackgroundImage(backgroundImage)})`,
                     backgroundSize: "cover",
                     backgroundPosition: "center"
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="500">
                    {!linksGroupImage ? (
                        <circle cx="153.5" cy="112" r="48" fill={commonColor}/>
                    ) : (
                        <foreignObject x="105" y="64" width="96" height="96" clipPath="url(#screenClip)"
                                       className="rounded-full border-4" style={{borderColor: commonColor}}>
                            <div className="w-full h-full">
                                <img
                                    src={linksGroupImage}
                                    alt="Links Group"
                                    className="w-full h-full"
                                />
                            </div>
                        </foreignObject>
                    )}
                    <rect width="270" height="20" x="20" y="185" fill={commonColor} rx="8"/>
                    <text
                        x="155"
                        y="195"
                        fill={textColor}
                        fontSize="12"
                        textAnchor="middle"
                        dominantBaseline="middle"
                    >
                        {linksGroupName}
                    </text>
                    <rect width="278" height="30" x="15" y="214" fill={commonColor} rx="4"/>
                    <text
                        x="155"
                        y="230"
                        fill={textColor}
                        fontSize="10"
                        textAnchor="middle"
                        dominantBaseline="middle"

                    >
                        {shortDescription}
                    </text>
                </svg>
            </div>
    );
}

export default Preview;