import { api } from "../api"
import { GetPopularMovieListResponse } from "./types"

export const moviesAPI = {
  getPopularMovieList: async (page = 1): Promise<GetPopularMovieListResponse> => {
    const response = await api.get({
      url: "/movie/popular",
      queryParams: {
        language: "en-US",
        page: page.toString(),
      }
    });
    return await response.json();
  }
}