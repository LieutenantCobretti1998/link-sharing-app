import Select from 'react-select';
import {platforms} from "../Platforms/PreDefaultPlatForms.jsx";

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
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: "#BEADFF", // Red color on focus

    }),
}

function NewLinkForm({id, index, onUpdate, onDelete, errors, findLinkById}) {
    const handlePlatformChange = (selectedOption) => {
        onUpdate(id, {label: selectedOption.label});
    };
    const handleUrlChange = (event) => {
        let sanitizedUrl = event.target.value.trim();
        sanitizedUrl = sanitizedUrl.replace(/\s+/g, '');
        onUpdate(id, {url: sanitizedUrl});
    };
    const handleLinkDelete = () => {
        onDelete(id);
    };

    return (
        <div
             className="mb-4 flex flex-col gap-3 bg-light-grey p-3 border-[.5px] rounded-md border-light-grey">
            <div className="flex justify-between">
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none" viewBox="0 0 12 6">
                        <path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z"/>
                    </svg>
                    <h3 className="text-lightBlack-2 font-instrumentSemiBold">Link#{index}</h3>
                </div>
                <button onClick={() => handleLinkDelete()} className="text-lightBlack-2 font-instrumentNormal hover:text-red-500 focus:outline-none">Remove</button>
            </div>
            <div>
                <h3 className="text-sm text-lightBlack-2 mb-2">Platform</h3>
                <Select
                    options={platforms}
                    getOptionLabel={(e) => (
                        <div className="flex items-center gap-1.5">
                            {e.label}
                            <span className="mr-2">{e.icon}</span>
                        </div>
                    )}
                    defaultValue={platforms[0]}
                    onChange = {handlePlatformChange}
                    styles={customStyles}
                    required
                />
            </div>
            <div>
                <h3 className="text-lightBlack-2 font-instrumentSemiBold">Link</h3>
                <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                        <path fill="#737373"
                              d="M8.523 11.72a.749.749 0 0 1 0 1.063l-.371.371A3.751 3.751 0 1 1 2.847 7.85l1.507-1.506A3.75 3.75 0 0 1 9.5 6.188a.753.753 0 0 1-1 1.125 2.25 2.25 0 0 0-3.086.091L3.908 8.91a2.25 2.25 0 0 0 3.183 3.183l.37-.371a.748.748 0 0 1 1.062 0Zm4.63-8.874a3.756 3.756 0 0 0-5.305 0l-.371.37A.751.751 0 1 0 8.539 4.28l.372-.37a2.25 2.25 0 0 1 3.182 3.182l-1.507 1.507a2.25 2.25 0 0 1-3.086.09.753.753 0 0 0-1 1.125 3.75 3.75 0 0 0 5.144-.152l1.507-1.507a3.756 3.756 0 0 0 .002-5.307v-.001Z"/>
                    </svg>
                    <input required onChange={handleUrlChange} placeholder={findLinkById(id)} className={`relative w-full pl-10 bg-white p-3 border-[.5px] rounded-md ${(errors?.emptyUrl || errors?.invalidPlatform || errors?.invalidUrl) ? "border-red" : "border-lightBlack-2"} focus:outline-primaryPurple`} type="text"/>
                    {errors?.emptyUrl && (
                        <span className="text-red text-sm absolute right-[10px] bottom-[15px]">{errors.emptyUrl}</span>
                    )}
                    {errors?.invalidPlatform && (
                        <span className="text-red text-sm absolute right-[10px] bottom-[15px]">{errors.invalidPlatform}</span>
                    )}
                    {errors?.invalidUrl && (
                        <span
                            className="text-red text-sm absolute right-[10px] bottom-[15px]">{errors.invalidUrl}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NewLinkForm;