import { makeAutoObservable, runInAction } from "mobx";

import { RootStore } from "store";
import { Status } from "types";



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
    const { getTrendingDaly, getTrendingWeekly, getPopular } = this.rootStore.moviesStore;
    const genres = await Promise.all([
      getMovieGenres(),
      getTVShowsGenres(),
    ]);
    // const isGenresLoaded = genres.every(({ status }) => status === Status.Success);
    // if(isGenresLoaded) {
      
    // }
    const result = await Promise.all([
      getTrendingDaly(),
      getTrendingWeekly(),
      getPopular(),
    ]);
    const isLoaded = result.every(({ status }) => status === Status.Success);
    if(isLoaded) {
      runInAction(() => {
        this.isInitialized = true;
      })
    }
  }
}