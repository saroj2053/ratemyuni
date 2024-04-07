const response = (res, statusCode, success, message) => {
  res.status(statusCode).json({ success: success, message: message });
};

export default response;
