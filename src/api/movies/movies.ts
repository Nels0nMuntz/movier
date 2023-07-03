import { api } from "../api"
import { 
  GetGenersMovieListResponse, 
  GetMoviesResponse,
  GetMoviesRequest,
  GetTrendingMoviesRequest,
} from "./types"

export const moviesAPI = {
  getPopularMovies: async (params: GetMoviesRequest): Promise<GetMoviesResponse> => {
    const response = await api.get({
      url: "/movie/popular",
      queryParams: {
        language: "en-US",
        page: params.page.toString(),
      }
    });
    return await response.json();
  },

  getTrendingMovies: async (params: GetTrendingMoviesRequest): Promise<GetMoviesResponse> => {
    const response = await api.get({
      url: `/trending/movie/${params.timeWindow}`,
      queryParams: {
        language: "en-US",
        page: params.page.toString(),
      }
    });
    return await response.json();
  },

  getTopRatedMovies: async (params: GetMoviesRequest): Promise<GetMoviesResponse> => {
    const response = await api.get({
      url: "/movie/top_rated",
      queryParams: {
        language: "en-US",
        page: params.page.toString(),
      }
    });
    return await response.json();
  },

  getUpcomingMovies: async (params: GetMoviesRequest): Promise<GetMoviesResponse> => {
    const response = await api.get({
      url: "/movie/upcoming",
      queryParams: {
        language: "en-US",
        page: params.page.toString(),
      }
    });
    return await response.json();
  },

  getGenersList: async (): Promise<GetGenersMovieListResponse> => {
    const response = await api.get({
      url: "/genre/movie/list",
      queryParams: {
        language: "en"
      },
    });
    return await response.json();
  }
}