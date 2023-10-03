import { CustomError, moviesAPI } from "api";
import { PrivateListSortOptions } from "api/common/types";
import { makeAutoObservable, runInAction } from "mobx";

import { RootStore } from "store";
import { AccountDetails, CollectionParams, GenresCollection, Movie, MovieDetails, Status } from "types";
import { addNotification, isLastMoviePage, localStorageHelper, normalizeMoviesResponse } from "utils";


export class MoviesPageStore {
  isInitialized: boolean;
  rootStore: RootStore;
  movie: {
    status: Status,
    data: MovieDetails<Movie> | null,
  };
  watchlist: {
    status: Status,
    data: CollectionParams<Movie[]>,
  };
  favorites: {
    status: Status;
    data: CollectionParams<Movie[]>;
  };

  constructor(rootStore: RootStore) {
    const initCollectionParams: CollectionParams<Movie[]> = {
      status: Status.Initial,
      data: [],
      page: 0,
      isLastPage: false,
    };
    this.rootStore = rootStore;
    this.movie = {
      status: Status.Initial,
      data: null,
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

  get isMovieDetailsLoading() {
    return this.movie.status === Status.Initial || this.movie.status === Status.Loading;
  }

  get isWatchlistLoading() {
    return this.watchlist.status === Status.Initial || this.watchlist.status === Status.Loading;
  }

  get isFavoritesLoading() {
    return this.favorites.status === Status.Initial || this.favorites.status === Status.Loading;
  }

  private async getGenres() {
    const { status, data: genres } = await this.rootStore.genresStore.getMovieGenres();
    if(status === Status.Error) {
      throw new CustomError("Something went wront, try later");
    }
    return genres as GenresCollection;
  }

  initialize = async () => {
    if (this.isInitialized) {
      return;
    }

    await this.getGenres();
    const { getTopRated, getPopular, getUpcoming } = this.rootStore.moviesCollectionStore;
    const movies = await Promise.all([
      getTopRated(),
      getPopular(),
      getUpcoming(),
    ]);
    const isMoviesLoaded = movies.every(({ status }) => status === Status.Success);
    if (!isMoviesLoaded) {
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

  getMovie = async (id: number): Promise<void> => {
    try {
      runInAction(() => {
        this.movie.status = Status.Loading;
      });
      const response = await moviesAPI.getById({ id });
      const genres = await this.getGenres();
      const normalizedSimilarMovies = normalizeMoviesResponse(response.similar.results, genres)
      runInAction(() => {
        this.movie.status = Status.Success;
        this.movie.data = {
          ...response,
          similar: {
            ...response.similar,
            results: normalizedSimilarMovies,
          },
        };
      });
    } catch (error) {
      console.log(error);
      addNotification({
        variant: "error",
        message: "Something went wrong, try later",
      });
      runInAction(() => {
        this.movie.status = Status.Error;
      });
    }
  }

  getSimilarMovies = async () => {
    const movie = this.movie.data;
    if(!movie) return;
    const isLastPage = isLastMoviePage(movie.similar);
    if(isLastPage) return;
    try {
      const response = await moviesAPI.getSimilarMovies({
        movie_id: movie.id,
        page: movie.similar.page + 1
      });
      const genres = await this.getGenres();
      const normalizedSimilarMovies = normalizeMoviesResponse(response.results, genres)
      runInAction(() => {
        movie.similar.page = response.page;
        movie.similar.results.push(...normalizedSimilarMovies)
      })
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
      const response = await moviesAPI.getWatchlist({
        accountId: Number(accountDetails.id),
        page: pageNumber,
        sessionId,
        sort_by: PrivateListSortOptions.ASC,
      });
      const genres = await this.getGenres();
      const normalizedMovies = normalizeMoviesResponse(response.results, genres);
      const isLastPage = isLastMoviePage(response);
      runInAction(() => {
        this.watchlist.data.data = normalizedMovies;
        this.watchlist.data.page = response.page;
        this.watchlist.data.isLastPage = isLastPage;
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
      const response = await moviesAPI.getFavoriteMovies({
        accountId: Number(accountDetails.id),
        page: pageNumber,
        sessionId,
        sort_by: PrivateListSortOptions.ASC,
      });
      const genres = await this.getGenres();
      const normalizedMovies = normalizeMoviesResponse(response.results, genres);
      const isLastPage = isLastMoviePage(response);
      runInAction(() => {
        this.favorites.data.data = normalizedMovies;
        this.favorites.data.page = response.page;
        this.favorites.data.isLastPage = isLastPage;
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