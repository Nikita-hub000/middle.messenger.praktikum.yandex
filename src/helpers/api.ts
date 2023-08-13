export const isSuccessApi = (response): boolean =>
  response.status >= 200 && response.status < 300;

export const isRejectApi = (response): boolean =>
  response.status < 200 || response.status >= 300;
