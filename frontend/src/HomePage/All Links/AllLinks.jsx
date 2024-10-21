import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteLink, getLinks} from "../../API/DataFetchingApi.js";
import Spinner from "../../UI/Spinner.jsx";
import {getBackgroundImage, getPlatformColor, getPlatformIcon} from "../../Helpers/SliceFunctions.js";
import {useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import ServerError from "../../UI/Errors/ServerError.jsx";
import Pagination from "../../UI/Pagination.jsx";
import {DEFAULT_PAGE, PER_PAGE} from "../../UI/GlobalVariables.js";
import Delete from "../../UI/Delete.jsx";
import {useSelector} from "react-redux";


function AllLinks() {
    const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
    const [visible, setVisible] = useState(false);
    let [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || DEFAULT_PAGE;
    const search = searchParams.get("search") || "";
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const profile_data = localStorage.getItem("current-profile");
    const parsedProfileData = profile_data ? JSON.parse(profile_data) : null;
    const profileName = parsedProfileData.profile_name;
    const {mutate:deleteLinkGroup, isError: DeleteLinkError, isLoading: isDeleting} = useMutation({
        mutationFn: deleteLink,
        onSuccess: () => {
            queryClient.resetQueries({
                queryKey: ["userLinks", parseInt(page), search],
            });
        },
    });
    const {data, isError: AllLinksError, isLoading} = useQuery({
        queryKey: ["userLinks", parseInt(page), search],
        queryFn: () => {
            const cachedData = queryClient.getQueryData(["userLinks", parseInt(page), search]);
            if (cachedData) {
                return cachedData;
            }
            return getLinks(page.toString(), search);
        },
        onSuccess: (fetchedData) => {
             const totalPages = Math.ceil(fetchedData.total_links / fetchedData.per_page);
             const currentPage = parseInt(searchParams.get("page")) || 1;
            if (currentPage > totalPages && currentPage !== 1) {
                setSearchParams({ page: (currentPage - 1).toString() });
            }
        },
        enabled: true,
        keepPreviousData: true,
    });
    const links = data?.links || [];
    const currentPage = data?.current_page || DEFAULT_PAGE;
    const perPage = data?.per_page || Number(PER_PAGE);
    const totalLinks = data?.total_links || 0;
    const totalPages = Math.ceil(totalLinks / perPage);
    const handlePrevious = function () {
        if (currentPage > 1) {
            const updatedParams = new URLSearchParams(searchParams);

            if (search === "") {
                updatedParams.delete("search");
            }

            updatedParams.set("page", (currentPage - 1).toString());
            setSearchParams(updatedParams);
        }
    };
    const handleNext = function () {
        if (data && currentPage < totalPages) {
            const updatedParams = new URLSearchParams(searchParams);

            if (search === "") {
                updatedParams.delete("search");
            }

            updatedParams.set("page", (currentPage + 1).toString());
            setSearchParams(updatedParams);
        }
    }

    const editLink = function (id) {
        navigate(`${profileName}/edit-links/${id}`);
    };

    const deleteUserLink = function (id) {
        deleteLinkGroup(id);
    };

    const toggleDeleteWindow = () => {
        setVisible(true);
    }

    if (isLoading || isDeleting) {
        return <Spinner />;
    }
    else if(AllLinksError || DeleteLinkError) {
        return <ServerError />
    }
    else if(links.length === 0) {
        return (
            <div className="flex bg-light-grey items-center flex-col p-10 gap-4 pb-12 rounded-md border-light-grey">
                <svg xmlns="http://www.w3.org/2000/svg" width="250" height="161" fill="none" viewBox="0 0 250 161">
                    <path fill="#fff"
                          d="M48.694 15.421C23.379 25.224 4.594 50.068.858 80.128c-3.12 25.331 4.335 53.318 48.23 61.291 85.406 15.52 173.446 17.335 193.864-24.525 20.417-41.86-7.525-108.891-50.873-113.53C157.683-.326 98.146-3.721 48.694 15.42Z"
                          opacity=".3"/>
                    <path fill="#333"
                          d="M157.022 9.567H93.044a7.266 7.266 0 0 0-7.266 7.267v120.91a7.266 7.266 0 0 0 7.266 7.266h63.978a7.266 7.266 0 0 0 7.267-7.266V16.834a7.266 7.266 0 0 0-7.267-7.267Z"/>
                    <path fill="#333" d="M125.033 140.872a5.687 5.687 0 1 0 0-11.374 5.687 5.687 0 0 0 0 11.374Z"
                          opacity=".03"/>
                    <path fill="#EFEBFF" d="M156.628 21.321H93.431V126.78h63.197V21.321Z"/>
                    <path fill="#333" d="M117.797 120.508a2.065 2.065 0 1 0 0-4.13 2.065 2.065 0 0 0 0 4.13Z"
                          opacity=".03"/>
                    <path fill="#fff" d="M125.033 120.508a2.066 2.066 0 1 0 0-4.132 2.066 2.066 0 0 0 0 4.132Z"
                          opacity=".44"/>
                    <path fill="#333"
                          d="M132.269 120.508a2.066 2.066 0 1 0 0-4.132 2.066 2.066 0 0 0 0 4.132ZM148.199 32.953h-46.332v39.552h46.332V32.953ZM134.373 80.129h-32.506v3.621h32.506V80.13ZM148.199 80.129h-11.632v3.621h11.632V80.13ZM117.053 91.237h-15.186v3.622h15.186v-3.622ZM148.199 91.237H120.28v3.622h27.919v-3.622ZM136.954 102.353h-35.087v3.622h35.087v-3.622Z"
                          opacity=".03"/>
                    <path fill="#EFEBFF" d="M78.656 21.321H15.459V126.78h63.197V21.321Z"/>
                    <path fill="#fff" d="M39.825 120.508a2.065 2.065 0 1 0 0-4.13 2.065 2.065 0 0 0 0 4.13Z"
                          opacity=".44"/>
                    <path fill="#333"
                          d="M47.061 120.508a2.065 2.065 0 1 0 0-4.13 2.065 2.065 0 0 0 0 4.13ZM54.297 120.508a2.065 2.065 0 1 0 0-4.13 2.065 2.065 0 0 0 0 4.13ZM70.227 32.953H23.895v39.552h46.332V32.953ZM56.4 80.129H23.895v3.621H56.4V80.13ZM70.227 80.129H58.595v3.621h11.632V80.13ZM39.08 91.237H23.896v3.622H39.08v-3.622ZM70.227 91.237h-27.92v3.622h27.92v-3.622ZM58.982 102.353H23.895v3.622h35.087v-3.622Z"
                          opacity=".03"/>
                    <path fill="#EFEBFF" d="M234.6 21.321h-63.197V126.78H234.6V21.321Z"/>
                    <path fill="#333"
                          d="M195.769 120.508a2.065 2.065 0 1 0 0-4.13 2.065 2.065 0 0 0 0 4.13ZM203.005 120.508a2.066 2.066 0 1 0 0-4.132 2.066 2.066 0 0 0 0 4.132Z"
                          opacity=".03"/>
                    <path fill="#fff"
                          d="M210.242 120.508a2.066 2.066 0 1 0-.001-4.131 2.066 2.066 0 0 0 .001 4.131Z"
                          opacity=".44"/>
                    <path fill="#333"
                          d="M226.171 32.953h-46.332v39.552h46.332V32.953ZM212.345 80.129h-32.506v3.621h32.506V80.13ZM226.171 80.129h-11.632v3.621h11.632V80.13ZM195.025 91.237h-15.186v3.622h15.186v-3.622ZM226.179 91.237H198.26v3.622h27.919v-3.622ZM214.926 102.353h-35.087v3.622h35.087v-3.622Z"
                          opacity=".03"/>
                    <path fill="#333"
                          d="M146.597 145.041c0-.76-1.61-31.891-.577-36.522 1.033-4.632 10.509-27.274 8.011-29.917-2.498-2.642-11.648 3.372-11.648 3.372s1.671-27.267-2.278-29.21c-3.948-1.944-5.702 5.671-5.702 5.671L132.3 88.936l-10.418 55.96 24.715.145Z"
                          opacity=".1"/>
                    <path fill="#F4A28C"
                          d="M139.559 113.295c1.328-5.316 3.325-10.502 4.601-15.87.843-3.553 6.295-18.405 7.821-22.779.47-1.344.873-2.969-.038-4.062a2.646 2.646 0 0 0-2.422-.76 4.842 4.842 0 0 0-2.339 1.223c-1.519 1.337-4.32 7.95-6.371 7.943-2.482 0-1.313-6.834-1.381-8.148-.281-5.656.136-12.908-2.073-18.223-1.64-3.948-5.71-3.417-6.667.85-.957 4.268-.919 22.15-.919 22.15s-15.884-2.727-18.595 2.118c-2.711 4.844 1.868 35.618 1.868 35.618l26.515-.06Z"/>
                    <path fill="#633CFF" d="m141.495 160.5-.289-48.906-29.681-6.515L99.574 160.5h41.921Z"/>
                    <path fill="#333" d="m141.495 160.5-.289-48.906-14.168-3.113-2.536 52.019h16.993Z"
                          opacity=".1"/>
                </svg>

                <h2 className="font-bold text-lightBlack-1 text-3xl">No Links Found😒</h2>
                <p className="text-center w-70%"> Use the “Create New Group” button to get started. Once you have
                    more than one link, you can organize and customize them.
                    We're here to help you showcase and share your profiles with ease!
                </p>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col w-full">
                <section
                        className="w-full  h-full flex hover:cursor-pointer flex-wrap gap-10 bg-white p-10 rounded-md border-light-grey ">
                        {links.map((link, index) => (
                            <div
                                key={link.id}
                                className="w-[270px] card-container relative drop-shadow-md rounded-xl h-auto flex flex-col items-center justify-center"
                                style={{
                                    backgroundColor: link.backgroundImage ? "white" : link.backgroundColor,
                                    backgroundImage: `url(${getBackgroundImage(link.backgroundImage)})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                                onClick={() => navigate(`/${profileName}/preview-linksGroup/${link.id}`)}
                                onMouseEnter={() => setHoveredCardIndex(index)}
                                onMouseLeave={() => {
                                    setHoveredCardIndex(null);
                                    setVisible(false);
                                }}
                            >
                                {hoveredCardIndex === index && (
                                    <>
                                        <div
                                            className="delete-icon transition duration-300 hover:bg-primaryPurple flex items-center justify-center"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleDeleteWindow();
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon h-6 w-6"
                                                 viewBox="0 0 512 512">
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
                                            className="edit-icon transition duration-300 hover:bg-primaryPurple flex items-center justify-center"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                editLink(link.id);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon h-6 w-6"
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
                                        {visible && (
                                            <Delete setVisibility={setVisible} deleteLogic={() => deleteUserLink(link.id)} />
                                        )}
                                    </>
                                )}
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 300">
                                    {!link.linksGroupImage ? (
                                        <circle cx="100" cy="45" r="40" fill={link.commonColor}/>
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
                                                y={95 + idx * 40}
                                                fill={getPlatformColor(user_link.label)}
                                            rx="8"
                                        />
                                        <g transform={`translate(35, ${100 + idx * 40})`}>
                                            {getPlatformIcon(user_link.label)}
                                        </g>
                                        <text
                                            x="100"
                                            y={113 + idx * 40}
                                            fontSize="12"
                                            fill="white"
                                            textAnchor="middle"
                                        >
                                            {user_link.label || `Link #${idx + 1}`}
                                        </text>
                                        <g transform={`translate(165, ${105 + idx * 40})`}>
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
                <Pagination handleNext={handleNext} handlePrev={handlePrevious} currentPage={currentPage} totalPages={totalPages} />
            </div>
        )
    }
}

export default AllLinks;
