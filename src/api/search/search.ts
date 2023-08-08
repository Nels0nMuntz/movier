import { api } from "../common/api"
import { SearchRequest, MultiSearchResponse, MoviesSearchResponse, TVShowsSearchResponse } from "./types"


export const searchApi = {
  multiSearch: async (params: SearchRequest): Promise<MultiSearchResponse> => {
    const { query, includeAdult,language, page } = params;
    const response = await api.get({
      url: "/search/multi",
      queryParams: {
        query,
        include_adult: includeAdult.toString(),
        language,
        page: page.toString(),
      }
    })
    return await response.json();
  },
  searchMovies: async (params: SearchRequest): Promise<MoviesSearchResponse> => {
    const { query, includeAdult,language, page } = params;
    const response = await api.get({
      url: "/search/movie",
      queryParams: {
        query,
        include_adult: includeAdult.toString(),
        language,
        page: page.toString(),
      }
    })
    return await response.json();
  },
  searchTvShows: async (params: SearchRequest): Promise<TVShowsSearchResponse> => {
    const { query, includeAdult,language, page } = params;
    const response = await api.get({
      url: "/search/tv",
      queryParams: {
        query,
        include_adult: includeAdult.toString(),
        language,
        page: page.toString(),
      }
    })
    return await response.json();
  },
}