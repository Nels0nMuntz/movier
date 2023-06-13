import { api, withKey } from "./api";


interface CreateAuthenticatedSessionRequest {
  request_token: string;
}

interface ValidateUserCredentialsRequest {
  username: string;
  password: string;
  request_token: string;
}

interface CreateRequestTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

interface CreateAuthenticatedSessionResponse {
  success: boolean;
  session_id: string;
}

interface CreateGuestSessionResponse {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export const authAPI = {
  createRequestToken: async (): Promise<CreateRequestTokenResponse> => {
    const response = await api.get(withKey("/authentication/token/new"));
    return await response.json();
  },

  approveRequestToken: async (requestToken: string) => {
    const response = await api.get(`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/auth-login`);
    return response;
  },

  createAuthenticatedSession: async (body: CreateAuthenticatedSessionRequest): Promise<CreateAuthenticatedSessionResponse> => {
    const response = await api.post(
      withKey("/authentication/session/new"),
      { body: JSON.stringify(body) },
    );
    return await response.json();
  },

  validateUserCredentials: async (body: ValidateUserCredentialsRequest): Promise<CreateRequestTokenResponse> => {
    const response = await api.post(
      withKey("/authentication/token/validate_with_login"),
      { body: JSON.stringify(body) },
    );
    return await response.json();
  },

  createGuestSession: async (): Promise<CreateGuestSessionResponse> => {
    const response = await api.get(withKey("/authentication/guest_session/new"))
    return await response.json();
  }
}