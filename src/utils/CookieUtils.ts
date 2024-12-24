export class CookieUtils {
  static setCookie(
    name: string,
    value: string,
    days: number,
    path: string = '/'
  ) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value};expires=${expires};path=${path}`;
  }
}
