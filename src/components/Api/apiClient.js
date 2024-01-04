import axios from 'axios';

function apiClient(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'content-type': 'application/json' };
  const config = {
    method: body ? 'POST' : 'GET',
    url: process.env.REACT_APP_API_BASE_URL + endpoint,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.data = body;
  }

  return axios(config).then((r) => r);
}

export default apiClient;
