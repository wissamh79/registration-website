import ReactPaginate from "react-paginate";

import { Icons } from "@/components/icons";
const Paginate = ({ handlePageClick, pageCount }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<Icons.chevronsRight />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel={<Icons.chevronsLeft />}
      renderOnZeroPageCount={null}
      className="flex items-center justify-center w-full my-4 space-x-4 "
      pageClassName="text-sm font-medium   shadow-sm px-4 py-2 rounded-full"
      activeClassName="text-lg font-semibold text-white text-black bg-blue-500 px-4 py-2 rounded-full    "
      nextClassName="dark:text-white text-black  text-sm rounded-lg font-semibold px-4 py-1"
      previousClassName="dark:text-white text-black  text-sm text-center rounded-lg font-semibold px-4 py-1"
    />
  );
};

export default Paginate;
