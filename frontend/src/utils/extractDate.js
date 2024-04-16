export const extractDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const returnedDate = `${year}-${month}-${day}`;

  return returnedDate;
};
