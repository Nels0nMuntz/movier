import { makeAutoObservable, runInAction } from "mobx";

import { accountApi } from "api/account/account";
import { AccountDetails, Result, Status, MediaType } from "types";
import { addNotification, localStorageHelper } from "utils";
import { CustomError } from "api";


export class AccountStore {
  account: {
    data: AccountDetails;
    status: Status;
  };
  watchlist: {
    status: Status;
  }

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
    this.watchlist = {
      status: Status.Initial,
    };
    makeAutoObservable(this);
  }

  getAccount = async (sessionId: string): Promise<Result> => {
    try {
      runInAction(() => {
        this.account.status = Status.Loading;
      });
      const { id, username, name, avatar } = await accountApi.getAccountDetails({
        sessionId,
      });
      runInAction(() => {
        this.account.status = Status.Success;
        this.account.data = {
          id: id.toString(),
          username,
          name,
          avatar: avatar.tmdb.avatar_path,
        }
      });
      return { status: Status.Success };
    } catch (error) {
      console.log(error);
      this.account.status = Status.Error;
      return { status: Status.Error };
    }
  }

  addToWatchlist = async (mediaId: number, mediaType: MediaType) => {
    const { id } = this.account.data;
    const sessionId = localStorageHelper.sessionId;
    if(!sessionId) {
      throw new CustomError("There is no 'session_id'")
    }
    try {
      runInAction(() => {
        this.watchlist.status = Status.Loading;
      })
      const response = await accountApi.addToWatchlist({
        account_id: Number(id),
        session_id: sessionId,
        body: {
          media_id: mediaId,
          media_type: mediaType,
          watchlist: true,
        }
      });
      if(response.status_code === 1) {
        this.watchlist.status = Status.Success;
        addNotification({ variant: "info", message: "Added to watchlist" });
      } else {
        addNotification({ variant: "error", message: "Can't add to watchlist" });
      }
    } catch (error) {
      if(error instanceof CustomError) {
        console.log(error);        
      }
    }
  }
}