import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const API_KEY = ''; // Ganti dengan kunci API Anda sendiri
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetailScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
        try {
          const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
          console.log('Response:', response);
          if (!response.ok) {
            throw new Error('Failed to fetch movie details');
          }
          const data = await response.json();
          setMovieDetails(data);
        } catch (error) {
          console.error('Error fetching movie details:', error.message);
          setError('Failed to fetch movie details. Please check your internet connection.');
        } finally {
          setLoading(false);
        }
      };
      

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!movieDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text>Movie details not available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.poster}
        source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }}
      />
      <Text style={styles.title}>{movieDetails.title}</Text>
      <Text style={styles.rating}>⭐ {movieDetails.vote_average.toFixed(1)}/10</Text>
      <Text style={styles.overview}>{movieDetails.overview}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rating: {
    fontSize: 18,
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
  },
});

export default MovieDetailScreen;
