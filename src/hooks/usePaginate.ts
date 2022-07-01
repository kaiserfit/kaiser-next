import { useState } from "react";
import customerReviews from "../lib/fathacksPage/reviews";

const usePaginate = (page: number) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const startIndex = page * itemsPerPage;
  const lastIndex = page + itemsPerPage;
  const fetchedData = customerReviews.filter((_, i) => {
    return i >= startIndex && lastIndex >= i;
  });

  return fetchedData;
};

export default usePaginate;
