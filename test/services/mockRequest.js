/**
 * Mock request - sets all necessary data
 */
class MockRequest {
    constructor(request) {
        this._request = request;
    }

    /**
     * Specifies response text and status code
     * @param  {Int}            statusCode  status code of the request
     * @param  {Object|String}  response    request response
     * @return {Object}         returns itself
     */
    reply(statusCode, response) {
        if (response === null || typeof(response) === 'undefined') {
            this._statusCode = 200;
            this._response = statusCode;
        } else {
            this._statusCode = statusCode;
            this._response = response;
        }

        return this;
    }
}

export default MockRequest;
