import Button from "../UI/Button.jsx";
import {NavLink, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toggleModal} from "../SaveLogic/SaveSlice.js";
import {useQueryClient} from "@tanstack/react-query";
import {createSelector} from "@reduxjs/toolkit";

function Header({saveLinks}) {
    const queryClient = useQueryClient();
    const location = useLocation();
    const dispatch = useDispatch();
    const {linksGroupName, category, blendedColor} = useSelector(state => state.saveChooses);
    const savedParameters = useSelector(state => state.saveChooses);


    const checkValidity = () => {
        if (!linksGroupName || !category) {
            dispatch(toggleModal(true));
            return;
        }
        saveLinks(savedParameters)
    }

    return (location.pathname === "/preview" ? (
        <div className=" w-full h-64 rounded-b-3xl"
             style = {{
                 backgroundColor: blendedColor ? blendedColor: "#4015f8"
             }}
        >
            <header
                className="w-70 flex flex-row flex-md-row align-items-center bg-white p-5 relative top-2 ml-2 mr-2 rounded-md mb-4 justify-between font-instrumentBold">
                <div>
                    <Button type="header">
                        <NavLink className="w-full, h-full block pt-1" to="/">Back to Editor</NavLink>
                    </Button>
                </div>

                <div>
                    <Button onclick={checkValidity}  type="shareLink">Create Link</Button>
                </div>
            </header>
        </div>

        ) : (
            <header
                className="flex flex-row flex-md-row align-items-center bg-white p-5 m-2 rounded-md mb-4 justify-between font-instrumentBold">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="183" height="40" fill="none" viewBox="0 0 183 40">
                        <path fill="#633CFF" fillRule="evenodd"
                              d="M5.774 34.225c2.443 2.442 6.37 2.442 14.226 2.442 7.857 0 11.785 0 14.225-2.442 2.442-2.438 2.442-6.368 2.442-14.225 0-7.857 0-11.785-2.442-14.226-2.438-2.44-6.368-2.44-14.225-2.44-7.857 0-11.785 0-14.226 2.44-2.44 2.443-2.44 6.37-2.44 14.226 0 7.857 0 11.785 2.44 14.225Zm10.06-19.642A5.416 5.416 0 1 0 21.25 20a1.25 1.25 0 1 1 2.5 0 7.917 7.917 0 1 1-7.916-7.916 1.25 1.25 0 0 1 0 2.5ZM29.584 20a5.417 5.417 0 0 1-5.417 5.417 1.25 1.25 0 0 0 0 2.5A7.917 7.917 0 1 0 16.25 20a1.25 1.25 0 0 0 2.5 0 5.416 5.416 0 1 1 10.834 0Z"
                              clipRule="evenodd"/>
                        <path fill="#333"
                              d="M61.247 32.15v-3.955l.346.07c-.23 1.283-.923 2.31-2.077 3.08-1.131.77-2.493 1.155-4.086 1.155-1.616 0-3.024-.373-4.225-1.12-1.177-.77-2.089-1.843-2.735-3.22-.647-1.377-.97-2.998-.97-4.865 0-1.89.335-3.535 1.004-4.935.67-1.4 1.605-2.485 2.805-3.255 1.224-.77 2.643-1.155 4.26-1.155 1.684 0 3.046.397 4.085 1.19 1.062.793 1.685 1.878 1.87 3.255l-.38.035V6.95h5.194v25.2h-5.09Zm-4.155-3.85c1.223 0 2.216-.432 2.978-1.295.762-.887 1.143-2.147 1.143-3.78s-.393-2.882-1.178-3.745c-.762-.887-1.766-1.33-3.012-1.33-1.2 0-2.194.443-2.978 1.33-.762.887-1.143 2.147-1.143 3.78s.38 2.882 1.143 3.745c.785.863 1.8 1.295 3.047 1.295ZM78.801 32.5c-1.962 0-3.67-.385-5.125-1.155-1.454-.793-2.585-1.89-3.393-3.29-.785-1.4-1.178-3.01-1.178-4.83 0-1.843.393-3.453 1.178-4.83a8.395 8.395 0 0 1 3.358-3.255c1.432-.793 3.094-1.19 4.987-1.19 1.824 0 3.405.373 4.744 1.12a7.89 7.89 0 0 1 3.116 3.115c.739 1.33 1.108 2.893 1.108 4.69 0 .373-.011.723-.034 1.05-.023.303-.058.595-.104.875H72.153v-3.465h11.115l-.9.63c0-1.447-.347-2.508-1.04-3.185-.669-.7-1.592-1.05-2.77-1.05-1.361 0-2.423.467-3.185 1.4-.739.933-1.108 2.333-1.108 4.2 0 1.82.37 3.173 1.108 4.06.762.887 1.893 1.33 3.393 1.33.831 0 1.547-.14 2.147-.42.6-.28 1.05-.735 1.35-1.365h4.883c-.577 1.727-1.57 3.092-2.978 4.095-1.385.98-3.174 1.47-5.367 1.47ZM94.68 32.15 87.72 14.3h5.575l5.437 16.66h-2.91l5.403-16.66h5.436l-6.96 17.85h-5.02ZM108.669 32.15V6.95h5.194v25.2h-5.194ZM118.002 32.15V14.3h5.194v17.85h-5.194Zm-.173-20.23V6.25h5.54v5.67h-5.54ZM127.335 32.15V14.3h5.09v4.2h.104v13.65h-5.194Zm12.293 0V21.09c0-.98-.254-1.715-.762-2.205-.485-.49-1.2-.735-2.147-.735-.808 0-1.535.187-2.181.56a4.118 4.118 0 0 0-1.489 1.54c-.347.653-.52 1.423-.52 2.31l-.45-4.305c.577-1.307 1.42-2.345 2.528-3.115 1.131-.793 2.516-1.19 4.155-1.19 1.963 0 3.463.56 4.502 1.68 1.039 1.097 1.558 2.578 1.558 4.445V32.15h-5.194ZM148.775 32.15V6.95h5.194v25.2h-5.194Zm11.323 0-7.341-9.275 7.168-8.575h5.99l-8.414 9.38.242-1.645 8.519 10.115h-6.164Z"/>
                        <path fill="#333"
                              d="M174.743 32.5c-2.585 0-4.64-.525-6.163-1.575-1.524-1.05-2.355-2.497-2.494-4.34h4.641c.115.793.507 1.4 1.177 1.82.692.397 1.639.595 2.839.595 1.085 0 1.87-.152 2.355-.455.508-.327.762-.782.762-1.365 0-.443-.15-.782-.45-1.015-.277-.257-.797-.467-1.558-.63l-2.84-.595c-2.101-.443-3.647-1.108-4.64-1.995-.993-.91-1.489-2.077-1.489-3.5 0-1.727.658-3.068 1.974-4.025 1.316-.98 3.151-1.47 5.506-1.47 2.331 0 4.189.478 5.575 1.435 1.385.933 2.146 2.24 2.285 3.92h-4.64c-.092-.607-.416-1.062-.97-1.365-.554-.327-1.339-.49-2.354-.49-.924 0-1.616.14-2.078.42-.439.257-.658.63-.658 1.12 0 .42.185.758.554 1.015.369.233.981.443 1.835.63l3.186.665c1.778.373 3.117 1.073 4.017 2.1.923 1.003 1.385 2.193 1.385 3.57 0 1.75-.681 3.115-2.043 4.095-1.339.957-3.243 1.435-5.714 1.435Z"/>
                    </svg>
                </div>

                <div className="flex items-center gap-7">
                    <Button type="links" isActive={location.pathname === "/links"}>
                        <NavLink onClick={(e) => {
                            if (location.pathname === "/links") {
                                e.preventDefault();
                            }
                        }} className="flex p-3 py-1 items-center gap-0.5 justify-center w-max group" to="/links">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none"
                                 viewBox="0 0 21 20">
                                <path className="group-hover:fill-primaryPurple transition duration-300 ease-in-out"
                                      fill="#737373"
                                      d="M11.154 14.65a.936.936 0 0 1 0 1.329l-.464.464a4.689 4.689 0 1 1-6.631-6.631l1.884-1.884a4.687 4.687 0 0 1 6.432-.194.941.941 0 0 1-1.25 1.407 2.813 2.813 0 0 0-3.857.114l-1.883 1.882a2.813 2.813 0 1 0 3.978 3.978l.464-.464a.936.936 0 0 1 1.327 0ZM16.94 3.558a4.695 4.695 0 0 0-6.63 0l-.465.464a.94.94 0 1 0 1.328 1.328l.464-.464a2.813 2.813 0 0 1 3.978 3.978l-1.883 1.885a2.813 2.813 0 0 1-3.858.111.942.942 0 0 0-1.25 1.407 4.688 4.688 0 0 0 6.43-.19l1.884-1.884a4.695 4.695 0 0 0 .002-6.633v-.002Z"/>
                            </svg>
                            <h3 className="group-hover:text-primaryPurple font-bold transition duration-300 ease-in-out">Links</h3>
                        </NavLink>
                    </Button>
                    <div>
                        <Button type="links" isActive={location.pathname === "/profile"}>
                            <NavLink to="/profile"
                                     className="p-3 py-1 flex items-center gap-0.5 justify-center w-max group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none"
                                     viewBox="0 0 21 20">
                                    <path className="group-hover:fill-primaryPurple transition duration-300 ease-in-out"
                                          fill="#737373"
                                          d="M10.5 1.563A8.437 8.437 0 1 0 18.938 10 8.447 8.447 0 0 0 10.5 1.562ZM6.716 15.357a4.688 4.688 0 0 1 7.568 0 6.54 6.54 0 0 1-7.568 0Zm1.596-5.982a2.188 2.188 0 1 1 4.376 0 2.188 2.188 0 0 1-4.376 0Zm7.344 4.683a6.523 6.523 0 0 0-2.265-1.83 4.062 4.062 0 1 0-5.782 0 6.522 6.522 0 0 0-2.265 1.83 6.562 6.562 0 1 1 10.304 0h.008Z"/>
                                </svg>
                                <h3 className="group-hover:text-primaryPurple font-bold transition duration-300 ease-in-out">Profile Details</h3>
                            </NavLink>
                        </Button>
                    </div>
                </div>

                <div>
                    <Button type="header">
                        <NavLink className="w-full, h-full block pt-1" to="/preview">Preview</NavLink>
                    </Button>
                </div>
            </header>
        )
    );
}

export default Header;