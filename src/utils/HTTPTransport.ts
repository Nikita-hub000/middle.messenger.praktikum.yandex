enum METHODS {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

type Options = {
  method: METHODS;
  timeout?: number;
  headers?: Record<string, string>;
  data: XMLHttpRequestBodyInit;
};

function queryStringify(data: XMLHttpRequestBodyInit): string {
  return `?${Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;
}

class HTTPTransport {
  get = (url: string, options: Options) => {
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post = (url: string, options: Options) => {
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put = (url: string, options: Options) => {
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete = (url: string, options: Options) => {
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: Options, timeout: number = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

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

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.timeout = timeout;

      if (method === METHODS.GET) {
        const query = queryStringify(data);
        xhr.open(method, url + query);
        xhr.send();
      } else {
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
