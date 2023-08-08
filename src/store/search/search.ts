import { makeAutoObservable, runInAction } from "mobx";
import { CollectionParams, GenresCollection, Movie, MultiSearchResultData, Status, TVShow } from "types";
import { CustomError, searchApi } from "api";
import { addNotification, isLastMoviePage, isLastTVShowPage, normalizeMoviesResponse, normalizeSearchResponse, normalizeTVShowsResponse } from "utils";
import { MultiSearchResponse } from "api/search/types";
import { RootStore } from "store";


const isLastSearchPage =  (response: MultiSearchResponse) => {
  return response.total_pages === 0 || response.page === response.total_pages
}

export class SearchStore {
  query: string;
  multiSearchResult: CollectionParams<MultiSearchResultData>;
  moviesSearchResult: CollectionParams<Movie[]>;
  tvShowsSearchResult: CollectionParams<TVShow[]>;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.query = "";
    this.multiSearchResult = {
      status: Status.Initial,
      data: {
        movies: [],
        tvShows: [],
      },
      page: 0,
      isLastPage: false,
    };
    this.moviesSearchResult = {
      status: Status.Initial,
      data: [],
      page: 0,
      isLastPage: false,
    };
    this.tvShowsSearchResult = {
      status: Status.Initial,
      data: [],
      page: 0,
      isLastPage: false,
    };
    this.rootStore = rootStore;
    makeAutoObservable(this)
  }

  get isMultiSearchRunning() {
    return this.multiSearchResult.status === Status.Loading || this.multiSearchResult.status === Status.Initial;
  }

  get isMultiSearchSuccess() {
    return this.multiSearchResult.status === Status.Success;
  }

  get isSearchInitial() {
    return this.moviesSearchResult.status === Status.Initial || this.tvShowsSearchResult.status === Status.Initial;
  }

  get isSearchFaild() {
    return this.moviesSearchResult.status === Status.Error && this.tvShowsSearchResult.status === Status.Error;
  }

  get isMoviesSearchLoading() {
    return this.moviesSearchResult.status === Status.Loading;
  }

  get isTvShowsSearchLoading() {
    return this.tvShowsSearchResult.status === Status.Loading;
  }

  private async getGenres() {
    const [
      { status: movieStatus, data: movieGenres }, 
      { status: tvShowStatus, data: tvShowGenres }
    ] = await Promise.all([
      this.rootStore.genresStore.getMovieGenres(),
      this.rootStore.genresStore.getTVShowsGenres(),
    ]);
    if(movieStatus === Status.Error || tvShowStatus === Status.Error) {
      throw new CustomError("Something went wront, try later");
    }
    return { movieGenres, tvShowGenres } as { movieGenres: GenresCollection, tvShowGenres: GenresCollection };
  }

  multiSearch = async (query: string) => {
    try {
      runInAction(() => {
        this.query = query;
        this.multiSearchResult.status = Status.Loading
      });
      const response = await searchApi.multiSearch({
        query,
        page: 1,
        includeAdult: false,
        language: "en-US",
      });
      const genres = await this.getGenres();
      const searchResultData = normalizeSearchResponse(response, genres.movieGenres, genres.tvShowGenres);
      const isLastPage = isLastSearchPage(response);
      runInAction(() => {
        this.multiSearchResult.data = searchResultData;
        this.multiSearchResult.isLastPage = isLastPage;
        this.multiSearchResult.status = Status.Success;
      })
    } catch (error) {
      if(error instanceof CustomError) {
        console.log(error);     
        addNotification({ message: "Something went wrong, try later", variant: "error" })   
        runInAction(() => {
          this.multiSearchResult.status = Status.Error;
        })
      }
    }
  }

  searchMovies = async () => {
    if(!this.query || this.moviesSearchResult.isLastPage) {
      return;
    }

    try {
      runInAction(() => {
        this.moviesSearchResult.status = Status.Loading;
      });
      const response = await searchApi.searchMovies({
        query: this.query,
        page: this.moviesSearchResult.page + 1,
        includeAdult: false,
        language: "en-US",
      });
      const genres = await this.getGenres();
      const movies = normalizeMoviesResponse(response.results, genres.movieGenres);
      const isLastPage = isLastMoviePage(response);
      runInAction(() => {
        this.moviesSearchResult.data.push(...movies);
        this.moviesSearchResult.page = response.page;
        this.moviesSearchResult.isLastPage = isLastPage;
        this.moviesSearchResult.status = Status.Success;
      })
    } catch (error) {
      if(error instanceof CustomError) {
        console.log(error);
        addNotification({ message: "Something went wrong, try later", variant: "error" })   
        runInAction(() => {
          this.moviesSearchResult.status = Status.Error;
        });
      }
    }
  }

  searchTvShows = async () => {
    if(!this.query || this.tvShowsSearchResult.isLastPage) {
      return;
    }

    try {
      runInAction(() => {
        this.tvShowsSearchResult.status = Status.Loading;
      });
      const response = await searchApi.searchTvShows({
        query: this.query,
        page: this.tvShowsSearchResult.page + 1,
        includeAdult: false,
        language: "en-US",
      });
      const genres = await this.getGenres();
      const tvShows = normalizeTVShowsResponse(response.results, genres.tvShowGenres);
      const isLastPage = isLastTVShowPage(response);
      runInAction(() => {
        this.tvShowsSearchResult.data.push(...tvShows);
        this.tvShowsSearchResult.page = response.page;
        this.tvShowsSearchResult.isLastPage = isLastPage;
        this.tvShowsSearchResult.status = Status.Success;
      })
    } catch (error) {
      if(error instanceof CustomError) {
        console.log(error);
        addNotification({ message: "Something went wrong, try later", variant: "error" })   
        runInAction(() => {
          this.tvShowsSearchResult.status = Status.Error;
        });
      }
    }
  }

}