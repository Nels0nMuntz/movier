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
  }
  url = addApiKey(url);
  return {
    url,
    init: {
      ...config.init || {},
      headers: {
        ...config.init?.headers,
        "accept": "application/json",
      }
    }
  };
};

const responseInterceptor = async (response: Response) => {
  return response
}

const customFetch = async (config: RequestConfig) => {
  const args = requestInterceptor(config);
  const response = await fetch(args.url, args.init);
  const intercepted = await responseInterceptor(response);
  return intercepted;
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
        headers: {
          ...(config.init && config.init.headers) && config.init.headers,
          "Content-Type": "application/json;charset=utf-8"
        },
      },
    };
    return customFetch(postRequestConfig);
  }
};

const addQueryParams = (url: string, params: QueryParams) => {
  const queryParamsString = [...Object.entries(params)]
    .reduce((prev, curr) => {
      const pair = curr.join("=");
      return prev += (pair + "&")
    }, "");
  return url + queryParamsString;
}

const addApiKey = (url: string) => `${url}api_key=${API_KEY}`;