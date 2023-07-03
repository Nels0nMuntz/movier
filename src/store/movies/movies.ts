import { makeAutoObservable, runInAction } from "mobx";

import { moviesAPI } from "api";
import { Status } from "types";
import { isLastMoviePage, normalizeMoviesResponse } from "utils";
import { SectionParams, SectionKey } from "./types";
import { RootStore } from "store";


export class MoviesStore {
  lists: Record<SectionKey, SectionParams>;
  // genres: Genres;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    const initSectionParams: SectionParams = {
      status: Status.Initial,
      data: [],
      page: 1,
      isLastPage: false,
    };
    this.lists = {
      popular: initSectionParams,
      trendingDaily: initSectionParams,
      trendingWeekly: initSectionParams,
      topRated: initSectionParams,
      upcoming: initSectionParams,
    };
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    });
  }

  get genres() {
    return this.rootStore.genresStore.movieGenres;
  }

  getPopular = async () => {
    try {
      this.lists.popular.status = Status.Loading;
      const response = await moviesAPI.getPopularMovies({
        page: this.lists.popular.page,
      });
      const movies = normalizeMoviesResponse(response.results, this.genres);
      const isLastPage = isLastMoviePage(response);
      runInAction(() => {
        this.lists.popular.data.push(...movies);
        this.lists.popular.page = response.page + 1;
        this.lists.popular.isLastPage = isLastPage;
        this.lists.popular.status = Status.Success;
      });
      return { status: Status.Success };
    } catch (error) {
      runInAction(() => {
        this.lists.popular.status = Status.Error;
      });
      console.log(error);
      return { status: Status.Error };
    }
  }

  getTrendingDaily = async () => {
    try {
      this.lists.trendingDaily.status = Status.Loading;
      const response = await moviesAPI.getTrendingMovies({
        page: this.lists.trendingDaily.page,
        timeWindow: "day",
      });
      const movies = normalizeMoviesResponse(response.results, this.genres);
      const isLastPage = isLastMoviePage(response);
      runInAction(() => {
        this.lists.trendingDaily.data.push(...movies);
        this.lists.trendingDaily.page = response.page + 1;
        this.lists.trendingDaily.isLastPage = isLastPage;
        this.lists.trendingDaily.status = Status.Success;
      });
      return { status: Status.Success };
    } catch (error) {
      runInAction(() => {
        this.lists.trendingDaily.status = Status.Error;
      });
      console.log(error);
      return { status: Status.Error };
    }
  }

  getTrendingWeekly = async () => {
    try {
      this.lists.trendingWeekly.status = Status.Loading;
      const response = await moviesAPI.getTrendingMovies({
        page: this.lists.trendingWeekly.page,
        timeWindow: "week",
      });
      const movies = normalizeMoviesResponse(response.results, this.genres);
      const isLastPage = isLastMoviePage(response);
      runInAction(() => {
        this.lists.trendingWeekly.data.push(...movies);
        this.lists.trendingWeekly.page = response.page + 1;
        this.lists.trendingWeekly.isLastPage = isLastPage;
        this.lists.trendingWeekly.status = Status.Success;
      });
      return { status: Status.Success };
    } catch (error) {
      runInAction(() => {
        this.lists.trendingWeekly.status = Status.Error;
      });
      console.log(error);
      return { status: Status.Error };
    }
  }

  getTopRated = async () => {
    try {
      this.lists.topRated.status = Status.Loading;
      const response = await moviesAPI.getTopRatedMovies({
        page: this.lists.topRated.page,
      });
      const movies = normalizeMoviesResponse(response.results, this.genres);
      const isLastPage = isLastMoviePage(response);
      runInAction(() => {
        this.lists.topRated.data.push(...movies);
        this.lists.topRated.page = response.page + 1;
        this.lists.topRated.isLastPage = isLastPage;
        this.lists.topRated.status = Status.Success;
      });
    } catch (error) {
      runInAction(() => {
        this.lists.topRated.status = Status.Error;
      });
      console.log(error);
    }
  }

  getUpcoming = async () => {
    try {
      this.lists.upcoming.status = Status.Loading;
      const response = await moviesAPI.getUpcomingMovies({
        page: this.lists.upcoming.page,
      });
      const movies = normalizeMoviesResponse(response.results, this.genres);
      const isLastPage = isLastMoviePage(response);
      runInAction(() => {
        this.lists.upcoming.data.push(...movies);
        this.lists.upcoming.page = response.page + 1;
        this.lists.upcoming.isLastPage = isLastPage;
        this.lists.upcoming.status = Status.Success;
      });
    } catch (error) {
      runInAction(() => {
        this.lists.upcoming.status = Status.Error;
      });
      console.log(error);
    }
  }

  // getGeners = async () => {

  //   try {
  //     this.genres.status = Status.Loading;
  //     const response = await moviesAPI.getGenersList();
  //     const genresObject = {} as Record<number, string>
  //     response.genres.forEach(({ id, name }) => {
  //       genresObject[id] = name;
  //     });
  //     runInAction(() => {
  //       this.genres.data = genresObject;
  //       this.genres.status = Status.Success;
  //     });
  //   } catch (error) {
  //     runInAction(() => {
  //       this.genres.status = Status.Error;
  //     });
  //     console.log(error);
  //   }
  // }
}