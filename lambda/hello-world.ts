const privateEndpoint = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Private endpoint, dumping event',
      input: event,
      context,
    }),
  };

  callback(null, response);
};

// Public API
const publicEndpoint = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Public endpoint, dumping event',
      input: event,
      context,
    }),
  };

  callback(null, response);
};
export {
  privateEndpoint,
  publicEndpoint,
};
