import { LoaderFunctionArgs } from "react-router-dom";
import { rootStore } from "store";
import { MediaType } from "types";


const {
  browsePageStore,
  moviesPageStore,
  tvShowsPageStore,
} = rootStore;

export const APP_URLS = {
  authWelcome: "/auth-welcome",
  authLogin: "/auth-login",
  browse: {
    path: "/browse",
    loader: async () => {
      await browsePageStore.initialize();
      return null;
    }
  },
  movies: {
    path: "/movies",
    loader: async () => {
      await moviesPageStore.initialize();
      return null;
    }
  },
  tvShows: {
    path: "/shows",
    loader: async () => {
      await tvShowsPageStore.initialize();
      return null;
    }
  },
  movieDetails: {
    path: "/movie/:id",
    loader: async (id: number) => {
      await moviesPageStore.getMovie(id);
      return null;
    },
  },
  tvShowDetails: {
    path: "/tv/:id",
    loader: async (id: number) => {
      await tvShowsPageStore.getTVShow(id);
      return null;
    },
  },
  watchlist: {
    path: {
      movies: "/watchlist/movie",
      tv: "/watchlist/tv",
    },
    loader: async (args: LoaderFunctionArgs) => {
      const mediaType = args.params.type as MediaType;
      if(mediaType === "movie") {
        await moviesPageStore.getWatchlist();
      } else {
        await tvShowsPageStore.getWatchlist();
      }
      return null;
    }
  },
  favorite: {
    path: {
      movies: "/favorite/movie",
      tv: "/favorite/tv",
    },
    loader: async (args: LoaderFunctionArgs) => {
      const mediaType = args.params.type as MediaType;
      if(mediaType === "movie") {
        await moviesPageStore.getFavorites();
      } else {
        await tvShowsPageStore.getFavorites();
      }
      return null;
    }
  },
};