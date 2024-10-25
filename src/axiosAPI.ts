import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'https://askaroff-hub-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const fetchPosts = async () => {
  const response = await axiosAPI.get('/posts.json');
  return response.data;
};

export default axiosAPI;