import { useLoaderData, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useMemo, useEffect } from "react";

// Components
import CreateUser from "../../features/user/CreateUser";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import SearchAndFilter from "../../components/tours/SearchAndFilter";
import Header from "../../components/layout/Header";
import TourList from "../../components/tours/TourLists";
import { filterTours } from "../../utils/helpers";

/**
 * Tours Page Component
 * Displays list of available tour packages with search and filter functionality
 */
export default function Tours() {
  const tours = useLoaderData();
  const navigation = useNavigation();
  const username = useSelector((state) => state.user.username);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchAttempted, setSearchAttempted] = useState(false);

  /**
   * Filter tours based on search term and price range
   * Memoized to prevent unnecessary recalculations
   */

  const filteredTours = useMemo(() => {
    return filterTours(tours, searchTerm, priceRange);
  }, [tours, searchTerm, priceRange]);

  // Clear search attempt flag when search term is cleared
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchAttempted(false);
    }
  }, [searchTerm]);

  // Show loading spinner while data is being fetched
  if (navigation.state === "loading") return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white ">
      <div className=" bg-[#757575] shadow-black/80 shadow-[0_0_9px_3px]">
        <Header />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* User Authentication Check */}
        {!username ? (
          <CreateUser />
        ) : (
          <>
            {/* Search and Filter Section */}
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              totalTours={tours.length}
              filteredCount={filteredTours.length}
            />

            {/* Tours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
              {filteredTours.map((tour) => (
                <TourList key={tour.id} tour={tour} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
