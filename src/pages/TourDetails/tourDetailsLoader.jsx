import { getTourById } from "../../services/apiTour";

export async function loader({ params }) {
  try {
    const tour = await getTourById(params.tourId);

    if (!tour) {
      throw new Response("Tour not found", { status: 404 });
    }

    return tour;
  } catch (error) {
    console.error("Loader error:", error);
    throw new Response("Failed to load tour details", { status: 500 });
  }
}
