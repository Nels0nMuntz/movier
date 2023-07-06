import { makeAutoObservable, runInAction } from "mobx";

import { RootStore } from "store";
import { Status } from "types";
import { addNotification } from "utils";


export class MoviesPageStore {
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

    const { getMovieGenres } = this.rootStore.genresStore
    const genres = await getMovieGenres();
    const isGenresLoaded = genres.status === Status.Success;
    if(!isGenresLoaded) {
      addNotification({
        variant: "error",
        message: "Something went wrong, try later",
      });
      return;
    }

    const { getTopRated, getPopular, getUpcoming } = this.rootStore.moviesCollectionStore;
    const movies = await Promise.all([
      getTopRated(),
      getPopular(),
      getUpcoming(),
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