import {useDispatch, useSelector} from "react-redux";
import {backgrounds} from "../BackgroundImages/BackgroundImages.jsx";
import {platforms} from "../Platforms/PreDefaultPlatForms.jsx";
import Modal from "../UI/Modal.jsx";
import {useEffect, useState} from "react";
import {setBlendedColor, toggleModal} from "../SaveLogic/SaveSlice.js";
import {averageColors, hexToRgb, rgbToHex} from "../Helpers/ColorsConversion.js";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getLink} from "../API/DataFetchingApi.js";
import Spinner from "../UI/Spinner.jsx";
import {setShortenUrl} from "../ShortenUrl/ShortenUrlSlice.js";

function Preview() {
    const dispatch = useDispatch();
    const [visible, setIsVisible] = useState(true);
    const { id} = useParams();
    const {data: LinksGroupData, isError: FailedRequest, isLoading} = useQuery({
        queryKey: ["linksGroupPreview", id],
        queryFn: () => getLink(id),
        enabled: !!id
    });
    const {
        linksGroupName, links, shortDescription,
        linksGroupImage, textColor, commonColor,
        backgroundColor, backgroundImage, showModal
        } = id ? LinksGroupData || {}: useSelector((state) => state.saveChooses);

    useEffect(() => {
    if (showModal) {
        const timer = setTimeout(() => {
            dispatch(toggleModal(false));
        }, 5000);
        return () => clearTimeout(timer);  // Clean up the timer
    }
}, [showModal]);

    useEffect(() => {
        if(LinksGroupData && LinksGroupData.shorten_url) {
            dispatch(setShortenUrl(LinksGroupData.shorten_url));
        }
    }, [LinksGroupData, dispatch]);

    const getBackgroundImage = (label) => {
        const background = backgrounds.find((image) => image.value === label);
        return background ? background.image: null;
    };
    const getPlatformColor = (label) => {
        const platform = platforms.find((p) => p.label === label);
        return platform ? platform.color : null;
    };
    const getPlatformIcon = (label) => {
        const platform = platforms.find((p) => p.label === label);
        return platform ? platform.icon : null;
    };

    const handleCalculateAverageColor = () => {
        const textColorRgb = hexToRgb(textColor);
        const commonColorRgb = hexToRgb(commonColor);
        const backgroundColorRgb = hexToRgb(backgroundColor);

        const avgRgb = averageColors([textColorRgb, commonColorRgb, backgroundColorRgb]);
        const blendedColor = rgbToHex(avgRgb.r, avgRgb.g, avgRgb.b);
        // document.body.style.backgroundColor = blendedColor;
        dispatch(setBlendedColor(blendedColor));
    }
    useEffect(() => {
       if (textColor && commonColor && backgroundColor) {
            if (
                textColor !== "#333333" &&
                commonColor !== "#D9D9D9" &&
                backgroundColor !== "#FFF"
            ) {
                handleCalculateAverageColor();
            }
        }
    }, [textColor, commonColor, backgroundColor]);
    if(isLoading && id) {
        return <Spinner />
    }
    return (
        <>
            <section className="drop-shadow-md relative top-[-120px] rounded-xl h-auto flex flex-col align-center justify-center"
                 style={{
                     backgroundColor: backgroundImage ? "white" : backgroundColor,
                     backgroundImage: `url(${getBackgroundImage(backgroundImage)})`,
                     backgroundSize: "cover",
                     backgroundPosition: "center"
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="585">
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
                    {links.map((link, index) => (
                    <g key={link.id}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <rect
                                width="237"
                                height="44"
                                x="35"
                                y={270 + index * 64}
                                fill={getPlatformColor(link.label)}
                                rx="8"
                            />
                            <g transform={`translate(45, ${284 + index * 64})`}>
                                {getPlatformIcon(link.label)}
                            </g>
                            <text
                                x="70"
                                y={296 + index * 64}  /* Text positioning inside the rect */
                                fontSize="14"
                                fill="white"
                            >
                                {link.label || `Link #${index + 1}`}
                            </text>
                            <g transform={`translate(250, ${284 + index * 64})`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
                                     viewBox="0 0 16 16">
                                    <path fill="#fff"
                                          d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"/>
                                </svg>
                            </g>
                        </a>
                    </g>
                ))}
                </svg>
            </section>
                <Modal text={"Please check the required fields in the profile section"} isVisible={showModal}/>
        </>
    );
}

export default Preview;
