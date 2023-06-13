import { api, withKey } from "./api"


interface GetAccountDetailsParams {
  sessionId: string;
}

export interface GetAccountDetailsResponse {
  avatar: {
    gravatar: {
      hash: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export const accountApi = {
  getAccountDetails: async (params: GetAccountDetailsParams): Promise<GetAccountDetailsResponse>  => {
    const response = await api.get(
      withKey("/account") + `&session_id=${params.sessionId}`,
    );
    return await response.json();
  }
}