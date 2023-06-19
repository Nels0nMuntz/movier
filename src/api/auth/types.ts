export interface CreateAuthenticatedSessionRequest {
  request_token: string;
}

export interface ValidateUserCredentialsRequest {
  username: string;
  password: string;
  request_token: string;
}

export interface CreateRequestTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface CreateAuthenticatedSessionResponse {
  success: boolean;
  session_id: string;
}

export interface CreateGuestSessionResponse {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}