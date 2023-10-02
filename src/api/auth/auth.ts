import { api } from "../common/api";
import { 
  CreateAuthenticatedSessionRequest, 
  CreateAuthenticatedSessionResponse, 
  CreateGuestSessionResponse, 
  CreateRequestTokenResponse, 
  ValidateUserCredentialsRequest,
} from "./types";


export const authAPI = {
  createRequestToken: async (): Promise<CreateRequestTokenResponse> => {
    const response = await api.get({
      url: "/authentication/token/new",
    });
    return await response.json();
  },

  createAuthenticatedSession: async (body: CreateAuthenticatedSessionRequest): Promise<CreateAuthenticatedSessionResponse> => {
    const response = await api.post({
      url: "/authentication/session/new",
      init: {
        body: JSON.stringify(body)
      },
    });
    return await response.json();
  },

  validateUserCredentials: async (body: ValidateUserCredentialsRequest): Promise<CreateRequestTokenResponse> => {
    const response = await api.post({
      url: "/authentication/token/validate_with_login",
      init: {
        body: JSON.stringify(body)
      },
    });
    return await response.json();
  },

  createGuestSession: async (): Promise<CreateGuestSessionResponse> => {
    const response = await api.get({
      url: "/authentication/guest_session/new",
    });
    return await response.json();
  }
}