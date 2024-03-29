enum METHODS {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}
type Options = {
  method?: METHODS;
  timeout?: number;
  headers?: Record<string, string>;
  data?: XMLHttpRequestBodyInit;
};

const API_ENDPOINT = 'https://ya-praktikum.tech/api/v2';

function queryStringify(data: XMLHttpRequestBodyInit): string {
  return `?${Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;
}

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

class HTTPTransport {
  get: HTTPMethod = (url, options = {}) =>
    this.request(
      API_ENDPOINT + url,
      { ...options, method: METHODS.GET },
      options.timeout
    );

  put: HTTPMethod = (url, options = {}) =>
    this.request(
      API_ENDPOINT + url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );

  post: HTTPMethod = (url, options = {}) =>
    this.request(
      API_ENDPOINT + url,
      { ...options, method: METHODS.POST },
      options.timeout
    );

  delete: HTTPMethod = (url, options = {}) =>
    this.request(
      API_ENDPOINT + url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );

  request = (url: string, options: Options, timeout: number = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = () => {
        reject(new Error('Request aborted'));
      };

      xhr.onerror = () => {
        reject(new Error('Request failed'));
      };

      xhr.ontimeout = () => {
        reject(new Error('Request timeout'));
      };

      if (headers && !(data instanceof FormData)) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.timeout = timeout;

      if (method === METHODS.GET) {
        if (data) {
          const query = queryStringify(data);
          xhr.open(method, url + query);
        } else {
          xhr.open(method, url);
        }

        xhr.send();
      } else {
        xhr.open(method, url);
        console.log(data);
        if (data instanceof FormData || data?.avatar instanceof FormData) {
          console.log('data');

          xhr.send(data);
        } else {
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(data));
        }
      }
    });
  };
}

export default HTTPTransport;
