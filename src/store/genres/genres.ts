import { makeAutoObservable, runInAction } from "mobx";

import { moviesAPI, tvShowsAPI } from "api";
import { GenresCollection, Result, Status } from "types";


export class GenresStore {
  private movieGenres: {
    status: Status;
    data: GenresCollection;
  };
  private tvShowsGenres: {
    status: Status;
    data: GenresCollection;
  };

  constructor() {
    this.movieGenres = {
      status: Status.Initial,
      data: {},
    };
    this.tvShowsGenres = {
      status: Status.Initial,
      data: {},
    };
    makeAutoObservable(this);
  }

  getMovieGenres = async (): Promise<Result<GenresCollection>> => {
    if(this.movieGenres.status === Status.Success) {
      return {
        status: Status.Success,
        data: this.movieGenres.data,
      }
    }

    try {
      runInAction(() => {
        this.movieGenres.status = Status.Loading;
      });
      const { genres } = await moviesAPI.getGenersList();
      runInAction(() => {
        this.movieGenres.data = genres.reduce((prev, curr) => {
          return { ...prev, [curr.id]: curr.name };
        }, {} as GenresCollection);
        this.movieGenres.status = Status.Success;
      })           
      return {
        status: Status.Success,
        data: this.movieGenres.data,
      };
    } catch (error) {
      runInAction(() => {
        this.movieGenres.status = Status.Error;
      });
      return { status: Status.Error };
    }
  }

  getTVShowsGenres = async () => {
    if(this.tvShowsGenres.status === Status.Success) {
      return {
        status: Status.Success,
        data: this.tvShowsGenres.data,
      }
    }
    try {
      runInAction(() => {
        this.tvShowsGenres.status = Status.Loading;
      });
      const { genres } = await tvShowsAPI.getGenersList();
      runInAction(() => {
        this.tvShowsGenres.data = genres.reduce((prev, curr) => {
          return { ...prev, [curr.id]: curr.name };
        }, {} as GenresCollection);
        this.tvShowsGenres.status = Status.Success;
      })
      return {
        status: Status.Success,
        data: this.tvShowsGenres.data,
      };
    } catch (error) {
      runInAction(() => {
        this.tvShowsGenres.status = Status.Error;
      });
      return { status: Status.Error };
    }
  }
}