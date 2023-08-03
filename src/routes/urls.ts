import { rootStore } from "store";


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
    loader: (id: number) => moviesPageStore.getMovie(id),
  },
  tvShowDetails: {
    path: "/tv/:id",
    loader: (id: number) => tvShowsPageStore.getTVShow(id),
  },
  favorite: {
    movies: {
      path: "/favorite/movies",
      loader: async () => {
        await moviesPageStore.getFavoriteMovies();
        return null;
      },
    },
    tv: {
      path: "/favorite/tv",
    }
  }
};