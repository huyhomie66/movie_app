import { IMovieListParams } from "src/services/apiRoute";
import { useQuery } from "react-query";
import { apiService } from "src/services/apiController";

const usePlayNowList = ({ page = 1 }: IMovieListParams) => {
  const result = useQuery({
    queryKey: ["play_now", page],
    queryFn: () => apiService.getCurrentPlayingList({ page })
  });
  return result;
};

export { usePlayNowList };
