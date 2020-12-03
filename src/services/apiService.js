import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;
const authService = {
  init() {
    axios.defaults.baseURL = API_URL;
  },
  setHeader(key, value) {
    axios.defaults.headers.common[key] = value;
  },
  removeHeader(key) {
    axios.defaults.headers.common[key] = '';
  },
  logIn(userData) {
    return axios.post('/login', userData);
  },
  register(userData) {
    return axios.post('/register', userData);
  },
  getUserInfo() {
    return axios.get('/about');
  }
};

export default authService;
