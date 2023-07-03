import { makeAutoObservable } from "mobx";

import { GetTVShowsGenresResponse, GetTVShowsResponse, tvShowsAPI } from "api";
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
    makeAutoObservable(this);
  }

  *getGenres(): Generator<Promise<GetTVShowsGenresResponse>, void, GetTVShowsGenresResponse> {
    try {
      this.genres.status = Status.Loading;
      const response = yield tvShowsAPI.getGenersList();
      this.genres.data = response.genres.reduce((prev, curr) => {
        return { ...prev, [curr.id]: curr.name };
      }, {} as Genres);
      
      this.genres.status = Status.Success;
    } catch (error) {
      this.genres.status = Status.Error;
      console.log({error});      
    }
  }

  *getTrendingDaily(): Generator<Promise<GetTVShowsResponse>, void, GetTVShowsResponse> {
    try {
      this.lists.trendingDaily.status = Status.Loading;
      const response = yield tvShowsAPI.getTrendingTVShows({
        page: this.lists.trendingDaily.page,
        timeWindow: "day",
      });
      const { page, results } = response;
      const normalizedData = normalizeTVShowsResponse(results, this.genres);
      this.lists.trendingDaily.data.push(...normalizedData);
      this.lists.trendingDaily.isLastPage = isLastTVShowPage(response);
      this.lists.trendingDaily.page = page + 1;
      this.lists.trendingDaily.status = Status.Success;
    } catch (error) {
      this.lists.trendingDaily.status = Status.Error;
      console.log({error});      
    }
  }
};