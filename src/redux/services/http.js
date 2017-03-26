import request from 'isomorphic-fetch';

const fetch = (url, opts) => request(url, opts);

export default fetch;
