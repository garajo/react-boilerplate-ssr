import axios from 'axios';
import buildEnv from './buildEnv';

const defaultHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const instance = axios.create({
  timeout: 5000,
  headers: defaultHeader,
  withCredentials: true,
});

const returnJson = response => response.data;

const buildUrl = url => `${buildEnv.apiHost}${url}`;

const standardResponse = (response) => {
  if (response.status < 400) {
    return returnJson(response);
  }
  return Promise.reject(returnJson(response));
};

const api = () => {
  let opt = {
    instance,
  };

  return {
    setOptions: (options) => {
      opt = {
        ...opt,
        ...options,
      };
    },

    get: (url, query) => (
      opt.instance.get(buildUrl(url), {
        params: query,
      })
        .then(standardResponse)
    ),

    post: (url, data) => (
      opt.instance.post(buildUrl(url), data)
        .then(standardResponse)
    ),
  };
};

export default api();
