import { useContext } from "react";
import { SearchContext } from "./searchContext";
import StarSVG from "../assets/star.svg";

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

// Function to generate stars based on rating
export const generateStars = (rating) => {
  return Array.from({ length: rating }, (_, index) => (
    <img
      key={index}
      src={StarSVG} // Make sure StarSVG is defined or replace it with the actual source
      alt={`star-${index + 1}`}
      className="h-4 w-4"
    />
  ));
};
