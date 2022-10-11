import axios, { Axios } from 'axios';

const API: Axios = axios.create({ baseURL: 'http://localhost:5000' });
// API.interceptors.request.use((req) => {
//   if (localStorage.getItem('profile')) {
//     if(req && req.headers ){

//       req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') ||'{}').token}`;
//     }
//   }
//   return req;
// });

export const signIn = async (email: String, password: String) => API.post('/users/signin',{email, password} )


