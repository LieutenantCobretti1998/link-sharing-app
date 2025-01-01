import {useDispatch, useSelector} from "react-redux";
import useHandleSessionExpired from "../CustomLogic/UseHandleSessionExpired.js";
import {useEffect, useState} from "react";
import useWindowSize from "../CommonComponents/UseWindowSize.jsx";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getLink} from "../API/DataFetchingApi.js";
import {setBackgroundColor, toggleModal} from "../SaveLogic/SaveSlice.js";
import {setShortenUrl} from "../ShortenUrl/ShortenUrlSlice.js";
import {backgrounds} from "../BackgroundImages/BackgroundImages.jsx";
import {platforms} from "../Platforms/PreDefaultPlatForms.jsx";
import Spinner from "../UI/Spinner.jsx";



function PreviewUserLinksGroup() {
    const dispatch = useDispatch();
    const handleSessionExpired = useHandleSessionExpired();
    const {profileBio} = useSelector((state) => state.saveChooses);
    const [coordinates, setCoordinates] = useState(null);
    const {width} = useWindowSize();
    const { id} = useParams();
    const {data: LinksGroupData, isLoading} = useQuery({
        queryKey: ["linksGroupPreview", id],
        queryFn: () => getLink(id),
        enabled: !!id,
        staleTime: 0,
        onError: (error) => {
            if (error.message === "Session expired. Please log in again.") {
                handleSessionExpired();
            }
        },
    });
    const {
        linksGroupName, links, shortDescription,
        linksGroupImage, textColor, commonColor,
        bioIncluded, backgroundColor, cardBackgroundColor, backgroundImage, showModal
        } =  LinksGroupData || {};

    useEffect(() => {
        dispatch(setBackgroundColor(backgroundColor));
    }, [backgroundColor, dispatch]);

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

    useEffect(() => {
        if (width <= 640) {
          setCoordinates({
              circle: { x: 115, y: 20 },
              rect1: { x: 80, y: 184 },
              rect2: { x: 20, y: 220 },
              text1: { x: 180, y: 195 },
              text2: { x: 175, y: 235 },
              shortDescription: { x: 160, y: 190 },
              bio: {x: 15, y: 260},
              links: links?.map((_, index) => (
                  {
                      x: 20,
                        y: 475 + index * 50,
                        width: 300,
                        height: 40,
                        textX: 60,
                        textY: 500 + index * 50,
                        iconX: 35,
                        iconY: 485 + index * 50,
                        arrowX: 270,
                        arrowY: 485 + index * 50,
                  }
              )),
          });
        } else { // Default for larger screens
          setCoordinates({
              circle: { x: 175, y: 20 },
              rect1: { x: 110, y: 195 },
              rect2: { x: 60, y: 220 },
              text1: { x: 245, y: 205 },
              text2: { x: 250, y: 238 },
              bio: {x: 50, y: 270},
              shortDescription: { x: 245, y: 230 },
              links: links?.map((_, index) => (
                  {
                      x: 25,
                        y: 475 + index * 60,
                        width: 450,
                        height: 40,
                        textX: 70,
                        textY: 500 + index * 60,
                        iconX: 35,
                        iconY: 488 + index * 60,
                        arrowX: 430,
                        arrowY: 488 + index * 60,
                  }
              )),
          });
        }
    }, [width, links]);

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

    if(isLoading || !coordinates) {
        return <Spinner />
    }
    console.log(10)
    return (
        <>
            <section
                className="max-xs:top-[-150px]  drop-shadow-md relative top-[-120px] rounded-xl h-[820px]"
                style={{
                    backgroundColor: cardBackgroundColor,
                    backgroundImage: `url(${getBackgroundImage(backgroundImage)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="500" height="820" className="max-xs:w-[350px]">
                    {!linksGroupImage ? (
                        <circle cx="245" cy="112" r="48" fill={commonColor}/>
                    ) : (
                        <foreignObject
                            x={coordinates.circle.x}
                            y={coordinates.circle.y}
                            width="150"
                            height="150"
                            clipPath="url(#screenClip)"

                            style={{borderColor: commonColor}}
                        >
                            <div className="w-full h-full">
                                <img
                                    src={linksGroupImage}
                                    alt="Links Group"
                                    className="w-full h-full object-cover rounded-full border-4"
                                    style={{borderColor: commonColor}}
                                />
                            </div>
                        </foreignObject>
                    )}

                    {/* Links Group Name */}
                    <rect className="max-xs:w-[200px]"
                          width="270"
                          height="20"
                          x={coordinates.rect1.x}
                          y={coordinates.rect1.y}
                          fill={commonColor}
                          rx="8"/>
                    <text
                        x={coordinates.text1.x}
                        y={coordinates.text1.y}
                        fill={textColor}
                        fontSize="12"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="max-xs:text-[10px]"
                    >
                        {linksGroupName}
                    </text>

                    {/* Short Description */}
                    <rect
                        width="378"
                        height="35"
                        x={coordinates.rect2.x}
                        y={coordinates.rect2.y}
                        fill={commonColor}
                        rx="4"
                        className="max-xs:w-[300px]"
                    />
                    <text
                        x={coordinates.text2.x}
                        y={coordinates.text2.y}
                        fill={textColor}
                        fontSize="14"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="max-xs:text-[10px]"
                    >
                        {shortDescription}
                    </text>

                    {/* Bio Section */}
                    {bioIncluded && (
                        <foreignObject
                            x={coordinates.bio.x}
                            y={coordinates.bio.y}
                            width="400"
                            height="240"
                            className="max-xs:w-[320px]"
                            >
                            <div
                                xmlns="http://www.w3.org/1999/xhtml"
                                style={{
                                    backgroundColor: commonColor,
                                    padding: '15px',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: 'start',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word',
                                    textAlign: 'left',
                                }}
                            >
                                <p style={{color: textColor, fontSize: '14px', margin: 0,}}>{profileBio}</p>
                            </div>
                        </foreignObject>
                    )}

                    {links.map((link, index) => {
                      const linkCoords = coordinates.links?.[index];
                      if (!linkCoords) return null;

                      return (
                        <g key={link.id} className="pointer-events-auto transition-transform duration-200 ease-in-out scale-100 hover:scale-105 [transform-box:fill-box] [transform-origin:center]">
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <rect
                              width={linkCoords.width}
                              height={linkCoords.height}
                              x={linkCoords.x}
                              y={linkCoords.y}
                              fill={getPlatformColor(link.label)}
                              rx="8"
                            />

                            {/* Platform Icon */}
                            <g transform={`translate(${linkCoords.iconX}, ${linkCoords.iconY})`}>
                              {getPlatformIcon(link.label)}
                            </g>

                            {/* Link Text */}
                            <text
                              x={linkCoords.textX}
                              y={linkCoords.textY}
                              fontSize="12"   // Make the font smaller if you wish
                              fill="white"
                            >
                              {link.label || `Link #${index + 1}`}
                            </text>

                            {/* Arrow Icon */}
                            <g transform={`translate(${linkCoords.arrowX}, ${linkCoords.arrowY})`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"  // slightly smaller arrow
                                height="14"
                                fill="none"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill="#fff"
                                  d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
                                />
                                  </svg>
                                </g>
                              </a>
                            </g>
                        );
                    })}
                </svg>
            </section>
        </>
    );
}

export default PreviewUserLinksGroup;
