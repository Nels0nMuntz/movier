import { makeAutoObservable, runInAction } from "mobx";

import { tvShowsAPI } from "api";
import { Genres, Status } from "types";
import { SectionParams, TVShowsLists } from "./types";
import { isLastTVShowPage, normalizeTVShowsResponse } from "utils";


export class TVShowsStore {
  genres: {
    status: Status;
    data: Genres;
  };
  lists: TVShowsLists

  constructor() {
    this.genres = {
      status: Status.Initial,
      data: {},
    };
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
    makeAutoObservable(this, {}, { autoBind: true });
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
      const { page, results } = response;
      const normalizedData = normalizeTVShowsResponse(results, this.genres);
      runInAction(() => {
        this.lists.trendingDaily.data.push(...normalizedData);
        this.lists.trendingDaily.isLastPage = isLastTVShowPage(response);
        this.lists.trendingDaily.page = page + 1;
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
};