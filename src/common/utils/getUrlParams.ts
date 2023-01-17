export type ParamsType = {
  location: string
  checkIn: string
  checkOut: string
  [key: string]: string | string[]
}
export const getUrlParams = (searchParams: URLSearchParams): ParamsType => {

  const params = {} as ParamsType;

  for (let [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  return params;
};