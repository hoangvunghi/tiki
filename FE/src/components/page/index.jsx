function Page({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) {
      return null;
    }
  
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  
    return (
      <>
        <div className="flex items-center justify-center mt-16 mb-4">
          <ul className="flex gap-4">
            {pageNumbers.map((pageNumber) => (
              <li
                key={pageNumber}
                className={`flex items-center bg-[#efefef] text-neutral-500 justify-center font-medium text-base rounded w-10 h-9 hover:cursor-pointer ${
                  currentPage === pageNumber ? "bg-sky-700 text-white" : ""
                }`}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
  
  export default Page;
  