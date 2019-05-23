export function readCookie(key) {
  if(!process.browser) return;
  const nameEQ = key + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function writeCookie(key, value, days) {
  if(!process.browser) return;

  let date = new Date();
  // Default at 365 days.
  days = days || 365;

  // Get unix milliseconds at current time plus number of days
  date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000
  document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";
  return value;
};

export function deleteCookie( key ) {
  document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}