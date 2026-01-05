import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';

const oauth = OAuth({
  consumer: {
    key: process.env.EXPO_PUBLIC_CONSUMER_KEY,
    secret: process.env.EXPO_PUBLIC_CONSUMER_SECRET,
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return CryptoJS.HmacSHA256(base_string, key).toString(CryptoJS.enc.Base64);
  },
  realm: '',
});

export default oauth;