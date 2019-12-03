const { name, version } = require('../../../../package.json');

function createResponse({ data, error, meta, req }) {
  const response = {
    data: data ? { ...data } : undefined,
    error: error ? { ...error } : undefined,
    meta: {
      ...meta,
      env: req.app.get('env'),
      name,
      timestamp: Date.now(),
      version
    }
  };
  return response;
}

module.exports = createResponse;
