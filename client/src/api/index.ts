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



export interface IUserToken {
  token: String, 
  username: String
}

export const signUp = async (username: String, password: String, confirmPassword: String) => API.post<IUserToken>('/users/signup', {username, password, confirmPassword})
export const signIn = async (username: String, password: String) => API.post<IUserToken>('/users/signin',{username, password} )

export const signOut = async () => API.post('/users/signout')

export interface IPost {
  _id: String, 
  isUsersPost: boolean, 
  message: String, 
  votes: number,
  userVote: "none" | "up" | "down", 
  commentAmount: number, 
  channel: string, 
  createdAt: string
}
export const fetchPosts = () => API.get<IPost[]>(`/posts`);
export const fetchPost = (postId: string) => API.get<IPost>(`/posts/${postId}`)
 
export const createPost = (message: String) => API.post<String>('/posts/create', {message})

export interface IComment { 
  _id: String,
  isUsersPost: boolean,
  userVote: "none" | "up" | "down", 
  message: String,
  votes: number
}

export const votePost = (postId: String, vote: "up" | "down") => API.post<IPost>(`/posts/${postId}/vote`, {vote})
export const deletePost = (postId: String) => API.delete(`/posts/${postId}`)