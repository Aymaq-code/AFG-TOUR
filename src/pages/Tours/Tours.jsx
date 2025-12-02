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
  const [hasSearchResults, setHasSearchResults] = useState(true);
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

  // Show error message if tours failed to load
  if (!tours) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-lg">
          Error loading tours. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-linear-to-r from-cyan-800 to-blue-900 ">
      <Header />

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

            {/* Display "not available" message for failed searches */}
            {searchAttempted && !hasSearchResults && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-red-400 text-center">
                  The tour or destination "{searchTerm}" is not available.
                </p>
                <p className="text-stone-300 text-sm text-center mt-1">
                  Try searching for a different location or browse all tours
                  below.
                </p>
              </div>
            )}

            {/* Tours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
              {filteredTours.map((tour) => (
                <TourList key={tour.id} tour={tour} />
              ))}
            </div>

            {/* Empty State - Only show when no search attempted */}
            {filteredTours.length === 0 && !searchAttempted && (
              <div className="text-center py-16">
                <p className="text-stone-300 text-lg">
                  No tours found matching your search criteria.
                </p>
                <p className="text-stone-400 text-sm mt-2">
                  Try adjusting your search terms or price range.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
