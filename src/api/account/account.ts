import { ResourceInteractionBaseResponse } from "../common/types";
import { api } from "../common/api"
import { AddToFavoriteRequest, AddToWatchlistRequest, GetAccountDetailsParams, GetAccountDetailsResponse } from "./types";


export const accountApi = {
  getAccountDetails: async (params: GetAccountDetailsParams): Promise<GetAccountDetailsResponse>  => {
    const response = await api.get({
      url: "/account",
      queryParams: {
        session_id: params.sessionId,
      }
    });
    return await response.json();
  },
  addToWatchlist: async (params: AddToWatchlistRequest): Promise<ResourceInteractionBaseResponse> => {
    const response = await api.post({
      url: `/account/${params.account_id}/watchlist`,
      queryParams: {
        session_id: params.session_id,
      },
      init: {
        body: JSON.stringify(params.body),
      }
    });
    return await response.json();
  },
  addToFavorite: async (params: AddToFavoriteRequest): Promise<ResourceInteractionBaseResponse> => {
    const response = await api.post({
      url: `/account/${params.account_id}/favorite`,
      queryParams: {
        session_id: params.session_id,
      },
      init: {
        body: JSON.stringify(params.body),        
      },
      
    });
    return await response.json();
  },
}