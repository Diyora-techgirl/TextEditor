function useDate() {
  const date = new Date();
  const DD = date.getDate();
  const MM = date.getMonth() + 1;
  const YY = date.getFullYear();
  const m = date.getMinutes();
  const h = date.getHours();

  return `${DD}.${MM}.${YY} ${h}:${m}`;
}

export default useDate;
