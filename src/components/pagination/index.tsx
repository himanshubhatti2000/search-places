import "./style.css";
import React from "react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      {/* Previous Page Button */}
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>Prev</button>
      )}

      {/* Current Page Button (always visible) */}
      <button disabled={true}>{currentPage}</button>

      {/* Next Page Button */}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};

const MemoizedPagination = React.memo(Pagination);

export default MemoizedPagination;
