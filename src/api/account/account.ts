import { api } from "../api"
import { GetAccountDetailsParams, GetAccountDetailsResponse } from "./types";


export const accountApi = {
  getAccountDetails: async (params: GetAccountDetailsParams): Promise<GetAccountDetailsResponse>  => {
    const response = await api.get({
      url: "/account",
      queryParams: {
        session_id: params.sessionId,
      }
    });
    // const response = await api.get(
    //   withKey("/account") + `&session_id=${params.sessionId}`,
    // );
    return await response.json();
  }
}