
function Sidebar() {
    return (
        <aside className="w-[45%] gap-10 h-min flex flex-col   bg-white pl-10 pt-10 pb-10 rounded-md border-light-grey">
            <h1 className="font-bold text-primaryPurple text-2xl">Search</h1>
            <div>
                <label htmlFor="search"></label>
                <input type="text" id="search" placeholder="Search...🔍" />
            </div>
            <h1 className="font-bold text-primaryPurple text-2xl">Filter Searching</h1>
            <ul className="flex flex-col gap-5">
                <li>
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category"></select>
                </li>
                <li>
                    <label htmlFor="clicks">Clicks</label>
                    <select name="clicks" id="clicks"></select>
                </li>
            </ul>

        </aside>
    );
}

export default Sidebar;