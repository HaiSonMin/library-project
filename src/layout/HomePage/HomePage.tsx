import Carousel from "./components/Carousel";
import ExploreTopBook from "./components/ExploreTopBook";
import Heros from "./components/Heros";
import LibraryServices from "./components/LibraryServices";

function HomePage() {
  return (
    <>
      <ExploreTopBook />
      <Carousel />
      <Heros />
      <LibraryServices />
    </>
  );
}

export default HomePage;
