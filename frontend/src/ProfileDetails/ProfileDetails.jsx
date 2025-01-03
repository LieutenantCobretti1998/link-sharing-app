import {useDispatch, useSelector} from "react-redux";
import {backgrounds} from "../BackgroundImages/BackgroundImages.jsx";
import Select from "react-select";
import {fetchProfileData, removeLinksGroupImage, updateProfile} from "./ProfileSlice.js";
import Button from "../UI/Button.jsx";
import {useEffect, useReducer, useRef, useState} from "react";
import {saveChooses, saveData} from "../SaveLogic/SaveSlice.js";
import {HexColorPicker} from "react-colorful";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {fetchLinks} from "../LinksAddition/LinkSlice.js";
import {useMutation} from "@tanstack/react-query";
import {updateLinksProfile} from "../API/DataFetchingApi.js";
import useHandleSessionExpired from "../CustomLogic/UseHandleSessionExpired.js";
import toast from "react-hot-toast";

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? '#A855F7' : '#A3A3A3', // Purple border on focus
        boxShadow: state.isFocused ? '0 0 0 1px #A855F7' : 'none',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? '#A855F7' // Selected option background
            : state.isFocused
                ? '#EDE9FE' // Focused option background
                : 'white',
        color: state.isSelected ? 'white' : 'black',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'white',
        border: '1px solid #A3A3A3',
        borderRadius: '0.375rem',
        zIndex: 1000
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: "#BEADFF", // Red color on focus

    }),
};

const SET_ERROR = "SET_ERROR";
const CLEAR_ERROR = 'CLEAR_ERROR';
const SET_SUCCESS = 'SET_SUCCESS';
const CLEAR_SUCCESS = "CLEAR_SUCCESS";

const errorReducer = (state, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {...state, errorType: action.errorType, errorMessage: action.errorMessage};
        case CLEAR_ERROR:
             return {...state, errorType: null, errorMessage: '' };
        case SET_SUCCESS:
            return {...state, successMessage: action.successMessage};
        case CLEAR_SUCCESS:
            return {...state, successMessage: ""};
        default:
            return state;
    }
};

