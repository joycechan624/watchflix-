export function GoToPage(p=1, movies=[], num = 10) {

  const lists = movies.slice((p-1)*num, p*num);

  return lists;
}