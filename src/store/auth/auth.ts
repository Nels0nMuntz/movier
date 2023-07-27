import { makeAutoObservable, runInAction } from "mobx";
import { 
  authAPI, 
  AuthApproveRequestTokenError, 
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
  loading: boolean;
  isGuest: boolean;
  sessionId: string;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      rootStore: false,
    })
    this.loading = false;
    this.isGuest = false;
    this.sessionId = ""
    this.rootStore = rootStore;
  }

  createExternallyAuthenticatedSession = async ({ onSuccess, onError }: WithCallbacks) => {
    try {
      runInAction(() => {
        this.loading = true;
      });

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

      const { status } = await this.rootStore.accountStore.getAccount(createAuthenticatedSessionResponse.session_id);
      if(status !== Status.Success) {
        throw new GetAccountDetailsError();
      }

      runInAction(() => {
        this.sessionId = createAuthenticatedSessionResponse.session_id;
        this.loading = false;
      });
      localStorageHelper.sessionId = createAuthenticatedSessionResponse.session_id;
      localStorageHelper.isGuest = "false";
      onSuccess && onSuccess();
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error.message);
        addNotification({ variant: "error", message: error.message });
        runInAction(() => {
          this.loading = false;
        });
        onError && onError();
      } else {
        throw error;
      }
    }
  }

  createAuthenticatedWithCredentialsSession = async (params: LoginData & WithCallbacks) => {
    const { username, password, onSuccess, onError } = params;
    try {
      runInAction(() => {
        this.loading = true;
      });

      const createRequestTokenResponse = await authAPI.createRequestToken();

      if (!createRequestTokenResponse.success) {
        throw new AuthCreateRequestTokenError();
      };

      const validateUserCredentialsResponse = await authAPI.validateUserCredentials({
        username,
        password,
        request_token: createRequestTokenResponse.request_token,
      });
      if(!validateUserCredentialsResponse.success) {
        throw new AuthValidateUserCredentialsError();
      }

      const createAuthenticatedSessionResponse = await authAPI.createAuthenticatedSession({ request_token: validateUserCredentialsResponse.request_token });
      if(!createAuthenticatedSessionResponse.success) {
        throw new AuthCreateSessionError();
      }

      const { status } = await this.rootStore.accountStore.getAccount(createAuthenticatedSessionResponse.session_id);
      if(status !== Status.Success) {
        throw new GetAccountDetailsError();
      }

      runInAction(() => {
        this.sessionId = createAuthenticatedSessionResponse.session_id;
        this.loading = false;
      });
      localStorageHelper.sessionId = createAuthenticatedSessionResponse.session_id;
      localStorageHelper.isGuest = "false";
      onSuccess && onSuccess();
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error.message);
        addNotification({ variant: "error", message: error.message });
        runInAction(() => {
          this.loading = false;
        });
        onError && onError();
      } else {
        throw error;
      }
    }
  }
  
  createGuestSession = async ({ onSuccess, onError }: WithCallbacks) => {
    try {
      runInAction(() => {
        this.loading = true;
      });

      const { success, guest_session_id } = await authAPI.createGuestSession();
      if(!success) {
        throw new AuthCreateSessionError();
      }

      // const { status } = await this.rootStore.accountStore.getAccount(guest_session_id);
      // if(status !== Status.Success) {
      //   throw new GetAccountDetailsError();
      // }
      
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
          this.loading = false;
        });
        onError && onError();
      }
    }
  }
}