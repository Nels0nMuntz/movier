import { makeAutoObservable, runInAction } from "mobx";

import { tvShowsAPI } from "api";
import { Genres, Status } from "types";
import { SectionParams, TVShowsLists } from "./types";
import { isLastTVShowPage, normalizeTVShowsResponse } from "utils";
import { RootStore } from "store";


export class TVShowsStore {
  lists: TVShowsLists;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    const initSectionParams: SectionParams = {
      status: Status.Initial,
      data: [],
      page: 1,
      isLastPage: false,
    };
    this.lists = {
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

  getTrendingDaily = async () => {
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
      return { status: Status.Success }
    } catch (error) {
      console.log({ error });
      runInAction(() => {
        this.lists.trendingDaily.status = Status.Error;
      });
      return { status: Status.Error }
    }
  }

  getTrendingWeekly = async () => {
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
      return { status: Status.Success }
    } catch (error) {
      console.log({ error });
      runInAction(() => {
        this.lists.trendingWeekly.status = Status.Error;
      });
      return { status: Status.Error }
    }
  }
};