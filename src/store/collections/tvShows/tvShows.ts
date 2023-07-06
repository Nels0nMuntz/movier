import { makeAutoObservable, runInAction } from "mobx";

import { tvShowsAPI } from "api";
import { Genres, Result, Status } from "types";
import { CollectionParams, TVShowsLists } from "./types";
import { isLastTVShowPage, normalizeTVShowsResponse } from "utils";
import { RootStore } from "store";


export class TVShowsCollectionStore {
  lists: TVShowsLists;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    const initSectionParams: CollectionParams = {
      status: Status.Initial,
      data: [],
      page: 1,
      isLastPage: false,
    };
    this.lists = {
      airingToday: initSectionParams,
      onTheAir: initSectionParams,
      popular: initSectionParams,
      topRated: initSectionParams,
      trendingDaily: initSectionParams,
      trendingWeekly: initSectionParams,
    };
    this.rootStore = rootStore;
    makeAutoObservable(
      this, 
      { rootStore: false }, 
      { autoBind: true }
    );
  }

  private async getGenres() {
    const { status, data: genres } = await this.rootStore.genresStore.getTVShowsGenres();
    if(status === Status.Error) {
      throw new Error("Something went wront, try later");
    }
    return genres as Genres;
  }

  getAiringToday = async (): Promise<Result> => {
    if(this.lists.airingToday.status === Status.Success) {
      return {
        status: Status.Success,
        data: this.lists.airingToday.data,
      }
    }

    return await this.loadAiringToday();
  }

  getOnTheAir = async (): Promise<Result> => {
    if(this.lists.onTheAir.status === Status.Success) {
      return {
        status: Status.Success,
        data: this.lists.onTheAir.data,
      }
    }

    return await this.loadOnTheAir();
  }

  getPopular = async (): Promise<Result> => {
    if(this.lists.popular.status === Status.Success) {
      return {
        status: Status.Success,
        data: this.lists.popular.data,
      }
    }

    return await this.loadPopular();
  }

  getTopRated = async (): Promise<Result> => {
    if(this.lists.topRated.status === Status.Success) {
      return {
        status: Status.Success,
        data: this.lists.topRated.data,
      }
    }

    return await this.loadTopRated();
  }

  getTrendingDaily = async (): Promise<Result> => {
    if(this.lists.trendingDaily.status === Status.Success) {
      return { 
        status: Status.Success,
        data: this.lists.trendingDaily.data,
      };
    }

    const result = await this.loadTrendingDaily();
    return result;
  }

  getTrendingWeekly = async (): Promise<Result> => {
    if(this.lists.trendingWeekly.status === Status.Success) {
      return { 
        status: Status.Success,
        data: this.lists.trendingWeekly.data,
      };
    }

    const result = await this.loadTrendingWeekly();
    return result;
  }

  loadAiringToday = async (): Promise<Result> => {    
    try {
      runInAction(() => {
        this.lists.airingToday.status = Status.Loading;
      });
      const response = await tvShowsAPI.getAiringToday({
        page: this.lists.airingToday.page,
      });
      const genres = await this.getGenres();
      const normalizedData = normalizeTVShowsResponse(response.results, genres as Genres);
      runInAction(() => {
        this.lists.airingToday.data.push(...normalizedData);
        this.lists.airingToday.isLastPage = isLastTVShowPage(response);
        this.lists.airingToday.page = response.page + 1;
        this.lists.airingToday.status = Status.Success;
      });
      return { 
        status: Status.Success,
        data: this.lists.airingToday.data,
      };
    } catch (error) {
      console.log({ error });
      runInAction(() => {
        this.lists.airingToday.status = Status.Error;
      });
      return { status: Status.Error }
    }
  }

  loadOnTheAir = async (): Promise<Result> => {    
    try {
      runInAction(() => {
        this.lists.onTheAir.status = Status.Loading;
      });
      const response = await tvShowsAPI.getOnTheAir({
        page: this.lists.onTheAir.page,
      });
      const genres = await this.getGenres();
      const normalizedData = normalizeTVShowsResponse(response.results, genres as Genres);
      runInAction(() => {
        this.lists.onTheAir.data.push(...normalizedData);
        this.lists.onTheAir.isLastPage = isLastTVShowPage(response);
        this.lists.onTheAir.page = response.page + 1;
        this.lists.onTheAir.status = Status.Success;
      });
      return { 
        status: Status.Success,
        data: this.lists.onTheAir.data,
      };
    } catch (error) {
      console.log({ error });
      runInAction(() => {
        this.lists.onTheAir.status = Status.Error;
      });
      return { status: Status.Error }
    }
  }

  loadPopular = async (): Promise<Result> => {    
    try {
      runInAction(() => {
        this.lists.popular.status = Status.Loading;
      });
      const response = await tvShowsAPI.getPopular({
        page: this.lists.popular.page,
      });
      const genres = await this.getGenres();
      const normalizedData = normalizeTVShowsResponse(response.results, genres as Genres);
      runInAction(() => {
        this.lists.popular.data.push(...normalizedData);
        this.lists.popular.isLastPage = isLastTVShowPage(response);
        this.lists.popular.page = response.page + 1;
        this.lists.popular.status = Status.Success;
      });
      return { 
        status: Status.Success,
        data: this.lists.popular.data,
      };
    } catch (error) {
      console.log({ error });
      runInAction(() => {
        this.lists.popular.status = Status.Error;
      });
      return { status: Status.Error }
    }
  }

  loadTopRated = async (): Promise<Result> => {
    try {
      runInAction(() => {
        this.lists.topRated.status = Status.Loading;
      });
      const response = await tvShowsAPI.getTopRated({
        page: this.lists.topRated.page,
      });
      const genres = await this.getGenres();
      const normalizedData = normalizeTVShowsResponse(response.results, genres as Genres);
      runInAction(() => {
        this.lists.topRated.data.push(...normalizedData);
        this.lists.topRated.isLastPage = isLastTVShowPage(response);
        this.lists.topRated.page = response.page + 1;
        this.lists.topRated.status = Status.Success;
      });
      return { 
        status: Status.Success,
        data: this.lists.topRated.data,
      };
    } catch (error) {
      console.log({ error });
      runInAction(() => {
        this.lists.topRated.status = Status.Error;
      });
      return { status: Status.Error }
    }
  }

  loadTrendingDaily = async (): Promise<Result> => {    
    try {
      runInAction(() => {
        this.lists.trendingDaily.status = Status.Loading;
      });
      const response = await tvShowsAPI.getTrendingTVShows({
        page: this.lists.trendingDaily.page,
        timeWindow: "day",
      });
      const genres = await this.getGenres();
      const normalizedData = normalizeTVShowsResponse(response.results, genres as Genres);
      runInAction(() => {
        this.lists.trendingDaily.data.push(...normalizedData);
        this.lists.trendingDaily.isLastPage = isLastTVShowPage(response);
        this.lists.trendingDaily.page = response.page + 1;
        this.lists.trendingDaily.status = Status.Success;
      });
      return { 
        status: Status.Success,
        data: this.lists.trendingDaily.data,
      };
    } catch (error) {
      console.log({ error });
      runInAction(() => {
        this.lists.trendingDaily.status = Status.Error;
      });
      return { status: Status.Error }
    }
  }

  loadTrendingWeekly = async (): Promise<Result> => {    
    try {
      runInAction(() => {
        this.lists.trendingWeekly.status = Status.Loading;
      });
      const response = await tvShowsAPI.getTrendingTVShows({
        page: this.lists.trendingWeekly.page,
        timeWindow: "week",
      });
      const genres = await this.getGenres();
      const normalizedData = normalizeTVShowsResponse(response.results, genres as Genres);
      runInAction(() => {
        this.lists.trendingWeekly.data.push(...normalizedData);
        this.lists.trendingWeekly.isLastPage = isLastTVShowPage(response);
        this.lists.trendingWeekly.page = response.page + 1;
        this.lists.trendingWeekly.status = Status.Success;
      });
      return { 
        status: Status.Success,
        data: this.lists.trendingWeekly.data,
      };
    } catch (error) {
      console.log({ error });
      runInAction(() => {
        this.lists.trendingWeekly.status = Status.Error;
      });
      return { status: Status.Error }
    }
  }
};