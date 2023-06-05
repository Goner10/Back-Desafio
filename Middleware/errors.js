const handleValidationErrors = (error, res) => {
    const errors = Object.values(error.errors).map((el) => el.message);
    const errorMessage = errors.join(" || ");
    res.status(400).send({ message: errorMessage });
  };
  
  const handleDuplicateKeyError = (error, res) => {
    const field = Object.keys(error.keyValue);
    const code = 409;
    const errorMassage = `An account with this ${field} already exists.`;
    res.status(code).json({ messages: errorMassage, fields: field });
  };
  
  const handleAuthenticationError = (error, res) => {
    const code = 401;
    const message = 'Authentication Error';
    res.status(code).json({ message });
  };
  
  const handleAuthorizationError = (error, res) => {
    const code = 403;
    const message = 'Authorization Error';
    res.status(code).json({ message });
  };
  
  const handleErrorType = (error, req, res, next) => {
    if (error.name === 'ValidationError') 
      handleValidationErrors(error, res);
    else if (error.code && error.code === 11000)
      handleDuplicateKeyError(error, res);
    else if (error.name === 'AuthenticationError')
      handleAuthenticationError(error, res);
    else if (error.name === 'AuthorizationError')
      handleAuthorizationError(error, res);
    else 
      res.status(500).send({ message: 'An unknown error occurred.' });
  };
  
  module.exports = { handleErrorType };
  