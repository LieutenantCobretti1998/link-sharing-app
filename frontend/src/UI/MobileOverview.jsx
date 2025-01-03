import {useSelector} from "react-redux";


// eslint-disable-next-line react/prop-types
function MobileOverview({links, profile, getPlatformColor, getPlatformIcon, getBackgroundImage}) {
     const {linksGroupName, shortDescription, linksGroupImage, textColor, commonColor, cardBackgroundColor, backgroundImage} = useSelector((state) => state.profile);
    return (
        <section
            className="w-[45%] h-min flex justify-center items-center bg-white pt-10 pb-10 rounded-md border-light-grey">
            <svg xmlns="http://www.w3.org/2000/svg" width="308" height="632" fill="none" viewBox="0 0 308 632">
                <path stroke="#737373"
                      d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"/>
                <path fill={backgroundImage ? "#FFF" : cardBackgroundColor} stroke="#737373"
                      d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"/>
                <defs>
                    <clipPath id="screenClip">
                        <rect
                            x="12"
                            y="40"
                            width="284"
                            height="565"
                            rx="28"
                            ry="28"/>
                    </clipPath>
                </defs>
                <image
                    href={getBackgroundImage(profile.backgroundImage)}
                    x="12"
                    y="40"
                    width="284"
                    height="565"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#screenClip)"
                >
                </image>
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
                {/*<rect width="80" height="8" x="113" y="235" fill="#EEE" rx="4"/>*/}
                {links.map((link, index) => (
                    <g key={link.id}>
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
                    </g>
                ))}
            </svg>
        </section>
    );
}

export default MobileOverview;