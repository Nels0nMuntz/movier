type QueryParams = Record<string, string>;

interface RequestConfig {
  url: string;
  init?: RequestInit;
  queryParams?: QueryParams;
}

const API_KEY = "8bdf012edde5ad49fa7febc6d87879d6";
const BASE_URL = "https://api.themoviedb.org/3";

const requestInterceptor = (config: RequestConfig) => {
  const { queryParams } = config;
  let url = `${BASE_URL}${config.url}?`;
  if (queryParams && Object.keys(queryParams).length) {
    url = addQueryParams(url, queryParams);
    url = addApiKey(url);
  };
  url = addApiKey(url);
  return {
    url: `${BASE_URL}${url}`,
    init: {
      ...config.init || {},
      headers: {
        ...config.init?.headers,
        "accept": "application/json",
      }
    }
  };
};

const responseInterceptor = (response: Response) => {
  return response;
}

const customFetch = async (config: RequestConfig) => {
  const args = requestInterceptor(config);
  let response = await fetch(args.url, args.init);
  response = responseInterceptor(response);
  return response;
}

export const api = {
  get: (config: RequestConfig) => {
    const getRequestConfig: RequestConfig = {
      ...config,
      init: {
        ...config.init,
        method: "GET",
      },
    };
    return customFetch(getRequestConfig);
  },
  post: (config: RequestConfig) => {
    const postRequestConfig: RequestConfig = {
      ...config,
      init: {
        ...config.init,
        method: "POST",
      },
    };
    return customFetch(postRequestConfig);
  }
};

const addQueryParams = (url: string, params: QueryParams) => {
  return [...Object.entries(params)]
    .reduce((prev, curr) => {
      const pair = curr.join("=");
      return prev += (pair + "&")
    }, "");
}

const addApiKey = (url: string) => `${url}api_key=${API_KEY}`;