import { stringify } from "querystring";
import { IMAGE_URL } from "src/config";
import { axiosInstance } from "./axiosInstance";

export interface IParams {
  api_key?: string;
  language?: string;
}

export interface IMovieListParams extends IParams {
  page?: number;
  query?: string;
}

export interface MovieInfo {
  id: number;
  overview: string;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieListResult {
  results: MovieInfo[];
  total_pages: number;
  total_results: number;
}

export interface IMovieDetailParam extends IMovieListParams {
  movie_id: number;
}

const getCurrentPlayingList = async (
  params: IMovieListParams
): Promise<MovieListResult> => {
  const query = stringify({ ...params });
  const result = await axiosInstance.get(`/movie/now_playing?${query}`);
  return result.data;
};

const getTopRateList = async (
  params: IMovieListParams
): Promise<MovieListResult> => {
  const query = stringify({ ...params });

  const result = await axiosInstance.get(`/movie/top_rated?${query}`);
  return result.data;
};

const searchMovies = async (
  params: IMovieListParams
): Promise<MovieListResult> => {
  const query = stringify({ ...params });
  const result = await axiosInstance.get(`/search/multi?${query}`);
  return result.data;
};

const getMovieDetail = async (params: IMovieDetailParam) => {
  const query = stringify({ ...params });

  const result = await axiosInstance.get(`/movie/${params.movie_id}?${query}`);
  return result.data;
};

export { getCurrentPlayingList, getTopRateList, searchMovies, getMovieDetail };
