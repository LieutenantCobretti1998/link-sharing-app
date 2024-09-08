import Select from 'react-select';
import {platforms} from "../Platforms/PreDefaultPlatForms.jsx";

function NewLinkForm() {
    return (
        <div className="flex flex-col gap-3 bg-light-grey p-3 border-[.5px] rounded-md border-light-grey">
            <div className="flex justify-between">
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none" viewBox="0 0 12 6">
                        <path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z"/>
                    </svg>
                    <h3 className="text-lightBlack-2 font-instrumentSemiBold">Link#1</h3>
                </div>
                <h3 className="text-lightBlack-2 font-instrumentNormal">Remove</h3>
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
                    placeholder="Select a platform"
                    classNames={{
                         control: () => 'w-full p-0 h-9 border-[.5px] rounded-md border-lightBlack-2',
                         option: ({ isFocused }) => (isFocused ? 'bg-lightPurple1 text-black' : 'bg-white text-black'),
                    }}
                />
            </div>
        </div>
    );
}

export default NewLinkForm;