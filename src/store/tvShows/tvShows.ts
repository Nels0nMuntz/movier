import { makeAutoObservable, runInAction } from "mobx";

import { CustomError, tvShowsAPI } from "api";
import { RootStore } from "store";
import { AccountDetails, CollectionParams, Status, TVShow, TVShowDetails } from "types";
import { addNotification, isLastTVShowPage, localStorageHelper, normalizeTVShowsResponse } from "utils";
import { PrivateListSortOptions } from "api/common/types";


export class TvShowsPageStore {
  isInitialized: boolean;
  rootStore: RootStore;
  tvShow: {
    status: Status;
    data: TVShowDetails<TVShow> | null;
  };
  watchlist: {
    status: Status,
    data: CollectionParams<TVShow[]>,
  };
  favorites: {
    status: Status;
    data: CollectionParams<TVShow[]>;
  };

  constructor(rootStore: RootStore) {
    const initCollectionParams: CollectionParams<TVShow[]> = {
      status: Status.Initial,
      data: [],
      page: 0,
      isLastPage: false,
    };
    this.isInitialized = false;
    this.rootStore = rootStore;
    this.tvShow = {
      data: null,
      status: Status.Initial,
    };
    this.watchlist = {
      status: Status.Initial,
      data: initCollectionParams,
    };
    this.favorites = {
      status: Status.Initial,
      data: initCollectionParams,
    };
    makeAutoObservable(this, {
      rootStore: false,
    })
  }

  get isTVShowDetailsLoading() {
    return this.tvShow.status === Status.Initial || this.tvShow.status === Status.Loading;
  }

  get isWatchlistLoading() {
    return this.watchlist.status === Status.Initial || this.watchlist.status === Status.Loading;
  }

  get isFavoritesLoading() {
    return this.favorites.status === Status.Initial || this.favorites.status === Status.Loading;
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

  getWatchlist = async () => {
    try {
      const sessionId = localStorageHelper.sessionId;
      const { status, data } = await this.rootStore.accountStore.getAccountDetails(sessionId);
      if(status !== Status.Success) return;
      const accountDetails = data as AccountDetails;
      const pageNumber = this.watchlist.data.page + (this.watchlist.data.isLastPage ? 0 : 1);
      runInAction(() => {
        this.watchlist.status = Status.Loading;
      });
      const response = await tvShowsAPI.getWatchlist({
        accountId: Number(accountDetails.id),
        page: pageNumber,
        sessionId,
        sort_by: PrivateListSortOptions.ASC,
      });
      const genres = await this.getGenres();
      const normalizedTVShows = normalizeTVShowsResponse(response.results, genres);
      const isLastPage = isLastTVShowPage(response);
      runInAction(() => {
        this.watchlist.data.data = normalizedTVShows;
        this.watchlist.data.page = response.page;
        this.watchlist.data.isLastPage = isLastPage;
        this.watchlist.data.status = Status.Success;
        this.watchlist.status = Status.Success;
      })
    } catch (error) {
      if(error instanceof CustomError) {
        console.log(error);
        addNotification({ message: "Can't get watchlist", variant: "error" });
        runInAction(() => {        
          this.watchlist.status = Status.Error;
        });
      } else {
        throw error;
      }
    }
  }

  getFavorites = async () => {
    try {
      const sessionId = localStorageHelper.sessionId;
      const { status, data } = await this.rootStore.accountStore.getAccountDetails(sessionId);
      if(status !== Status.Success) return;
      const accountDetails = data as AccountDetails;      
      const pageNumber = this.favorites.data.page + (this.favorites.data.isLastPage ? 0 : 1);
      runInAction(() => {
        this.favorites.status = Status.Loading;
      });
      const response = await tvShowsAPI.getFavoriteMovies({
        accountId: Number(accountDetails.id),
        page: pageNumber,
        sessionId,
        sort_by: PrivateListSortOptions.ASC,
      });
      const genres = await this.getGenres();
      const normalizedTVShows = normalizeTVShowsResponse(response.results, genres);
      const isLastPage = isLastTVShowPage(response);
      runInAction(() => {
        this.favorites.data.data = normalizedTVShows;
        this.favorites.data.page = response.page;
        this.favorites.data.isLastPage = isLastPage;
        this.favorites.data.status = Status.Success;
        this.favorites.status = Status.Success;
      })
    } catch (error) {
      if(error instanceof CustomError) {
        console.log(error);
        addNotification({ message: "Can't get favorite movies", variant: "error" });
        runInAction(() => {        
          this.favorites.status = Status.Error;
        });
      } else {
        throw error;
      }
    }
  }
}