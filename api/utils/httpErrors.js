'use strict';

class HTTPClientError extends Error {
    constructor (message) {
      if (message instanceof Object) {
        super(JSON.stringify(message));
      } else {
        super(message);
      }
      Error.captureStackTrace(this, this.constructor);
      this.name = this.constructor.name;
      this.statusCode = null;
    }
}

class HTTP401Error extends HTTPClientError {
    constructor (message = 'Unauthorized') {
      super(message);
      this.statusCode = 401;
    }
}
exports.HTTP401Error = HTTP401Error;