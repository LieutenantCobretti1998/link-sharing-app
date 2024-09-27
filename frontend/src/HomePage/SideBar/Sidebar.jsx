import Select from "react-select";

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        width: '50%',
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
        width: "50%",
        backgroundColor: 'white',
        border: '1px solid #A3A3A3',
        borderRadius: '0.375rem',
        zIndex: 1000
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: "#BEADFF",

    }),
};
const optionsCategory = [
    {value: "chocolate", label: "Chocolate"},
    {value: "chocolates", label: "Chocolates"},
    {value: "chocolated", label: "Chocolated"},
    {value: "chocolatea", label: "Chocolatea"},
    {value: "chocolatee", label: "Chocolatee"},
];
const optionsClicks = [
    {value: "ascending", label: "Ascending"},
    {value: "descending", label: "Descending"},
]
function Sidebar() {
    return (
        <aside className="w-[45%] gap-10 h-min flex flex-col   bg-white pl-10 pt-10 pb-10 rounded-md border-light-grey">
            <h1 className="font-bold text-primaryPurple text-2xl">Search</h1>
            <div>
                <label htmlFor="search"></label>
                <input   className=" border-2  placeholder-gray-400 p-2 rounded-md focus:border-lightPurple1 outline-none" type="text" id="search" placeholder="Search...🔍" />
            </div>
            <h1 className="font-bold text-primaryPurple text-2xl">Filter Searching by:</h1>
            <ul className="flex flex-col gap-5">
                <li className="flex flex-col gap-3">
                    <label htmlFor="category">Category</label>
                    <Select
                        options={optionsCategory}
                        getOptionLabel={(e) => (
                        <div className="flex items-center gap-1.5">
                            {e.label}
                            <span className="mr-2">{e.icon}</span>
                        </div>
                        )}
                        styles={customStyles}
                    />
                </li>
                <li className="flex flex-col gap-3">
                    <label htmlFor="clicks">Clicks</label>
                    <Select
                        options={optionsClicks}
                        getOptionLabel={(e) => (
                        <div className="flex items-center gap-1.5">
                            {e.label}
                            <span className="mr-2">{e.icon}</span>
                        </div>
                        )}
                        styles={customStyles}
                    />
                </li>
            </ul>

        </aside>
    );
}

export default Sidebar;