import {useMutation, useQuery} from "@tanstack/react-query";
import getLinks from "../../GetLogic/GetMutation.js";
import Spinner from "../../UI/Spinner.jsx";
import {getBackgroundImage, getPlatformColor, getPlatformIcon} from "../../Helpers/SliceFunctions.js";


function AllLinks() {
    const {data, error, isLoading} = useQuery({
        queryKey: ["userLinks"],
        queryFn: getLinks,
        enabled: true
    })
    if (isLoading) {
        return <Spinner />;
    } else {
        return (
            <section
                className="w-full gap-10 h-min flex flex-wrap bg-white pl-10 pt-10 pb-10 rounded-md border-light-grey justify-between">
                {data.map((link, index) => (
                    <div
                        key={index}
                        className="w-[30%] drop-shadow-md rounded-xl h-auto flex flex-col align-center justify-center"
                        style={{
                            backgroundColor: link.backgroundImage ? "white" : link.backgroundColor,
                            backgroundImage: `url(${getBackgroundImage(link.backgroundImage)})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 300">
                            {!link.linksGroupImage ? (
                                <circle cx="100" cy="50" r="40" fill={link.commonColor}/>
                            ) : (
                                <foreignObject
                                    x="70"
                                    y="20"
                                    width="60"
                                    height="60"
                                    clipPath="url(#screenClip)"
                                    className="rounded-full border-4"
                                    style={{borderColor: link.commonColor}}
                                >
                                    <div className="w-full h-full">
                                        <img
                                            src={link.linksGroupImage}
                                            alt="Links Group"
                                            className="w-full h-full"
                                        />
                                    </div>
                                </foreignObject>
                            )}
                            {link.links.map((user_link, idx) => (
                                <g key={user_link.id}>
                                    <a href={user_link.url} target="_blank" rel="noopener noreferrer">
                                        <rect
                                            width="160"
                                            height="30"
                                            x="20"
                                            y={160 + idx * 40}
                                            fill={getPlatformColor(user_link.label)}
                                            rx="8"
                                        />
                                        <g transform={`translate(35, ${175 + idx * 40})`}>
                                            {getPlatformIcon(user_link.label)}
                                        </g>
                                        <text
                                            x="100"
                                            y={178 + idx * 40}
                                            fontSize="12"
                                            fill="white"
                                            textAnchor="middle"
                                        >
                                            {user_link.label || `Link #${idx + 1}`}
                                        </text>
                                        <g transform={`translate(180, ${175 + idx * 40})`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="none"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    fill="#fff"
                                                    d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
                                                />
                                            </svg>
                                        </g>
                                    </a>
                                </g>
                            ))}
                        </svg>

                    </div>
                ))}
            </section>

        )
    }
}

export default AllLinks;