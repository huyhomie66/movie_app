import { IMovieListParams } from "src/services/apiRoute";
import { useQuery } from "react-query";
import { apiService } from "src/services/apiController";

const useTopRateList = ({ page = 1 }: IMovieListParams) => {
  const result = useQuery({
    queryKey: ["top_rate", page],
    queryFn: () => apiService.getTopRateList({ page }),
    keepPreviousData: true
  });
  return result;
};

export { useTopRateList };
