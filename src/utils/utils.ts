export function getYoutubeId(url: string) {
  let matches: string[] | null;
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  matches = url.match(regExp);
  if (matches && matches[2].length == 11) {
    return matches[2];
  }
}
