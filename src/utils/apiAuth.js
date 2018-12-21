import axios from 'axios'
import { API_AUTH_URL } from '../const/config';

export default function callApiAuth(endpoint, method, body) {
  return axios({
    method: method,
    url: `${API_AUTH_URL}/${endpoint}`,
    data: body,
  })
};