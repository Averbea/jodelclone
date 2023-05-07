import axios, { Axios } from 'axios';
import configData from "../config.json";

const API: Axios = axios.create({ baseURL: 'http://localhost:5000' });
//TODO maybe this should get the token from AuthenticationContext instead of localStorage
API.interceptors.request.use((req: any) => {
  if (localStorage.getItem('User')) {
    if (req && req.headers) {
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('User') || '{}').token}`;
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
    if (response.status === 401) {
      //TODO check if this is the best method to redirect in this case
      window.location.replace("/login")
      return Promise.reject("JWT expired")
    }
    return error
  })



export interface IUserToken {
  token: string,
  username: string
}

export const signUp = async (username: string, password: string, confirmPassword: string) => API.post<IUserToken>('/users/signup', { username, password, confirmPassword })
export const signIn = async (username: string, password: string) => API.post<IUserToken>('/users/signin', { username, password })

export const signOut = async () => API.post('/users/signout')

export interface IPost {
  _id: string,
  isUsersPost: boolean,
  message: string,
  votes: number,
  userVote: "none" | "up" | "down",
  commentAmount: number,
  channel: string,
  color: string,
  createdAt: string
}
export const fetchPosts = (sortBy: "date" | "votes" | "comments" = "date", skip = 0, limit = configData.FETCH_LIMIT_POSTS, channel?: string) => API.get<IPost[]>(`/posts`, { params: { sort: sortBy, skip, limit, channel } });
export const fetchPost = (postId: string) => API.get<IPost>(`/posts/${postId}`)

export const createPost = (message: string, channel: string, color: string) => API.post<string>('/posts/create', { message, channel, color })


export const votePost = (postId: string, vote: "up" | "down") => API.post<IPost>(`/posts/${postId}/vote`, { vote })
export const deletePost = (postId: string) => API.delete(`/posts/${postId}`)


export interface IComment {
  _id: string,
  isUsersPost: boolean,
  message: string,
  createdAt: string,
  userVote: "none" | "up" | "down",
  votes: number
}

export interface ICommentAPIResponse {
  _id: string,
  comments: [IComment]
}

export const getCommentsForPost = (postId: string, skip?: number, limit = configData.FETCH_LIMIT_COMMENTS) => API.get<ICommentAPIResponse>(`/posts/${postId}/comments?skip=${skip ? skip : 0}&limit=${limit}`)
export const commentPost = (postId: string, message: string) => API.post(`/posts/${postId}/comment`, { message })

export const apiVoteComment = (postId: string, commentId: string, vote: "up" | "down") => API.post<IComment>(`/posts/${postId}/${commentId}/vote`, { vote })
export const apiDeleteComment = (postId: string, commentId: string) => API.delete(`/posts/${postId}/${commentId}`)

export interface ChannelAPIResponse {
  _id: string,
  count: number
}

export const apiFetchChannels = (amount: number, searchTerm?: string) => API.get<ChannelAPIResponse[]>(`/channels`, { params: { amount, searchTerm } })