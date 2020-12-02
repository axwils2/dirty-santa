// @flow
export type Match = {
  isExact: boolean,
  path: string,
  url: string,
  params: {
    [string]: string
  }
};
