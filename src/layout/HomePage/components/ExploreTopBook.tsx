import { Link } from "react-router-dom";

function ExploreTopBook() {
  return (
    <section className="secction-explore">
      <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
        <div className="explore__background"></div>
        <div className="explore__text">
          <h1 className="heading-primary">Find you next adventure</h1>
          <p className="fs-4 py-2">Where would you like to go next</p>
          <Link type="button" className="btn btn--explore" to="/searchbook">
            Explore top books
          </Link>
        </div>
      </div>
      ;
    </section>
  );
}
export default ExploreTopBook;
