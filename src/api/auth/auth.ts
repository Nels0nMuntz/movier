import { api } from "../api";
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
    // const response = await api.get(withKey("/authentication/token/new"));
    return await response.json();
  },

  approveRequestToken: async (requestToken: string) => {
    const response = await api.get({
      url: `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/auth-login`,
    });
    // const response = await api.get(`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/auth-login`);
    return response;
  },

  createAuthenticatedSession: async (body: CreateAuthenticatedSessionRequest): Promise<CreateAuthenticatedSessionResponse> => {
    const response = await api.post({
      url: "/authentication/session/new",
      init: {
        body: JSON.stringify(body)
      },
    });
    // const response = await api.post(
    //   withKey("/authentication/session/new"),
    //   { body: JSON.stringify(body) },
    // );
    return await response.json();
  },

  validateUserCredentials: async (body: ValidateUserCredentialsRequest): Promise<CreateRequestTokenResponse> => {
    const response = await api.post({
      url: "/authentication/token/validate_with_login",
      init: {
        body: JSON.stringify(body)
      },
    });
    // const response = await api.post(
    //   withKey("/authentication/token/validate_with_login"),
    //   { body: JSON.stringify(body) },
    // );
    return await response.json();
  },

  createGuestSession: async (): Promise<CreateGuestSessionResponse> => {
    const response = await api.get({
      url: "/authentication/guest_session/new",
    });
    // const response = await api.get(withKey("/authentication/guest_session/new"))
    return await response.json();
  }
}