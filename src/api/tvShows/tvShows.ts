import { api } from "api/api"
import { 
  GetTrendingTVShowsRequest,
  GetTVShowsGenresResponse,
  GetTVShowsResponse,
} from "./types";

export const tvShowsAPI = {
  getGenersList: async (): Promise<GetTVShowsGenresResponse> => {
    const response = await api.get({
      url: "/genre/tv/list",
    });
    return await response.json();
  },
  getTrendingTVShows: async (params: GetTrendingTVShowsRequest): Promise<GetTVShowsResponse> => {
    const response = await api.get({
      url: `/trending/tv/${params.timeWindow}`,
      queryParams: {
        language: "en-US",
        page: params.page.toString(),
      }
    });
    return await response.json();
  },
}