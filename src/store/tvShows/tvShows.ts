import { tvShowsAPI } from "api";
import { makeAutoObservable, runInAction } from "mobx";

import { RootStore } from "store";
import { Status, TVShow, TVShowDetails } from "types";
import { addNotification, isLastTVShowPage, normalizeTVShowsResponse } from "utils";


export class TvShowsPageStore {
  isInitialized: boolean;
  rootStore: RootStore;
  tvShow: {
    status: Status;
    data: TVShowDetails<TVShow> | null;
  };

  constructor(rootStore: RootStore) {
    this.isInitialized = false;
    this.rootStore = rootStore;
    this.tvShow = {
      data: null,
      status: Status.Initial,
    };
    makeAutoObservable(this, {
      rootStore: false,
    })
  }

  get isTVShowDetailsLoading() {
    return this.tvShow.status === Status.Initial || this.tvShow.status === Status.Loading;
  }

  private getGenres = async () => {
    const genres = await this.rootStore.genresStore.getTVShowsGenres();
    if(!genres.data || genres.status === Status.Error) {
      addNotification({
        variant: "error",
        message: "Something went wrong, try later",
      });
      throw new Error("Genres loading error")
    }
    return genres.data
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

  getTVShow = async (id: number): Promise<void> => {
    try {
      runInAction(() => {
        this.tvShow.status = Status.Loading;
      });      
      const response = await tvShowsAPI.getById({ series_id: id });
      const genres = await this.getGenres();
      const normalizedSimilarTVShows = normalizeTVShowsResponse(response.similar.results, genres);
      runInAction(() => {
        this.tvShow.status = Status.Success;
        this.tvShow.data = {
          ...response,
          similar: {
            ...response.similar,
            results: normalizedSimilarTVShows,
          },
        };
      })
    } catch (error) {
      console.log(error);
      addNotification({
        variant: "error",
        message: "Something went wrong, try later",
      });
      runInAction(() => {
        this.tvShow.status = Status.Error;
      });
    }
  }

  getSimilarTVShows = async () => {
    const tvShow = this.tvShow.data;
    if(!tvShow) return;
    const isLastPage = isLastTVShowPage(tvShow.similar);
    if(isLastPage) return;
    try {
      const response = await tvShowsAPI.getSimilar({
        series_id: tvShow.id,
        page: tvShow.similar.page + 1,
      });
      const genres = await this.getGenres();
      const normalizedSimilarTVShows = normalizeTVShowsResponse(response.results, genres);
      runInAction(() => {
        tvShow.similar.page = response.page;
        tvShow.similar.results.push(...normalizedSimilarTVShows)
      });
    } catch (error) {
      console.log(error);
      addNotification({
        variant: "error",
        message: "Something went wrong, try later",
      });
    }
  }
}