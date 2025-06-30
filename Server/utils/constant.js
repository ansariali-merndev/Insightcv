export const handleError = (error, message) => {
  console.log(error.message);
  throw new Error(message);
};
