import { rootStore } from "store";


export const APP_URLS = {
  authWelcome: "/auth-welcome",
  authLogin: "/auth-login",
  browse: {
    path: "/browse",
    loader: async () => {
      rootStore.browsePageStore.initialize();
      return null;
    }
  },
  movies: {
    path: "/movies",
    loader: async () => {
      rootStore.moviesPageStore.initialize();
      return null;
    }
  },
  tvShows: {
    path: "/shows",
    loader: async () => {
      rootStore.tvShowsPageStore.initialize();
      return null;
    }
  },
};