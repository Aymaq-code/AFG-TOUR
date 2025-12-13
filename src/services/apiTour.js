// API Configuration
const API_BASE_URL =
  "https://raw.githubusercontent.com/Aymaq-code/tour-api/main/touristSpots.json";

export async function getTours() {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch tours. Status: ${response.status}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    throw new Error(error?.message || "Unexpected error while fetching tours");
  }
}

export async function getTourById(id) {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    const tour = data.find((item) => item.id === Number(id));

    // If not found
    if (!tour) {
      throw new Error("Tour not found");
    }

    return tour;
  } catch (error) {
    throw new Error(
      error.message || "Unexpected error while fetching tour by ID"
    );
  }
}

export default {
  getTours,
  getTourById,
};
