import { api } from "api/api"
import { 
  GetOnTheAirTVShowsRequest,
  GetTrendingTVShowsRequest,
  GetTVShowsGenresResponse,
  GetTVShowsRequest,
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
  getTopRated: async (params: GetTVShowsRequest): Promise<GetTVShowsResponse> => {
    const response = await api.get({
      url: "/tv/top_rated",
      queryParams: {
        language: "en-US",
        page: params.page.toString(),
      }
    })
    return await response.json();
  },
  getPopular: async (params: GetTVShowsRequest): Promise<GetTVShowsResponse> => {
    const response = await api.get({
      url: "/tv/popular",
      queryParams: {
        language: "en-US",
        page: params.page.toString(),
      }
    })
    return await response.json();
  },
  getOnTheAir: async (params: GetOnTheAirTVShowsRequest): Promise<GetTVShowsResponse> => {
    const response = await api.get({
      url: "/tv/on_the_air",
      queryParams: {
        language: "en-US",
        page: params.page.toString(),
        ...params.timezone && {
          timezone: params.timezone,
        }
      }
    })
    return await response.json();
  },
  getAiringToday: async (params: GetOnTheAirTVShowsRequest): Promise<GetTVShowsResponse> => {
    const response = await api.get({
      url: "/tv/airing_today",
      queryParams: {
        language: "en-US",
        page: params.page.toString(),
        ...params.timezone && {
          timezone: params.timezone,
        }
      }
    })
    return await response.json();
  },
}