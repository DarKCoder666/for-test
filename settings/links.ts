/* eslint-disable node/no-deprecated-api */
function getURLOrigin(param): string | null{
  const url = require('url');
  let obj = url.parse;

  if (param === undefined) {
    // URL is undefined
    return null;
  }

  obj = url.parse(param);
  if (!obj.protocol && !obj.hostname) {
    return null;
  }

  return `${obj.protocol}//${obj.hostname}${obj.port ? `:${obj.port}` : '/'}`;
};

export const links: linksType = {
  imagesPrefixUrl: getURLOrigin(process.env.API_URL)
};

type linksType = {
  [key: string]: string | null
};
