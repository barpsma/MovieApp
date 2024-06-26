const API_KEY = '721fcf65c6b97ab8d456aadbe187f998';
const BASE_URL = 'https://api.themoviedb.org/3';

const getMovies = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
    const data = await response.json();
    console.log(`API response for ${category}:`, data); 
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error); 
  }
};

export const searchMovies = async (query) => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};



export const getNowPlayingMovies = async () => getMovies('now_playing');
export const getUpcomingMovies = async () => getMovies('upcoming');
export const getTopRatedMovies = async () => getMovies('top_rated');
export const getPopularMovies = async () => getMovies('popular');
