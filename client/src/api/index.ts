import axios, { Axios } from 'axios';

const API: Axios = axios.create({ baseURL: 'http://localhost:5000' });
//TODO maybe this should get the token from AuthenticationContext instead of localStorage
API.interceptors.request.use((req: any) => {
  if (localStorage.getItem('User')) {
    if(req && req.headers ){
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('User') ||'{}').token}`;
    }
  }
  return req;
});

export const signIn = async (email: String, password: String) => API.post('/users/signin',{email, password} )

export const fetchPosts = () => API.get(`/posts`);
