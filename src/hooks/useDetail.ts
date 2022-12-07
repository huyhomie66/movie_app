import { IMovieDetailParam } from "./../services/apiRoute";
import { useQuery } from "react-query";
import { apiService } from "src/services/apiController";

const useDetail = ({ movie_id }: IMovieDetailParam) => {
  const result = useQuery({
    queryKey: ["detail", movie_id],
    queryFn: () => apiService.getMovieDetail({ movie_id }),
    enabled: !!movie_id
  });
  return result;
};

export { useDetail };
