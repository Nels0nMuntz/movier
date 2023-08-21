import { makeAutoObservable, runInAction } from "mobx";

import { accountApi } from "api/account/account";
import { AccountDetails, Result, Status, MediaType } from "types";
import { addNotification, localStorageHelper, normalizeAccountDetails } from "utils";
import { CustomError } from "api";


export class AccountStore {
  account: {
    data: AccountDetails;
    status: Status;
  };
  addToWatchlistStatus: Status;
  addToFavoriteStatus: Status;

  constructor() {
    this.account = {
      status: Status.Initial,
      data: {
        id: "",
        username: "",
        avatar: "",
        name: "",
      }
    };
    this.addToWatchlistStatus = Status.Initial;
    this.addToWatchlistStatus = Status.Initial;
    makeAutoObservable(this);
  }

  get isAccountDetailsReceived() {
    return this.account.status === Status.Success;
  }

  getAccountDetails = async (sessionId: string): Promise<Result<AccountDetails>> => {
    if(this.account.status === Status.Success) {
      return { status: Status.Success, data: this.account.data };
    }
    return await this.loadAccountDetails(sessionId);
  }

  private loadAccountDetails = async (sessionId: string): Promise<Result<AccountDetails>> => {
    try {
      runInAction(() => {
        this.account.status = Status.Loading;
      });
      const response = await accountApi.getAccountDetails({
        sessionId,
      });
      const accountDetails = normalizeAccountDetails(response);
      runInAction(() => {
        this.account.data = accountDetails;
        this.account.status = Status.Success;
      });
      return { status: Status.Success, data: accountDetails };
    } catch (error) {
      console.log(error);
      this.account.status = Status.Error;
      return { status: Status.Error };
    }
  }

  addToWatchlist = async (mediaId: number, mediaType: MediaType) => {
    const { id } = this.account.data;
    const sessionId = localStorageHelper.sessionId;
    if (!sessionId) {
      throw new CustomError("There is no 'session_id'")
    }
    try {
      runInAction(() => {
        this.addToWatchlistStatus = Status.Loading;
      })
      const response = await accountApi.addToWatchlist({
        account_id: Number(id),
        session_id: sessionId,
        body: {
          media_id: mediaId.toString(),
          media_type: mediaType,
          watchlist: true,
        }
      });
      if (response.success) {
        runInAction(() => {
          this.addToWatchlistStatus = Status.Success;
        });
        switch (response.status_code) {
          case 1:
            addNotification({ variant: "success", message: "Added to watchlist" });
            break;
          case 12:
            addNotification({ variant: "info", message: "Already added" });
            break;
          default:
            break;
        }
      } else {
        throw new CustomError("Can't add to watchlist");
      }
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error);
        runInAction(() => {
          this.addToWatchlistStatus = Status.Error;
        });
        addNotification({ variant: "error", message: error.message });
      }
    }
  }

  addToFavorite = async (mediaId: number, mediaType: MediaType) => {
    const { id } = this.account.data;
    const sessionId = localStorageHelper.sessionId;
    if (!sessionId) {
      throw new CustomError("There is no 'session_id'")
    }
    try {
      runInAction(() => {
        this.addToFavoriteStatus = Status.Loading;
      });
      const response = await accountApi.addToFavorite({
        account_id: Number(id),
        session_id: sessionId,
        body: {
          media_id: mediaId.toString(),
          media_type: mediaType,
          favorite: true,
        }
      });
      if (response.success) {
        runInAction(() => {
          this.addToFavoriteStatus = Status.Success;
        });
        switch (response.status_code) {
          case 1:
            addNotification({ variant: "success", message: "Added to watchlist" });
            break;
          case 12:
            addNotification({ variant: "info", message: "Already added" });
            break;
          default:
            break;
        }
      } else {
        throw new CustomError("Can't add to favorite movies");
      }
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error);
        runInAction(() => {
          this.addToFavoriteStatus = Status.Error;
        });
        addNotification({ variant: "error", message: error.message });
      }
    }
  }
}