import axios from 'axios';
import { generateOAuthParams } from '../utils/wooCommerceOAuth';

const BASE_URL = 'http://afiquehossain.local';
const API_PATH = '/wp-json/wc/v3';

// Create axios instance
const WooCommerceAPI = axios.create({
  baseURL: `${BASE_URL}${API_PATH}`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add OAuth parameters
WooCommerceAPI.interceptors.request.use(
  (config) => {
    // Build full URL for OAuth signature
    const fullUrl = `${BASE_URL}${API_PATH}${config.url}`;
    
    // Get existing params or create empty object
    const requestParams = config.params || {};
    
    // Generate OAuth parameters
    const oauthParams = generateOAuthParams(fullUrl, config.method.toUpperCase(), requestParams);
    
    // Merge OAuth params with existing params
    config.params = {
      ...requestParams,
      ...oauthParams,
    };
    
    // console.log('🔵 API Request:', config.method.toUpperCase(), config.url);
    // console.log('📦 Params:', config.params);
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
WooCommerceAPI.interceptors.response.use(
  (response) => {
    console.log('✅ API Success:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ API Error:', error.response.status, error.response.data);
    } else {
      console.error('❌ Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default WooCommerceAPI;