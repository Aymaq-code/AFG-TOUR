import { useLoaderData, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTour } from "../../services/apiTour";
import Header from "../../ui/Header";
import TourLists from "./TourLists";
import CreateUser from "../user/CreateUser";
import LoadingSpinner from "../../ui/LoadingSpinner";
import SearchAndFilter from "./SearchAndFilter";
import { useState, useMemo } from "react";

function Tour() {
  const tours = useLoaderData();
  const navigation = useNavigation();
  const username = useSelector((state) => state.user.username);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) =>
      tour.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tours, searchTerm]);

  if (navigation.state === "loading") return <LoadingSpinner />;
  if (!tours)
    return <p className="text-center text-red-400">Error loading tours</p>;

  return (
    <div className="tour min-h-screen border">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 mt-6 sm:mt-8">
        {!username ? (
          <CreateUser />
        ) : (
          <>
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
              {filteredTours.map((tour) => (
                <TourLists key={tour.id} tours={tour} />
              ))}
            </div>

            {filteredTours.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-stone-300 text-base sm:text-lg">
                  No tours found matching your criteria.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export async function loader() {
  try {
    const tour = await getTour();
    return tour;
  } catch (error) {
    throw new Response("Failed to load tours", { status: 500 });
  }
}

export default Tour;
