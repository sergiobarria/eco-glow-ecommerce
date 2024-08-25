import axios from 'axios';
import { env } from './env';

// Axios instance
const apiClient = axios.create({
	baseURL: env.API_BASE_URL + '/api/v1',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	timeout: 10000, // Request timeout
});

// Request interceptor
apiClient.interceptors.request.use(
	config => {
		// TODO: Do something before request is sent
		return config;
	},
	error => {
		// NOTE: Do something with request error
		return Promise.reject(error);
	},
);

// Response interceptor
apiClient.interceptors.response.use(
	response => {
		// TODO: Do something with response data
		return response;
	},
	error => {
		// NOTE: Do something with response error
		return Promise.reject(error);
	},
);

export { apiClient };
