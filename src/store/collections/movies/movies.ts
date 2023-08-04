import { makeAutoObservable, runInAction } from "mobx";

import { moviesAPI } from "api";
import { CollectionParams, GenresCollection, Movie, Result, Status } from "types";
import { isLastMoviePage, normalizeMoviesResponse } from "utils";
import { MoviesLists } from "./types";
import { RootStore } from "store";


export class MoviesCollectionStore {
  lists: MoviesLists;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    const initCollectionParams: CollectionParams<Movie> = {
      status: Status.Initial,
      data: [],
      page: 1,
      isLastPage: false,
    };
    this.lists = {
      popular: initCollectionParams,
      trendingDaily: initCollectionParams,
      trendingWeekly: initCollectionParams,
      topRated: initCollectionParams,
      upcoming: initCollectionParams,
    };
    this.rootStore = rootStore;
    makeAutoObservable(
      this, 
      { rootStore: false },
      { autoBind: true },
    );
  }

  private async getGenres() {
    const { status, data: genres } = await this.rootStore.genresStore.getMovieGenres();
    if(status === Status.Error) {
      throw new Error("Something went wront, try later");
    }
    return genres as GenresCollection;
  }

  getPopular = async (): Promise<Result> => {
    if(this.lists.popular.status === Status.Success) {
      return { 
        status: Status.Success,
        data: this.lists.popular.data,
      };
    }

    const result = await this.loadPopular();
    return result;
  }

  getTrendingDaily = async (): Promise<Result> => {
    if(this.lists.trendingDaily.status === Status.Success) {
      return { 
        status: Status.Success,
        data: this.lists.trendingDaily.data,
      };
    }

    const result = await this.loadTrendingDaily();
    return result;
  }

  getTrendingWeekly = async (): Promise<Result> => {
    if(this.lists.trendingWeekly.status === Status.Success) {
      return { 
        status: Status.Success,
        data: this.lists.trendingWeekly.data,
      };
    }

    const result = await this.loadTrendingWeekly();
    return result;
  }

  getTopRated = async (): Promise<Result> => {
    if(this.lists.topRated.status === Status.Success) {
      return { 
        status: Status.Success,
        data: this.lists.topRated.data,
      };
    }

    const result = await this.loadTopRated();
    return result;
  }

  getUpcoming = async (): Promise<Result> => {
    if(this.lists.upcoming.status === Status.Success) {
      return { 
        status: Status.Success,
        data: this.lists.upcoming.data,
      };
    }

    const result = await this.loadUpcoming();
    return result;
  }

  loadPopular = async (): Promise<Result> => {
    try {
      this.lists.popular.status = Status.Loading;
      const response = await moviesAPI.getPopularMovies({
        page: this.lists.popular.page,
      });
      const genres = await this.getGenres();
      const movies = normalizeMoviesResponse(response.results, genres);
      const isLastPage = isLastMoviePage(response);
      runInAction(() => {
        this.lists.popular.data.push(...movies);
        this.lists.popular.page = response.page + 1;
        this.lists.popular.isLastPage = isLastPage;
        this.lists.popular.status = Status.Success;
      });
      return { 
        status: Status.Success,
        data: this.lists.popular.data,
      };
    } catch (error) {
      runInAction(() => {
        this.lists.popular.status = Status.Error;
      });
      console.log(error);
      return { status: Status.Error };
    }
  }

  loadTrendingDaily = async (): Promise<Result> => {
    try {
      this.lists.trendingDaily.status = Status.Loading;
      const response = await moviesAPI.getTrendingMovies({
        page: this.lists.trendingDaily.page,
        timeWindow: "day",
      });
      const genres = await this.getGenres();
      const movies = normalizeMoviesResponse(response.results, genres);
      const isLastPage = isLastMoviePage(response);
      runInAction(() => {
        this.lists.trendingDaily.data.push(...movies);
        this.lists.trendingDaily.page = response.page + 1;
        this.lists.trendingDaily.isLastPage = isLastPage;
        this.lists.trendingDaily.status = Status.Success;
      });
      return { 
        status: Status.Success,
        data: this.lists.trendingDaily.data,
      };
    } catch (error) {
      runInAction(() => {
        this.lists.trendingDaily.status = Status.Error;
      });
      console.log(error);
      return { status: Status.Error };
    }
  }

  loadTrendingWeekly = async (): Promise<Result> => {
    try {
      this.lists.trendingWeekly.status = Status.Loading;
      const response = await moviesAPI.getTrendingMovies({
        page: this.lists.trendingWeekly.page,
        timeWindow: "week",
      });
      const genres = await this.getGenres();
      const movies = normalizeMoviesResponse(response.results, genres);
      const isLastPage = isLastMoviePage(response);
      runInAction(() => {
        this.lists.trendingWeekly.data.push(...movies);
        this.lists.trendingWeekly.page = response.page + 1;
        this.lists.trendingWeekly.isLastPage = isLastPage;
        this.lists.trendingWeekly.status = Status.Success;
      });
      return { 
        status: Status.Success,
        data: this.lists.trendingWeekly.data,
      };
    } catch (error) {
      runInAction(() => {
        this.lists.trendingWeekly.status = Status.Error;
      });
      console.log(error);
      return { status: Status.Error };
    }
  }

  loadTopRated = async (): Promise<Result> => {
    
    try {
      this.lists.topRated.status = Status.Loading;
      const response = await moviesAPI.getTopRatedMovies({
        page: this.lists.topRated.page,
      });
      const genres = await this.getGenres();
      const movies = normalizeMoviesResponse(response.results, genres);
      const isLastPage = isLastMoviePage(response);
      runInAction(() => {
        this.lists.topRated.data.push(...movies);
        this.lists.topRated.page = response.page + 1;
        this.lists.topRated.isLastPage = isLastPage;
        this.lists.topRated.status = Status.Success;
      });
      return { 
        status: Status.Success,
        data: this.lists.topRated.data,
      };
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.lists.topRated.status = Status.Error;
      });
      return { status: Status.Error };
    }
  }

  loadUpcoming = async (): Promise<Result> => {    
    try {
      this.lists.upcoming.status = Status.Loading;
      const response = await moviesAPI.getUpcomingMovies({
        page: this.lists.upcoming.page,
      });
      const genres = await this.getGenres();
      const movies = normalizeMoviesResponse(response.results, genres);
      const isLastPage = isLastMoviePage(response);
      runInAction(() => {
        this.lists.upcoming.data.push(...movies);
        this.lists.upcoming.page = response.page + 1;
        this.lists.upcoming.isLastPage = isLastPage;
        this.lists.upcoming.status = Status.Success;
      });
      return { 
        status: Status.Success,
        data: this.lists.upcoming.data,
      };
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.lists.upcoming.status = Status.Error;
      });
      return { status: Status.Error };
    }
  }
}