function ProfileDetails() {
    const dispatch_redux = useDispatch();
    // const {width} = useWindowSize();
    const handleSessionExpired = useHandleSessionExpired();
    const navigate = useNavigate();
    const profileDetailsFromQuery = useLoaderData();
    const {id} = useParams();
    const {linksGroupImage} = useSelector((state) => state.profile);
    const fileInputRef = useRef(null);
    const [state, dispatch] = useReducer(errorReducer, { errorType: null, errorMessage: '', successMessage: "" });
    const profile = useSelector((state) => state.profile);
    // const links = useSelector((state) => state.link.links);
    const savedData= useSelector((state) => state.saveChooses);
    const [imagePreview, setImagePreview] = useState("");
    const [description, setDescription] = useState("");
    const [linkName, setLinkName] = useState("");
    const [category, setCategory] = useState("");
    const [linkNameError, setLinkNameError] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [textColor, setTextColor] = useState("#333333");
    const [commonColor, setCommonColor] = useState("#D9D9D9");
    const [backgroundColor, setbackgroundColor] = useState("#FFF");
    const [cardBackgroundColor, setcardBackgroundColor] = useState("#FFF");
    const maxCategoryLength = 20;
    const maxLinkNameLength = 30;
    const maxDescriptionLength = 40;
    const profile_data = localStorage.getItem("current-profile");
    const parsedProfileData = profile_data ? JSON.parse(profile_data) : null;
    const profileName = parsedProfileData.profile_name;
    const {mutate: saveNewProfileData} = useMutation({
        mutationFn: updateLinksProfile,
        mutationKey: ["update-profile"],
        onSuccess: () => {
            navigate(`/${profileName}/edit-profile/${id}`)
            toast.success("Profile was updated successfully")
        },
        onError: (error) => {
            if (error.message === "Session expired. Please log in again.") {
                handleSessionExpired();
            }
            toast.error(error.message || "something went wrong");
        }
    })

    useEffect(() => {
        if (id) {
            const {links, ...profileData} = profileDetailsFromQuery;
            dispatch_redux(fetchLinks(links));
            dispatch_redux(fetchProfileData(profileData));
            dispatch_redux(saveData(profileDetailsFromQuery))

        }
    }, [profileDetailsFromQuery]);


    useEffect(() => {
        setTextColor(savedData.textColor || textColor);
        setCommonColor(savedData.commonColor || commonColor);
        setbackgroundColor(savedData.backgroundColor || commonColor);
    }, [savedData ]);
    const handleImageLoadButton = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Programmatically click the file input
        }
    };

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file format
      const validTypes = ["image/png", "image/jpg", "image/jpeg"];
      const fileSize = 2 * 1024 * 1024;
      if (file.size > fileSize) {
          dispatch({
              type: SET_ERROR,
              errorType: "invalidSize",
              errorMessage: "File size exceeds 2MB"
          })
          return;
      }
      if (!validTypes.includes(file.type)) {
        dispatch({
          type: SET_ERROR,
          errorType: 'invalidFormat',
          errorMessage: 'Invalid file format. Please upload PNG or JPG/JPEG.',
        });
        return;
      }
      dispatch({type: CLEAR_ERROR})

      // Load the image
      const image = new Image();
      image.src = URL.createObjectURL(file);


      image.onload = () => {
        const width = image.width;
        const height = image.height;

        // Check if the image dimensions exceed 1024x1024
        if (width > 1024 || height > 1024) {
          // Resize the image using a canvas
          const MAX_SIZE = 1024;
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set canvas width and height to 1024x1024
          canvas.width = MAX_SIZE;
          canvas.height = MAX_SIZE;

          // Draw the image on the canvas with resized dimensions
          ctx.drawImage(image, 0, 0, MAX_SIZE, MAX_SIZE);

          // Convert the canvas to a Data URL (base64 string)
          const resizedImageUrl = canvas.toDataURL(file.type, 0.9);

          dispatch({
            type: SET_SUCCESS,
            successMessage: 'Image was resized to 1024x1024 and uploaded successfully!',
          });

          // Store the resized image in Redux and as the preview
          dispatch_redux(updateProfile({ field: "linksGroupImage", value: resizedImageUrl }));
          setImagePreview(resizedImageUrl);

        } else {
          // If dimensions are within the limit, just use the original image
          dispatch({ type: CLEAR_ERROR });
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result;
            dispatch_redux(updateProfile({ field: "linksGroupImage", value: base64String }));
            dispatch({
              type: 'SET_SUCCESS',
              successMessage: 'Link Group Image uploaded successfully!',
            });
            setImagePreview(base64String);
          };
          reader.readAsDataURL(file);
        }

        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      };
    };
    const handleInputChange = (event) => {
        const {name, type, value, checked} = event.target
        switch (name) {
            case "shortDescription":
                if (event.target.value.length > maxDescriptionLength) return;
                setDescription(event.target.value);
                break;
            case "linksGroupName":
                if (event.target.value.length > maxLinkNameLength) return;
                setLinkName(event.target.value);
                break;
            case "category":
                if (event.target.value.length > maxCategoryLength) return;
                setCategory(event.target.value);
                break;
        }
        const fieldValue = type === "checkbox" ? checked : value;
        dispatch_redux(updateProfile({ field: name, value: fieldValue }));
    };

    const saveTextColorChange = () => {
        dispatch_redux(updateProfile({ field: "textColor", value: textColor }));
    }

    const saveCommonColorChange = () => {
        dispatch_redux(updateProfile({ field: "commonColor", value: commonColor }));
    };

    const saveBackgroundColorChange = () => {
        dispatch_redux(updateProfile({ field: "backgroundColor", value: backgroundColor }));
    };

     const saveCardBackgroundColorChange = () => {
        dispatch_redux(updateProfile({ field: "cardBackgroundColor", value: cardBackgroundColor }));
    }

    // const getPlatformIcon = (label) => {
    //     const platform = platforms.find((p) => p.label === label);
    //     return platform ? platform.icon : null;
    // };
    //
    // const getPlatformColor = (label) => {
    //     const platform = platforms.find((p) => p.label === label);
    //     return platform ? platform.color : null;
    // };
    //
    // const getBackgroundImage = (label) => {
    //     const background = backgrounds.find((image) => image.value === label);
    //     return background ? background.image: null;
    // };

    const handleEditLink = () => {
         const errors = handleSave();
         if(Object.keys(errors).length === 0) {
             saveNewProfileData({id, profile})
         }
    }

    const handleSave = () => {
        let hasError = false;
        let updatedProfile = { ...profile };
        let errors = {};
        const validateField = (fieldValue, savedValue, fieldName, setError) => {
            if (!fieldValue && !savedValue) {
                setError('This field is required');
                errors[fieldName] = 'This field is required';
                return false;
            } else if (!fieldValue) {
                dispatch_redux(updateProfile({ field: fieldName, value: savedValue }));
                updatedProfile[fieldName] = savedValue;
            } else if (fieldValue.trim() === "") {
                setError('This field cannot contain only white spaces');
                errors[fieldName] = 'This field is required';
                return false;
            } else {
                setError('');
                updatedProfile[fieldName] = fieldValue;
            }
            return true;
            };
        const isLinkNameValid = validateField(linkName, savedData.linksGroupName, "linksGroupName", setLinkNameError);
        const isCategoryValid = validateField(category, savedData.category, "category", setCategoryError);
        if (!isLinkNameValid || !isCategoryValid) {
            hasError = true;
        }
        if (hasError) {
            return errors;
        }
        for (const field in updatedProfile) {
            dispatch_redux(saveChooses({ field: field, value: updatedProfile[field] }));
        }
        if (!id) {
            toast.success("Profile was saved successfully");
        }
        return errors;
    }

    return (
        <>
            {/*{width > 1280 &&*/}
            {/*            <Suspense fallback={<Spinner />}>*/}
            {/*                <MobileOverview profile={profile} getBackgroundImage={getBackgroundImage} links={links} getPlatformColor={getPlatformColor} getPlatformIcon={getPlatformIcon} />*/}
            {/*            </Suspense>*/}
            {/*}*/}
            <section className="w-full bg-white p-10 relative rounded-md border-light-grey">
                <div className="pb-12">
                    <h2 className="max-xs:text-[1.2rem] font-bold text-lightBlack-1 text-3xl">Links Group Details</h2>
                    <p className="font-normal text-lightBlack-2 text-base">Add your details to create a personal touch
                        to your Links Group.</p>
                </div>
                <div
                    className="max-xs:flex-col max-xs:items-start max-xs:gap-5 relative p-[1rem] mb-4  flex items-center justify-between bg-light-grey rounded-md border-light-grey">
                    <h2 className="font-bold text-lightBlack-2 text-base">Links Group picture</h2>
                    <button
                        type="button"
                        className={`relative h-32 w-32 rounded-lg ${(imagePreview) ? "bg-white": "bg-lightPurple1"} flex flex-col items-center justify-center`}
                        onClick={handleImageLoadButton}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        {(imagePreview) && (
                            <img
                                src={imagePreview}
                                alt="Uploaded Preview"
                                className="absolute inset-0 w-max h-full rounded-lg"
                            />
                        )}
                        {(!imagePreview) && (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none"
                                     viewBox="0 0 40 40">
                                    <path
                                        fill="#633CFF"
                                        d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"
                                    />
                                </svg>
                                <span className="text-primaryPurple font-bold">+ Upload Links Group Image</span>
                            </>
                        )}
                    </button>

                    <p className="max-xs:text-[.7rem] w-[250px] font-normal text-lightBlack-2 text-base">
                        Image should be below
                        1024x1024px or it will be resized. Use PNG or JPG/JPEG format.
                    </p>
                    {linksGroupImage && (
                        <button
                            onClick={() => {
                                dispatch_redux(removeLinksGroupImage());
                                setImagePreview("");
                            }}
                            className="max-xs:text-[.7rem] absolute top-2 right-5 text-lightBlack-2 font-instrumentNormal hover:text-red transition-colors focus:outline-none">
                            Remove
                        </button>
                    )}
                    {state.errorType === 'invalidFormat' && (
                        <p className="max-xs:text-[.7rem] absolute bottom-0 text-red mt-2 text-sm">{state.errorMessage}</p>
                    )}
                    {state.errorType === 'invalidSize' && (
                        <p className="max-xs:text-[.7rem] absolute bottom-0 text-red mt-2 text-sm">{state.errorMessage}</p>
                    )}
                </div>
                <div className="p-[1rem]  flex flex-col gap-10 bg-light-grey rounded-md border-light-grey">
                    {savedData.profileBio && (
                        <div className="max-xs:flex-col max-xs:items-start max-xs:gap-5 relative flex justify-between items-center w-full">
                            <label className="font-bold text-lightBlack-2 text-base" htmlFor="BioInclude">Include your bio</label>
                            <input name="bioIncluded"
                                   checked={profile.bioIncluded}
                                   onChange={handleInputChange}
                                   id="BioInclude"
                                   type="checkbox"
                                   className="max-xs:w-full max-sm:placeholder:text-[.7rem] max-sm:pl-2 w-[50%] pl-10 bg-white p-3 border-[.5px] rounded-md border-lightBlack-2 focus:outline-primaryPurple"
                            />
                        </div>
                    )}
                    <div className="max-xs:flex-col max-xs:items-start max-xs:gap-5 relative flex justify-between items-center w-full">
                        <label className="font-bold text-lightBlack-2 text-base" htmlFor="firstName">
                            Links Group Name*
                        </label>
                        {linkNameError ? (
                            <>
                                <input maxLength={maxLinkNameLength} value={linkName} name="linksGroupName"
                                       onChange={handleInputChange} id="firstName"
                                       type="text"
                                       placeholder={savedData.linksGroupName ? savedData.linksGroupName : "Enter a link name"}
                                       className="max-xs:w-full w-[50%] max-sm:placeholder:text-[.7rem] max-sm:pl-2 pl-10 bg-white p-3 border-[.5px] rounded-md border-red focus:outline-primaryPurple"
                                />
                                <p className="text-sm text-red absolute right-[10px] bottom-[15px]">
                                    {linkNameError}
                                </p>
                                <p className="max-xs:inset-x-0 max-xs:bottom-[-25px] text-sm text-lightBlack-2 absolute right-0 bottom-[-20px]">
                                    {maxLinkNameLength - linkName.length} characters left
                                </p>
                            </>
                        ) : (
                            <>
                                <input maxLength={maxLinkNameLength} value={linkName} name="linksGroupName"
                                       onChange={handleInputChange} id="firstName"
                                       type="text"
                                       placeholder={savedData.linksGroupName ? savedData.linksGroupName : "Enter a group name for link/links"}
                                       className="max-xs:w-full max-sm:placeholder:text-[.7rem] max-sm:pl-2 w-[50%] pl-10 bg-white p-3 border-[.5px] rounded-md border-lightBlack-2 focus:outline-primaryPurple"
                                />
                                <p className="max-xs:inset-x-0 max-xs:bottom-[-25px] text-sm text-lightBlack-2 absolute right-0 bottom-[-20px]">
                                    {maxLinkNameLength - linkName.length} characters left
                                </p>
                            </>
                        )}
                    </div>
                    <div className="max-xs:flex-col max-xs:items-start max-xs:gap-5 relative flex justify-between items-center w-full">
                        <label className="font-bold text-lightBlack-2 text-base" htmlFor="shortDescription">Links
                            Description</label>
                        <textarea value={description} maxLength={maxDescriptionLength} name="shortDescription"
                                  onChange={handleInputChange} id="shortDescription"
                                  placeholder={savedData.shortDescription ? savedData.shortDescription : "Enter the short description for your links' group"}
                                  className="max-xs:w-full max-sm:placeholder:text-[.7rem] max-sm:pl-2 w-[50%] pl-10 bg-white p-3 border-[.5px] rounded-md border-lightBlack-2 focus:outline-primaryPurple"
                                  rows="3"
                        />
                        <p className="max-xs:inset-x-0 max-xs:bottom-[-25px] text-sm text-lightBlack-2 absolute right-0 bottom-[-20px]">
                            {maxDescriptionLength - description.length} characters left
                        </p>
                    </div>
                    <div className="max-xs:flex-col max-xs:items-start max-xs:gap-5 relative flex justify-between items-center w-full">
                        <label className="font-bold text-lightBlack-2 text-base" htmlFor="category">Category*</label>
                        {categoryError ? (
                            <>
                                <input value={category} maxLength={maxCategoryLength} name="category"
                                       onChange={handleInputChange} id="category" type="text"
                                        placeholder={savedData.category ? savedData.category : "Enter category"}
                                       className="max-xs:w-full w-[50%] max-sm:placeholder:text-[.7rem] max-sm:pl-2 pl-10 bg-white p-3 border-[.5px] rounded-md border-red focus:outline-primaryPurple"
                                />
                                <p className="text-sm text-red absolute right-[10px] bottom-[15px]">
                                    {categoryError}
                                </p>
                                <p className="max-xs:inset-x-0 max-xs:bottom-[-25px] text-sm text-lightBlack-2 absolute right-0 bottom-[-20px]">
                                    {maxCategoryLength - category.length} characters left
                                </p>
                            </>
                        ) : (
                            <>
                                <input value={category} maxLength={maxCategoryLength} name="category"
                                       onChange={handleInputChange} id="category" type="text"
                                       placeholder={savedData.category ? savedData.category : "Enter category"}
                                       className="max-xs:w-full  max-sm:placeholder:text-[.7rem] max-sm:pl-2 w-[50%] pl-10 bg-white p-3 border-[.5px] rounded-md border-lightBlack-2 focus:outline-primaryPurple"
                                />
                                <p className="max-xs:inset-x-0 max-xs:bottom-[-25px] text-sm text-lightBlack-2 absolute right-0 bottom-[-20px]">
                                    {maxCategoryLength - category.length} characters left
                                </p>
                            </>
                        )}
                    </div>
                    <div className="max-xs:flex-col max-xs:items-start max-xs:gap-5 flex justify-between items-center w-full">
                        <label className="font-bold text-lightBlack-2 text-base" htmlFor="backgroundImage">Background
                            Image</label>
                        <div className="max-xs:w-full w-[50%]">
                            <Select
                                name="backgroundImage"
                                onChange={(selectedOption) => {
                                    dispatch_redux(updateProfile({
                                        field: "backgroundImage",
                                        value: selectedOption.value
                                    }));
                                }}
                                id="backgroundImage"
                                options={backgrounds}
                                getOptionLabel={(option) => (
                                    <div className="flex items-center gap-2">
                                        {option.image && (
                                            <img
                                                src={option.imageSmall}
                                                alt={option.label}
                                                style={{width: '24px', height: '24px', borderRadius: '4px'}}
                                            />
                                        )}
                                        <span>{option.label}</span>
                                    </div>
                                )}
                                getOptionValue={option => option.label}
                                value={backgrounds.find((bg) => bg.value === profile.backgroundImage)}
                                styles={customStyles}
                                placeholder="Select a background"
                            />
                        </div>
                    </div>
                    <div className="max-sm:flex-col max-sm:gap-5 flex">
                        <div className="flex gap-2 flex-col  items-center w-full">
                            <label className="font-bold text-lightBlack-2 text-base" htmlFor="textColor">
                                Text Color
                            </label>
                            <HexColorPicker onMouseUp={saveTextColorChange} onTouchEnd={saveTextColorChange}
                                            name="textColor"
                                            color={textColor} onChange={setTextColor}/>
                        </div>
                        <div className="flex gap-2 flex-col items-center w-full">
                            <label className="font-bold text-lightBlack-2 text-base" htmlFor="groupColor">
                                Common Color
                            </label>
                            <HexColorPicker name="groupColor" onMouseUp={saveCommonColorChange}
                                            onTouchEnd={saveCommonColorChange}
                                            color={commonColor} onChange={setCommonColor}/>
                        </div>
                        <div className="flex gap-2 flex-col items-center w-full">
                            <label className="font-bold text-lightBlack-2 text-base" htmlFor="backgroundColor">
                                Background Color
                            </label>
                            <HexColorPicker name="backgroundColor" onMouseUp={saveBackgroundColorChange}
                                            onTouchEnd={saveBackgroundColorChange}
                                            color={backgroundColor} onChange={setbackgroundColor}/>
                        </div>
                        <div className="flex gap-2 flex-col items-center w-full">
                            <label className="font-bold text-lightBlack-2 text-base" htmlFor="backgroundColor">
                                Card Background Color
                            </label>
                            <HexColorPicker name="backgroundColor" onMouseUp={saveCardBackgroundColorChange}
                                            onTouchEnd={saveCardBackgroundColorChange}
                                            color={cardBackgroundColor} onChange={setcardBackgroundColor}/>
                        </div>
                    </div>
                </div>
                <div className="border-t border-light-grey-100 mt-10 -mx-10"></div>
                <div className="mt-10 text-end">
                    {id ? (
                        <Button onclick={handleEditLink} type="save">Update</Button>
                    ) : (
                        <Button onclick={handleSave} type="save">Save</Button>
                    )}
                </div>
            </section>
        </>
    );
}

export default ProfileDetails;