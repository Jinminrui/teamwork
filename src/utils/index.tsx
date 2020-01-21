import Cookies from 'js-cookie';

export function setCookies(name: string, value: string | object) {
  Cookies.set(name, value);
}

export function getCookies(name: string) {
  return Cookies.get(name);
}

export function removeCookies(name: string) {
  Cookies.remove(name);
}

export function getTimeGap(startTime: string) {
  const now = new Date();
  const duration = now.getDate() - new Date(startTime).getDate();
  return duration;
}
