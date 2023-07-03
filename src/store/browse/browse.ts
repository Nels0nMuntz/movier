import { makeAutoObservable, runInAction } from "mobx";

import { RootStore } from "store";
import { Result, Status } from "types";
import { addNotification } from "utils";



export class BrowseStore {
  isInitialized: boolean;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    })
    this.initialize();
  }

  async initialize() {
    const { getMovieGenres, getTVShowsGenres } = this.rootStore.genresStore;
    const { 
      getTrendingDaily: getTrendingDailyMovies,
      getTrendingWeekly: getTrendingWeeklyMovies, 
      getPopular: getPopularMovies 
    } = this.rootStore.moviesStore;
    const { 
      getTrendingDaily: getTrendingDalyShows,
    } = this.rootStore.tvShowsStore;
    const genres = await Promise.all([
      getMovieGenres(),
      getTVShowsGenres(),
    ]);    
    const isGenresLoaded = genres.every(({ status }) => status === Status.Success);
    if(!isGenresLoaded) {
      addNotification({
        message: "Something went wrong, try later",
        variant: "error",
      });
      return;
    }
    const result = await Promise.all([
      getTrendingDailyMovies(),
      getTrendingWeeklyMovies(),
      getPopularMovies(),
      getTrendingDalyShows(),
    ]);
    const isLoaded = result.every(({ status }) => status === Status.Success);
    if(isLoaded) {
      runInAction(() => {
        this.isInitialized = true;
      })
    }
  }
}