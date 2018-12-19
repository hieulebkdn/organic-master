import axios from 'axios'
import { API_URL } from '../const/config';

export default function callApi(endpoint, method, body) {
  return axios({
    method: method,
    url: `${API_URL}/${endpoint}`,
    data: body,
  })
};