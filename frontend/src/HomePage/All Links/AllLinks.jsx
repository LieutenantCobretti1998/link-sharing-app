import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteLink, getLinks} from "../../API/DataFetchingApi.js";
import Spinner from "../../UI/Spinner.jsx";
import {getBackgroundImage, getPlatformColor, getPlatformIcon} from "../../Helpers/SliceFunctions.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


function AllLinks() {
    const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {data, error, isLoading} = useQuery({
        queryKey: ["userLinks"],
        queryFn: () => getLinks(),
        enabled: true,
    });
    const {mutate:deleteLinkGroup, isError, isLoading: isDeleting} = useMutation({
        mutationFn: deleteLink,
        onSuccess: () => {
            queryClient.invalidateQueries("userLinks");
        }
    })



    const editLink = function (id) {
        navigate(`/edit-links/${id}`);
    }

    const deleteUserLink = function (id) {
        deleteLinkGroup(id)
    }

    if (isLoading && isDeleting) {
        return <Spinner />;
    } else {
        return (
            <div className="flex flex-col">
            <section
                className="w-full  h-full flex flex-wrap gap-10  bg-white p-10 rounded-md border-light-grey ">
                {data.map((link, index) => (
                    <div
                        key={link.id}
                        className="w-[200px] card-container relative drop-shadow-md rounded-xl h-auto flex flex-col items-center justify-center"
                        style={{
                            backgroundColor: link.backgroundImage ? "white" : link.backgroundColor,
                            backgroundImage: `url(${getBackgroundImage(link.backgroundImage)})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                        onMouseEnter={() => setHoveredCardIndex(index)}
                        onMouseLeave={() => setHoveredCardIndex(null)}
                    >
                        {hoveredCardIndex === index && (
                            <>
                                <div
                                    className="delete-icon"
                                    onClick={() => deleteUserLink(link.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon h-5 w-5" viewBox="0 0 512 512">
                                        <path
                                            d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
                                            fill="none" stroke="currentColor" strokeLinecap="round"
                                            strokeLinejoin="round" strokeWidth="32"/>
                                        <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10"
                                              strokeWidth="32" d="M80 112h352"/>
                                        <path
                                            d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224"
                                            fill="none" stroke="currentColor" strokeLinecap="round"
                                            strokeLinejoin="round" strokeWidth="32"/>
                                    </svg>
                                </div>
                                <div
                                    className="edit-icon"
                                    onClick={() => editLink(link.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon h-5 w-5"
                                         viewBox="0 0 512 512">
                                        <path
                                            d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48"
                                            fill="none" stroke="currentColor" strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="32"/>
                                        <path
                                            d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z"/>
                                    </svg>
                                </div>

                            </>
                        )}
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
                                    <rect
                                        width="160"
                                        height="30"
                                        x="20"
                                        y={85 + idx * 40}
                                        fill={getPlatformColor(user_link.label)}
                                        rx="8"
                                    />
                                    <g transform={`translate(35, ${90 + idx * 40})`}>
                                        {getPlatformIcon(user_link.label)}
                                    </g>
                                    <text
                                        x="100"
                                        y={105 + idx * 40}
                                        fontSize="12"
                                        fill="white"
                                        textAnchor="middle"
                                    >
                                        {user_link.label || `Link #${idx + 1}`}
                                    </text>
                                    <g transform={`translate(165, ${95 + idx * 40})`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="none"
                                             viewBox="0 0 16 16">
                                            <path
                                                fill="#fff"
                                                d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
                                            />
                                        </svg>
                                    </g>
                                </g>
                            ))}
                        </svg>
                        <div className="text-center mt-4 w-full card-hover-content">
                            <h1 className="group-name">{link.linksGroupName}</h1>
                            <h2 className="category-name text-gray-500">{link.category}</h2>
                        </div>
                    </div>
                ))}
            </section>
            <div className="flex self-end justify-center mt-4">
                <button
                    className="mr-2 px-4 py-2 bg-gray-200 rounded-md"
                >
                    Previous
                </button>

                <span className="px-4 py-2">10</span>

                <button
                    className="ml-2 px-4 py-2 bg-gray-200 rounded-md"
                >
                    Next
                </button>
            </div>
    </div>
        )
    }
}

export default AllLinks;
