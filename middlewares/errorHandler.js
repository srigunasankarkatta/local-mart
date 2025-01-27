const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res?.statusCode || 500;

  switch (statusCode) {
    case constants.NOT_FOUND:
      res.status(constants.NOT_FOUND).json({
        title: "Not Found",
        message: err.message,
        statusCode: constants.NOT_FOUND,
      });
      break;

    case constants.FORBIDDEN:
      res.status(constants.FORBIDDEN).json({
        title: "Forbidden",
        message: err.message,
        statusCode: constants.FORBIDDEN,
      });
      break;

    case constants.UNAUTHORISED:
      res.status(constants.UNAUTHORISED).json({
        title: "Unauthorized",
        message: err.message,
        statusCode: constants.UNAUTHORISED,
      });
      break;

    case constants.VALIDATION_ERROR:
      res.status(constants.VALIDATION_ERROR).json({
        title: "Validation Error",
        message: err.message,
        errors: err.errors || [],
        statusCode: constants.VALIDATION_ERROR,
      });
      break;

    case constants.SERVER_ERROR:
      res?.status(constants.SERVER_ERROR).json({
        title: "Server Error",
        message: err.message,
        stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
        statusCode: constants.SERVER_ERROR,
      });
      break;

    default:
      res.status(500).json({
        title: "Unknown Error",
        message: err.message,
        stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
        statusCode: 500,
      });
      break;
  }
};

module.exports = errorHandler;
