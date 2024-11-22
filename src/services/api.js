import axios from 'axios';

const BASE_URL = 'https://api.sampleapis.com/cartoons/cartoons2D';

export const fetchCartoons = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching cartoons:', error);
    throw error;
  }
};

export const searchCartoons = async (query) => {
  try {
    const response = await axios.get(BASE_URL);
    // Implementasi pencarian sederhana di sisi klien
    const filteredCartoons = response.data.filter(cartoon => 
      cartoon.title.toLowerCase().includes(query.toLowerCase())
    );
    return filteredCartoons;
  } catch (error) {
    console.error('Error searching cartoons:', error);
    throw error;
  }
};