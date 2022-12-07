import { IMovieListParams } from "src/services/apiRoute";
import { useQuery } from "react-query";
import { apiService } from "src/services/apiController";
import useDebounce from "src/hooks/useDebounce";

const useSearch = ({ page = 1, query }: IMovieListParams) => {
  console.log(query);

  const debouncedSearchQuery = useDebounce(query, 600);
  const result = useQuery({
    queryKey: ["search", query],
    queryFn: () => apiService.searchMovies({ page, query }),
    enabled: debouncedSearchQuery.length > 0
  });
  return result;
};

export { useSearch };
