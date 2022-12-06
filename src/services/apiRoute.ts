import { stringify } from "querystring";
import { IMAGE_URL } from "src/config";
import { axiosInstance } from "./axiosInstance";

export interface IParams {
  api_key?: string;
  language?: string;
}

export interface IMovieListParams extends IParams {
  page: number;
  query?: string;
}

interface MovieInfo {
  overview: string;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

interface PlayNowResult {
  results: MovieInfo[];
  total_pages: number;
  total_results: number;
}
const formatData = (data: MovieInfo[]) => {
  return data.map((item) => ({
    ...item,
    poster_path: `${IMAGE_URL}${item?.poster_path}`
  }));
};
const getCurrentPlayingList = async (
  params: IMovieListParams
): Promise<PlayNowResult> => {
  const query = stringify({ ...params });
  const result = await axiosInstance.get(`/movie/now_playing?${query}`);
  const finalData = {
    ...result?.data,
    results: formatData(result?.data?.results)
  };

  return finalData;
};

const getTopRateList = async (
  params: IMovieListParams
): Promise<PlayNowResult> => {
  const query = stringify({ ...params });

  const result = await axiosInstance.get(`/movie/top_rated?${query}`);
  return { ...result?.data, results: formatData(result?.data?.results) };
};

const searchMovies = async (
  params: IMovieListParams
): Promise<PlayNowResult> => {
  const query = stringify({ ...params });
  const result = await axiosInstance.get(`/search/multi?${query}`);
  return { ...result.data, results: formatData(result?.data?.results) };
};

export { getCurrentPlayingList, getTopRateList, searchMovies };
