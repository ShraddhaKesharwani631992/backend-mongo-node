export const asyncHandler = (cbFunc) => {
  return (req, res, next) => {
    Promise.resolve(cbFunc(req, res, next)).catch((error) => next(error));
  };
};
