export const Pagination: React.FC<{ currentPage: number; totalPage: number; paginate: any }> = ({ currentPage, totalPage, paginate }) => {
  // Chỉ hiển thị 3 numberPage only once page
  const pageNumbers: number[] = [];

  // Nếu currentPage ở vị trí đầu tiên (hiển trị page `1 2 3)
  if (currentPage === 1) {
    pageNumbers.push(currentPage);
    if (totalPage >= currentPage + 1) pageNumbers.push(currentPage + 1);
    if (totalPage >= currentPage + 2) pageNumbers.push(currentPage + 2);
  } else if (currentPage > 1) {
    if (currentPage >= 3) {
      // currentPage = 3
      pageNumbers.push(currentPage - 2);
      pageNumbers.push(currentPage - 1);
    } else {
      // currentPage = 2
      pageNumbers.push(currentPage - 1);
    }
    pageNumbers.push(currentPage);
    if (totalPage >= currentPage + 1) pageNumbers.push(currentPage + 1);
    if (totalPage >= currentPage + 2) pageNumbers.push(currentPage + 2);
  }

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 && "disabled"}`}
          onClick={() => {
            paginate(1);
          }}
        >
          <button className="page-link fs-4">FirstPage</button>
        </li>
        <li
          className={`page-item ${currentPage === 1 && "disabled"}`}
          onClick={() => {
            paginate(currentPage - 1);
          }}
        >
          <button className="page-link fs-4">Previous</button>
        </li>
        {pageNumbers.map((page) => (
          <li className={`page-item ${currentPage === page && "active"}`} key={page} onClick={() => paginate(page)}>
            <button className="page-link fs-4">{page}</button>
          </li>
        ))}
        {/* {currentPage !== totalPage && (
          <li className={`page-item disabled`}>
            <button className="page-link fs-4"  onClick={() => paginate(currentPage + 1)}>
              ...
            </button>
          </li>
        )} */}
        <li className={`page-item ${currentPage === totalPage && "disabled"}`}>
          <button className="page-link fs-4" onClick={() => paginate(currentPage + 1)}>
            Next
          </button>
        </li>
        <li className={`page-item ${currentPage === totalPage && "disabled"}`}>
          <button className="page-link fs-4" onClick={() => paginate(totalPage)}>
            LastPage
          </button>
        </li>
      </ul>
    </nav>
  );
};
