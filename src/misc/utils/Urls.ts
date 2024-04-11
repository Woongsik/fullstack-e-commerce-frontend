export const getUrlAsObject = (url: string) => {
  const urlAsArray = url.split("?")[1].split("&").map((value) => value.split('='));
  return Object.fromEntries(urlAsArray);
}