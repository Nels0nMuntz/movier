const API_KEY = "8bdf012edde5ad49fa7febc6d87879d6";

const config = {
  baseURL: "https://api.themoviedb.org/3",
  options: {
    headers: { "content-type": "application/json" },
  }
}

export const api = {
  get: (url: string, options?: RequestInit) => {
    const apiOptions = {
      ...config.options,
      ...options,
      method: "GET",
    } as RequestInit;
    return fetch(`${config.baseURL}${url}`, apiOptions);
  },
  post: (url: string, options?: RequestInit) => {
    const apiOptions = {
      ...config.options,
      ...options,
      method: "POST",
    } as RequestInit;
    return fetch(`${config.baseURL}${url}`, apiOptions);
  }
};

export const withKey = (url: string) => `${url}?api_key=${API_KEY}`;