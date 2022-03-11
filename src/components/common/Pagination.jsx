import React, { useState, useEffect } from "react";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { range } from "lodash";
import paginations from "../../config/paginationConfig";

const Pagination = (props) => {
  const { itemCounts } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const { page } = Object.fromEntries([...searchParams]);
    setCurrentPage(page);
  }, [searchParams]);

  if (!currentPage) setCurrentPage(1);

  const { countPerPage } = paginations;
  const pageCount = Math.ceil(itemCounts / countPerPage);

  if (pageCount === 1) return null;
  const pages = range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === Number(currentPage) ? "page-item active" : "page-item"
            }
          >
            <button
              className="page-link"
              onClick={() => navigate(`?${createSearchParams({ page })}`)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
