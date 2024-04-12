export const asyncHandler = (cbFunc) => {
  (req, res, next) => {
    Promise.resolve(cbFunc(req, res, next)).catch((error) => next(error));
  };
};
