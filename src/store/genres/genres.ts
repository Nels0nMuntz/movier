import { makeAutoObservable } from "mobx";

import { moviesAPI, tvShowsAPI } from "api";
import { Genres, Status } from "types";


export class GenresStore {
  movieGenres: Genres;
  tvShowsGenres: Genres;

  constructor() {
    this.movieGenres = {};
    this.tvShowsGenres = {};
    makeAutoObservable(this);
  }

  async getMovieGenres() {
    try {
      const { genres } = await moviesAPI.getGenersList();
      this.movieGenres = genres.reduce((prev, curr) => {
        return { ...prev, [curr.id]: curr.name };
      }, {} as Genres);
      return { status: Status.Success }
    } catch (error) {
      return { status: Status.Error }
    }
  }

  async getTVShowsGenres() {
    try {
      const { genres } = await tvShowsAPI.getGenersList();
      this.movieGenres = genres.reduce((prev, curr) => {
        return { ...prev, [curr.id]: curr.name };
      }, {} as Genres);
      return { status: Status.Success }
    } catch (error) {
      return { status: Status.Error }
    }
  }
}