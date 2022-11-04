import axios, { Axios } from 'axios';
import { Navigate, useNavigate } from "react-router-dom";

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

API.interceptors.response.use((res: any) => {
  //status code 2..
  return res
}, 
(error: any) => {
  let response = error.response
  if(response.status === 401 && response.data.message === 'JWT expired'){
    //TODO check if this is the best method to redirect in this case
    window.location.replace("/login")
    return Promise.reject("JWT expired")
  }
  return error
})



export type UserAuth = {
  token: String
}
export const signIn = async (email: String, password: String) => API.post<UserAuth>('/users/signin',{email, password} )

export type PostType = {
  _id: String, 
  isUsersPost: boolean, 
  message: String, 
  votes: number, 
  commentAmount: number, 
  channel: string
}
export const fetchPosts = () => API.get<PostType[]>(`/posts`);
export const fetchPost = (postId: string) => API.get<PostType>(`/posts/${postId}`)
 
export const createPost = (message: String) => API.post<String>('/posts/create', {message})
