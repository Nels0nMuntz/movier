import { makeAutoObservable, runInAction } from "mobx";

import { RootStore } from "store";
import { Status } from "types";
import { addNotification } from "utils";



export class BrowsePageStore {
  isInitialized: boolean;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    })
  }

  initialize = async () => {
    if(this.isInitialized) {
      return;
    }

    const { getMovieGenres, getTVShowsGenres } = this.rootStore.genresStore
    const genres = await Promise.all([
      getMovieGenres(),
      getTVShowsGenres(),
    ]);
    const isGenresLoaded = genres.every(({ status }) => status === Status.Success)
    if(!isGenresLoaded) {
      addNotification({
        variant: "error",
        message: "Something went wrong, try later",
      });
      return;
    }
    
    const { 
      getTrendingDaily: getTrendingDailyMovies,
      getTrendingWeekly: getTrendingWeeklyMovies, 
      getPopular: getPopularMovies 
    } = this.rootStore.moviesCollectionStore;
    const { 
      getTrendingDaily: getTrendingDailyShows,
      getTrendingWeekly: getTrendingWeeklyShows,
    } = this.rootStore.tvShowsCollectionStore;
    const result = await Promise.all([
      getTrendingDailyMovies(),
      getTrendingWeeklyMovies(),
      getPopularMovies(),
      getTrendingDailyShows(),
      getTrendingWeeklyShows(),
    ]);    
    const isLoaded = result.every(({ status }) => status === Status.Success);
    if(isLoaded) {
      runInAction(() => {
        this.isInitialized = true;
      })
    }
  }
}