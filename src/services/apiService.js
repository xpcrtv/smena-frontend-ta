import axios from 'axios';

const BASE_URL = process.env.BASEURL || 'http://localhost:3000';

const authService = {
  init() {
    axios.defaults.baseURL = BASE_URL;
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
