import { getTours } from "../../services/apiTour";

/**
 * Loader function for tours page
 * Fetches all available tours from the API
 */
export async function loader() {
  // ✅ Export as 'loader'
  try {
    const tours = await getTours();

    if (!tours || tours.length === 0) {
      throw new Response("No tours available", { status: 404 });
    }

    return tours;
  } catch (error) {
    console.error("Loader error:", error);
    throw new Response("Failed to load tours", { status: 500 });
  }
}
