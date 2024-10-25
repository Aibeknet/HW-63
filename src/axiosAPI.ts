import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'https://askaroff-hub-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const fetchPosts = async () => {
  const response = await axiosAPI.get('/posts.json');
  return response.data;
};

export const fetchPostById = async (id: string) => {
  const response = await axiosAPI.get(`/posts/${id}.json`);
  return response.data;
};

export const createPost = async (post: { date: string; title: string; body: string }) => {
  const newPost = {
    ...post,
    date: new Date().toISOString(),
    time: new Date().toLocaleTimeString(),
  };
  await axiosAPI.post('/posts.json', newPost);
};

export const updatePost = async (id: string, post: { date: string; title: string; body: string }) => {
  const updatedPost = {
    ...post,
    date: new Date().toISOString(),
    time: new Date().toLocaleTimeString(),
  };
  await axiosAPI.put(`/posts/${id}.json`, updatedPost);
};

export const deletePost = async (id: string) => {
  await axiosAPI.delete(`/posts/${id}.json`);
};

export default axiosAPI;