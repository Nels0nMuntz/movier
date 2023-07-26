import { api } from "api/api"
import { 
  GetOnTheAirTVShowsRequest,
  GetSimilarTVShowsRequest,
  GetSimilarTVShowsResponse,
  GetTrendingTVShowsRequest,
  GetTVShowByIdRequest,
  GetTVShowByIdResponse,
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
  getById: async (params: GetTVShowByIdRequest): Promise<GetTVShowByIdResponse> => {
    const response = await api.get({
      url: `/tv/${params.series_id}`,
      queryParams: {
        language: "en-US",
        append_to_response: "credits,release_dates,combined_credits,similar,reviews"
      },
    });
    return await response.json();
  },
  getSimilar: async (params: GetSimilarTVShowsRequest): Promise<GetSimilarTVShowsResponse> => {
    const response = await api.get({
      url: `/tv/${params.series_id}/similar`,
      queryParams: {
        page: params.page.toString(),
      }
    });
    return response.json()
  }
}