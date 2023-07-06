import { makeAutoObservable, runInAction } from "mobx";

import { RootStore } from "store";
import { Status } from "types";
import { addNotification } from "utils";


export class TvShowsPageStore {
  isInitialized: boolean;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.isInitialized = false;
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    })
  }

  initialize = async () => {
    if(this.isInitialized) {
      return;
    }

    const { getTVShowsGenres } = this.rootStore.genresStore
    const genres = await getTVShowsGenres();
    const isGenresLoaded = genres.status === Status.Success;
    if(!isGenresLoaded) {
      addNotification({
        variant: "error",
        message: "Something went wrong, try later",
      });
      return;
    }

    const { 
      getAiringToday,
      getOnTheAir,
      getPopular,
      getTopRated,
    } = this.rootStore.tvShowsCollectionStore;
    const movies = await Promise.all([
      getAiringToday(),
      getOnTheAir(),
      getTopRated(),
      getPopular(),
    ]);
    const isMoviesLoaded = movies.every(({ status }) => status === Status.Success);
    if(!isMoviesLoaded) {
      addNotification({
        variant: "error",
        message: "Something went wrong, try later",
      });
      return;
    }

    runInAction(() => {
      this.isInitialized = true;
    })
  }
}