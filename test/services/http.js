import MockRequest from 'test/services/mockRequest';

function mockParseJson(response) {
    return Promise.resolve(response);
}

class FetchMock {
    constructor() {
        this._mockRequests = [];
    }

    registerRequest(url, params) {
        const request = this._getRequestData(url, params);

        const mockRequest = new MockRequest(request);
        this._mockRequests.push(mockRequest);

        return mockRequest;
    }

    fetch(url, params) {
        const requestData = this._getRequestData(url, params);

        for (const mockRequest of this._mockRequests) {
            if (this._requestsMatch(mockRequest, requestData)) {
                const statusCode = mockRequest._statusCode;
                const response = mockRequest._response;

                return Promise.resolve({
                    status: statusCode,
                    response,
                    // json method from fetch library needs to be mocked as well because of promise middleware
                    json: mockParseJson.bind(null, response)
                });
            }
        }

        throw new Error(`No mock request found for request ${requestData.url}`);
    }

    flushRequests() {
        this._mockRequests = [];
    }

    // ///////////////////////////////////////// PRIVATE //////////////////////////////////////////////////////

    _getRequestData(url, params = {}) {
        let body = params.body || {};
        if (typeof body === 'string') {
            body = JSON.parse(body);
        }

        return {
            url,
            method: params.method || 'get',
            body
        };
    }

    /**
     * Decides if request matches one particular mocked request.
     * @param   {Object} mockRequest    mock request data from mockRequests store
     * @param   {Object} requestData    request data specified in App
     * @return  {Boolean}               mock request matched the request or not
     * @private
     */
    _requestsMatch(mockRequest, requestData) {
        if (!this._matchMethod(mockRequest._request.method, requestData.method)) {
            return false;
        }

        if (!this._matchUrl(mockRequest._request.url, requestData.url)) {
            return false;
        }

        if (!this._matchData(mockRequest._request.body, requestData.body)) {
            return false;
        }

        return true;
    }

    _matchMethod(mockMethod, requestMethod) {
        return (mockMethod === requestMethod);
    }

    _matchUrl(mockUrl, requestUrl) {
        return (mockUrl === requestUrl);
    }

    /*
    * In case of POST request, some POST data should be sent.
    * Doesn't match the mockRequest if POST data set in mockRequest are not a subset of POST data set by actual request
    *
    * @TODO do the same for GET request params
    */
    _matchData(mockData, requestData) {
        return this._isSubset(mockData, requestData);
    }

    /**
     * Decides if one object is a subset of the other object (or is equal to it).
     * @param  {Object}  obj1   Object 1 - tested if it is subset of Object 2
     * @param  {Object}  obj2   Object 2
     * @return {Boolean}        obj1 is subset of obj2 or not
     * @private
     */
    _isSubset(obj1, obj2) {
        if ((typeof obj1 === 'object' && obj1 !== null) && (typeof obj2 === 'object' && obj2 !== null)) {
            if (Object.keys(obj1).length > Object.keys(obj2).length) {
                return false;
            }

            // NOTE: if callback returned a true value for all elements, `every()` will return true.
            // On first falsy callback, `every()` will immediatelly return false
            return Object.keys(obj1).every((prop) => {
                if (obj2.hasOwnProperty(prop)) {
                    if (!this._isSubset(obj1[prop], obj2[prop])) {
                        return false;
                    }

                    return true;
                }

                return false;
            });
        }

        return (obj1 === obj2);
    }
}

export const fetchInstance = new FetchMock();

export default function fetch(url, params) {
    return fetchInstance.fetch(url, params);
}
