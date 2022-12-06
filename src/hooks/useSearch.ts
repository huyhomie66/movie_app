import { IMovieListParams } from "src/services/apiRoute";
import { useQuery } from "react-query";
import { apiService } from "src/services/apiController";

const useSearch = ({ page = 1, query }: IMovieListParams) => {
  const result = useQuery({
    queryKey: ["play_now", page],
    queryFn: () => apiService.searchMovies({ page, query }),
    keepPreviousData: true
  });
  return result;
};

export { useSearch };
