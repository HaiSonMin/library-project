export const PageItem: React.FC<{ page: number; paginate: any; type: string }> = ({ page, paginate, type }) => {
  let display;
  if (page === 1 && typeof type === "string") display = "disabled";
  return (
    <>
      <li
        className={`page-item ${display}`}
        onClick={() => {
          paginate(page);
        }}
      >
        <a className="page-link" href="!#">
          {type}
        </a>
      </li>
    </>
  );
};
