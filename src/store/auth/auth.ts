import { makeAutoObservable, runInAction } from "mobx";
import {
  authAPI,
  AuthCreateRequestTokenError,
  AuthCreateSessionError,
  AuthValidateUserCredentialsError,
  CustomError,
  GetAccountDetailsError,
} from "api";
import { LoginData, Status, WithCallbacks } from "types";
import { addNotification, localStorageHelper } from "utils";
import { RootStore } from "store";

export class AuthStore {
  sessionCreating: boolean;
  requestTokenStatus: Status;
  requestToken: string;
  isGuest: boolean;
  sessionId: string;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.sessionCreating = false;
    this.requestTokenStatus = Status.Initial;
    this.requestToken = localStorageHelper.requestToken;
    this.isGuest = localStorageHelper.isGuest;
    this.sessionId = localStorageHelper.sessionId;
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    });
  }

  createRequestToken = async () => {
    if (this.requestToken) {
      return;
    }
    try {
      runInAction(() => {
        this.requestTokenStatus = Status.Loading;
      });
      const createRequestTokenResponse = await authAPI.createRequestToken();

      if (!createRequestTokenResponse.success) {
        throw new AuthCreateRequestTokenError();
      }

      runInAction(() => {
        this.requestToken = createRequestTokenResponse.request_token;
        localStorageHelper.requestToken = createRequestTokenResponse.request_token;
        this.requestTokenStatus = Status.Success;
      });
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error.message);
        addNotification({ variant: "error", message: error.message });
        runInAction(() => {
          this.requestTokenStatus = Status.Error;
        });
      }
    }
  };

  createExternallyAuthenticatedSession = async ({ onSuccess, onError }: WithCallbacks) => {
    try {
      if (!this.requestToken) {
        throw new AuthCreateRequestTokenError();
      }

      runInAction(() => {
        this.sessionCreating = true;
      });

      const createAuthenticatedSessionResponse = await authAPI.createAuthenticatedSession({
        request_token: this.requestToken,
      });
      if (!createAuthenticatedSessionResponse.success) {
        throw new AuthCreateSessionError();
      }

      const { status } = await this.rootStore.accountStore.getAccountDetails(
        createAuthenticatedSessionResponse.session_id,
      );
      if (status !== Status.Success) {
        throw new GetAccountDetailsError();
      }

      runInAction(() => {
        this.sessionId = createAuthenticatedSessionResponse.session_id;
        this.sessionCreating = false;
      });
      localStorageHelper.sessionId = createAuthenticatedSessionResponse.session_id;
      localStorageHelper.isGuest = "false";
      onSuccess && onSuccess();
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error.message);
        addNotification({ variant: "error", message: error.message });
        runInAction(() => {
          this.sessionCreating = false;
        });
        onError && onError();
      } else {
        throw error;
      }
    }
  };

  createAuthenticatedWithCredentialsSession = async (params: LoginData & WithCallbacks) => {
    const { username, password, onSuccess, onError } = params;
    try {
      if (!this.requestToken) {
        throw new AuthCreateRequestTokenError();
      }

      runInAction(() => {
        this.sessionCreating = true;
      });

      const validateUserCredentialsResponse = await authAPI.validateUserCredentials({
        username,
        password,
        request_token: this.requestToken,
      });

      if (!validateUserCredentialsResponse.success) {
        throw new AuthValidateUserCredentialsError();
      }

      const createAuthenticatedSessionResponse = await authAPI.createAuthenticatedSession({
        request_token: validateUserCredentialsResponse.request_token,
      });

      if (!createAuthenticatedSessionResponse.success) {
        throw new AuthCreateSessionError();
      }

      const { status } = await this.rootStore.accountStore.getAccountDetails(
        createAuthenticatedSessionResponse.session_id,
      );
      if (status !== Status.Success) {
        throw new GetAccountDetailsError();
      }

      runInAction(() => {
        this.sessionId = createAuthenticatedSessionResponse.session_id;
        this.sessionCreating = false;
      });
      localStorageHelper.sessionId = createAuthenticatedSessionResponse.session_id;
      localStorageHelper.isGuest = "false";
      onSuccess && onSuccess();
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error.message);
        addNotification({ variant: "error", message: error.message });
        runInAction(() => {
          this.sessionCreating = false;
        });
        onError && onError();
      } else {
        throw error;
      }
    }
  };

  createGuestSession = async ({ onSuccess, onError }: WithCallbacks) => {
    try {
      runInAction(() => {
        this.sessionCreating = true;
      });

      const { success, guest_session_id } = await authAPI.createGuestSession();
      if (!success) {
        throw new AuthCreateSessionError();
      }

      runInAction(() => {
        this.sessionId = guest_session_id;
        this.isGuest = true;
      });
      localStorageHelper.sessionId = guest_session_id;
      localStorageHelper.isGuest = "true";
      onSuccess && onSuccess();
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error.message);
        addNotification({ variant: "error", message: error.message });
        runInAction(() => {
          this.sessionCreating = false;
        });
        onError && onError();
      }
    }
  };

  deleteSession = () => {
    runInAction(() => {
      this.requestTokenStatus = Status.Initial;
      this.requestToken = "";
      this.isGuest = false;
      this.sessionId = "";
    });
  };
}
