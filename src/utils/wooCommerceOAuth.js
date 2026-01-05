import CryptoJS from 'crypto-js';

const CONSUMER_KEY = process.env.EXPO_PUBLIC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.EXPO_PUBLIC_CONSUMER_SECRET; // 

// Generate OAuth 1.0 signature
const generateOAuthParams = (url, method = 'GET', requestParams = {}) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = Math.random().toString(36).substring(2, 15);

  // OAuth parameters
  const oauthParams = {
    oauth_consumer_key: CONSUMER_KEY,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp,
    oauth_nonce: nonce,
    oauth_version: '1.0',
  };

  // Combine OAuth params with request params for signature
  const allParams = { ...oauthParams, ...requestParams };

  // Sort parameters alphabetically
  const sortedKeys = Object.keys(allParams).sort();
  const paramString = sortedKeys
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(allParams[key])}`)
    .join('&');

  // Create signature base string
  const signatureBaseString = `${method.toUpperCase()}&${encodeURIComponent(url)}&${encodeURIComponent(paramString)}`;

  // Generate signature
  const signingKey = `${encodeURIComponent(CONSUMER_SECRET)}&`;
  const signature = CryptoJS.HmacSHA1(signatureBaseString, signingKey).toString(CryptoJS.enc.Base64);

  // Return OAuth params with signature
  return {
    ...oauthParams,
    oauth_signature: signature,
  };
};

// Default export
export default generateOAuthParams;

// Also export as named for flexibility
export { generateOAuthParams, CONSUMER_KEY, CONSUMER_SECRET };