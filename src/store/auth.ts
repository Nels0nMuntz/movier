import { action, makeObservable, observable } from "mobx";
import {  } from "react-router-dom";
import { 
  authAPI, 
  AuthApproveRequestTokenError, 
  AuthCreateRequestTokenError, 
  AuthCreateSessionError, 
  AuthError,
  AuthValidateUserCredentialsError,
} from "api";
import { LoginData } from "types";


export class AuthStore {
  loading: boolean;
  isGuest: boolean;
  sessionId: string;

  constructor() {
    makeObservable(this, {
      loading: observable,
      sessionId: observable,
      isGuest: observable,
      createGuestSession: action,
      createExternallyAuthenticatedSession: action,
      createAuthenticatedWithCredentialsSession: action,
    })
    this.loading = false;
    this.isGuest = false;
    this.sessionId = ""
  }

  createExternallyAuthenticatedSession = async () => {
    try {
      this.loading = true;

      const createRequestTokenResponse = await authAPI.createRequestToken();

      if (!createRequestTokenResponse.success) {
        throw new AuthCreateRequestTokenError();
      };

      const response = await authAPI.approveRequestToken(createRequestTokenResponse.request_token);
      if(response.status !== 204) {
        throw new AuthApproveRequestTokenError();
      }

      const createAuthenticatedSessionResponse = await authAPI.createAuthenticatedSession({ request_token: createRequestTokenResponse.request_token });
      if(!createAuthenticatedSessionResponse.success) {
        throw new AuthCreateSessionError();
      }
      this.sessionId = createAuthenticatedSessionResponse.session_id;
      this.loading = false;
      window.localStorage.setItem("session_id", createAuthenticatedSessionResponse.session_id);
      window.localStorage.setItem("is_guest", "false");

    } catch (error) {
      if (error instanceof AuthError) {
        console.log(error.message);
      }
      this.loading = false;
    }
  }

  createAuthenticatedWithCredentialsSession = async (data: LoginData) => {
    try {
      this.loading = true;

      const createRequestTokenResponse = await authAPI.createRequestToken();

      if (!createRequestTokenResponse.success) {
        throw new AuthCreateRequestTokenError();
      };

      const validateUserCredentialsResponse = await authAPI.validateUserCredentials({
        username: data.username,
        password: data.password,
        request_token: createRequestTokenResponse.request_token,
      });
      if(!validateUserCredentialsResponse.success) {
        throw new AuthValidateUserCredentialsError();
      }

      const createAuthenticatedSessionResponse = await authAPI.createAuthenticatedSession({ request_token: validateUserCredentialsResponse.request_token });
      if(!createAuthenticatedSessionResponse.success) {
        throw new AuthCreateSessionError();
      }
      this.sessionId = createAuthenticatedSessionResponse.session_id;
      this.loading = false;
      window.localStorage.setItem("session_id", createAuthenticatedSessionResponse.session_id);
      window.localStorage.setItem("is_guest", "false");

    } catch (error) {
      if (error instanceof AuthError) {
        console.log(error.message);
      }
      this.loading = false;
    }
  }
  
  createGuestSession = async () => {
    try {
      this.loading = true;

      const { success, guest_session_id } = await authAPI.createGuestSession();
      if(!success) {
        throw new AuthCreateSessionError();
      }
      this.sessionId = guest_session_id;
      this.isGuest = true;
      window.localStorage.setItem("session_id", guest_session_id);
      window.localStorage.setItem("is_guest", "true");

    } catch (error) {
      if (error instanceof AuthError) {
        console.log(error.message);
      }
      this.loading = false;
    }
  }
}