import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import MoviesList from '../components/MoviesList';
import {
  getNowPlayingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getPopularMovies
} from '../services/movieService';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <MoviesList fetchMovies={getNowPlayingMovies} title="Now Playing in Theater" />
      <MoviesList fetchMovies={getUpcomingMovies} title="Upcoming Movies" />
      <MoviesList fetchMovies={getTopRatedMovies} title="Top Rated Movies" />
      <MoviesList fetchMovies={getPopularMovies} title="Popular Movies" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
