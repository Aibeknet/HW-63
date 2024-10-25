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

export const createPost = async (post: any) => {
  await axiosAPI.post('/posts.json', post);
};

export const updatePost = async (id: string, post: any) => {
  await axiosAPI.put(`/posts/${id}.json`, post);
};


export default axiosAPI;