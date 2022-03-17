import debug from 'debug';
import express from 'express';
const debugLog: debug.IDebugger = debug('app:error-handler');

const errorHandlder = function (
  error: any,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  const status = error.status || 500;
  const message = error.message || '';
  res.status(status);
  res.json({
    status: status,
    message: message
  });
};

export { errorHandlder };
