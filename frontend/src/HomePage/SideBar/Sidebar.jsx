import Select from "react-select";
import {useSearchParams} from "react-router-dom";
import {DEFAULT_PAGE} from "../../UI/GlobalVariables.js";

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
// const optionsCategory = [
//     {value: "chocolate", label: "Chocolate"},
//     {value: "chocolates", label: "Chocolates"},
//     {value: "chocolated", label: "Chocolated"},
//     {value: "chocolatea", label: "Chocolatea"},
//     {value: "chocolatee", label: "Chocolatee"},
// ];
const optionsClicks = [
    {value: "ascending", label: "Ascending"},
    {value: "descending", label: "Descending"},
]
function Sidebar() {
     let [searchParams, setSearchParams] = useSearchParams();
     const handleSearchChange = (e) => {
         const newSearch = (e.target.value).trim();
         if (newSearch === "") {
             const updatedParams = new URLSearchParams(searchParams);
             updatedParams.delete("search")
             setSearchParams(updatedParams);
             return;
         }
         const updatedParams = new URLSearchParams(searchParams);
         updatedParams.set("search", newSearch);
         updatedParams.set("page", DEFAULT_PAGE);
         setSearchParams(updatedParams);
     }
    return (
        <aside className="max-xs:self-center max-sm:w-full max-sm:pl-0 w-[45%] h-full gap-10  flex flex-col  bg-white pl-10 pt-10 pb-10 rounded-md border-light-grey">
            <h1 className="max-sm:self-center font-bold text-primaryPurple text-2xl">Search</h1>
            <div className="max-sm:self-center">
                <label htmlFor="search"></label>
                <input onChange={handleSearchChange} className=" border-2  placeholder-gray-400 p-2 rounded-md focus:border-lightPurple1 outline-none" type="text" id="search" placeholder="Search...🔍" />
            </div>
            <h1 className="max-sm:self-center font-bold text-primaryPurple text-2xl">Filter Searching by:</h1>
            {/*<ul className="flex flex-col gap-5">*/}
            {/*    <li className="flex flex-col gap-3">*/}
            {/*        <label htmlFor="clicks">Clicks</label>*/}
            {/*        <Select*/}
            {/*            options={optionsClicks}*/}
            {/*            getOptionLabel={(e) => (*/}
            {/*            <div className="flex items-center gap-1.5">*/}
            {/*                {e.label}*/}
            {/*                <span className="mr-2">{e.icon}</span>*/}
            {/*            </div>*/}
            {/*            )}*/}
            {/*            styles={customStyles}*/}
            {/*        />*/}
            {/*    </li>*/}
            {/*</ul>*/}
            <h1 className="max-sm:text-center">Coming Soon🥲❤️</h1>

        </aside>
    );
}

export default Sidebar;