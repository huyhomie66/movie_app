import { IMovieDetailParam } from "./apiRoute";
import { getMovieDetail, IParams } from "src/services/apiRoute";
import {
  getCurrentPlayingList,
  getTopRateList,
  IMovieListParams,
  searchMovies
} from "src/services/apiRoute";

const api_key: string = process.env.API_KEY;
const language: string = "en-US";

const defaultParams: IParams = {
  api_key,
  language
};

const apiService = {
  getCurrentPlayingList: (params: IMovieListParams) =>
    getCurrentPlayingList({ ...params, ...defaultParams }),
  getTopRateList: (params: IMovieListParams) =>
    getTopRateList({ ...params, ...defaultParams }),
  searchMovies: (params: IMovieListParams) =>
    searchMovies({ ...params, ...defaultParams }),
  getMovieDetail: (params: IMovieDetailParam) =>
    getMovieDetail({ ...params, ...defaultParams })
};

export { apiService };
