import axios from 'axios';
const key = '25360332-d4be31893bf26dff3beae3a04';

export const getImages = async (query, page) => {
  axios.defaults.baseURL = `https://pixabay.com/api/?key=${key}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(`${axios.defaults.baseURL}`);
  return response.data;
};
