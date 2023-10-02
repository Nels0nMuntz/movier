import { LoaderFunctionArgs } from "react-router-dom";
import { rootStore } from "store";
import { MediaType } from "types";


const {
  authStore,
  browsePageStore,
  moviesPageStore,
  tvShowsPageStore,
  searchStore,
} = rootStore;

export const APP_URLS = {
  authWelcome: {
    path: "/auth-welcome",
  },
  authLogin: {
    path: "/auth-login",
    loader: (args: LoaderFunctionArgs) => {
      authStore.createRequestToken();
      const approved = new URL(args.request.url).searchParams.get("approved");      
      const denied = new URL(args.request.url).searchParams.get("denied");      
      if(approved === "true") {
        authStore.createExternallyAuthenticatedSession({
          onSuccess: () => location.pathname = APP_URLS.browse.path,
        })
      }
      if(denied === "true") {
        authStore.deleteSession();
        authStore.createRequestToken();
      }
      return null;
    }

  },
  browse: {
    path: "/browse",
    loader: () => {
      browsePageStore.initialize();
      return null;
    }
  },
  movies: {
    path: "/movies",
    loader: () => {
      moviesPageStore.initialize();
      return null;
    }
  },
  tvShows: {
    path: "/shows",
    loader: () => {
      tvShowsPageStore.initialize();
      return null;
    }
  },
  movieDetails: {
    path: "/movie/:id",
    loader: (id: number) => {
      moviesPageStore.getMovie(id);
      return null;
    },
  },
  tvShowDetails: {
    path: "/tv/:id",
    loader: (id: number) => {
      tvShowsPageStore.getTVShow(id);
      return null;
    },
  },
  watchlist: {
    path: {
      movies: "/watchlist/movie",
      tv: "/watchlist/tv",
    },
    loader: (args: LoaderFunctionArgs) => {
      const mediaType = args.params.type as MediaType;
      if(mediaType === "movie") {
        moviesPageStore.getWatchlist();
      } else {
        tvShowsPageStore.getWatchlist();
      }
      return null;
    }
  },
  favorite: {
    path: {
      movies: "/favorite/movie",
      tv: "/favorite/tv",
    },
    loader: (args: LoaderFunctionArgs) => {
      const mediaType = args.params.type as MediaType;
      if(mediaType === "movie") {
        moviesPageStore.getFavorites();
      } else {
        tvShowsPageStore.getFavorites();
      }
      return null;
    }
  },
  searchResult: {
    path: "/search-result",
    loader: async () => {
      await Promise.all([
        searchStore.searchMovies(),
        searchStore.searchTvShows(),
      ]);
      return null;
    }
  },
};