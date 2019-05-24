function getURLOrigin (param){
  var url = require('url')
  var obj = url.parse

  if (param === undefined) {
    // URL is undefined
    return undefined
  }

  obj = url.parse(param);
  if (!obj.protocol && !obj.hostname) {
      return null
  }

  return `${obj.protocol}//${obj.hostname}${obj.port ? `:${obj.port}` : "/"}`
};

export const links = {
  imagesPrefixUrl: getURLOrigin(process.env.API_URL)
}