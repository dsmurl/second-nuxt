export const findCookieValue = (cookies, key) => {
  const specificCookie = cookies
    .split(';')
    .find(c => c.trim().startsWith(key + '='));

  if (!specificCookie) {
    return null;
  } else {
    return specificCookie.split('=')[1];
  }
};

export default {
  findCookieValue
}
