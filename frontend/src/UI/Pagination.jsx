// eslint-disable-next-line react/prop-types
function Pagination({handlePrev, handleNext, currentPage, totalPages}) {
    return (
        <div className="max-sm:self-center flex self-end justify-center mt-4">
            <button
                className="mr-2 px-4 py-2 bg-gray-200 rounded-md flex items-center gap-3 group"
                onClick={handlePrev}
                disabled={currentPage === 1}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512" width="20">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="32" d="M249.38 336L170 256l79.38-80M181.03 256H342"/>
                    <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none"
                          stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
                </svg>
                <span className={currentPage !== 1 ? " transition duration-300 group-hover:text-primaryPurple": ""}>Previous</span>
            </button>

            <span className="px-4 py-2">{currentPage}</span>

            <button
                className="ml-2 px-4 py-2 bg-gray-200 rounded-md flex items-center gap-3 group"
                onClick={handleNext}
                disabled={currentPage >= totalPages}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon transition" viewBox="0 0 512 512" width="20">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="32" d="M262.62 336L342 256l-79.38-80M330.97 256H170"/>
                    <path d="M256 448c106 0 192-86 192-192S362 64 256 64 64 150 64 256s86 192 192 192z" fill="none"
                          stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
                </svg>
                <span className={currentPage !== totalPages ? "transition duration-300 group-hover:text-primaryPurple": ""}>Next</span>
            </button>
        </div>
    );
}

export default Pagination;