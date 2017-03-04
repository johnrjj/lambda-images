const jsonToResponse = (json: any) => {
  const response = {
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    statusCode: 200,
    body: JSON.stringify(json),
  };
  return response;
};

export { 
  jsonToResponse,
};