import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { searchMovies } from '../services/movieService'; 
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleSearch = async () => {
    if (searchQuery) {
      try {
        setLoading(true); 
        const results = await searchMovies(searchQuery); 
        setSearchResults(results);
        setError(null); 
      } catch (error) {
        console.error('Error searching movies:', error);
        setError('Failed to fetch movies. Please try again later.'); 
      } finally {
        setLoading(false); 
      }
    }
  };

  const navigateToDetail = (movie) => {
    navigation.navigate('MovieDetail', { movie });
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity style={styles.movieItem} onPress={() => navigateToDetail(item)}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.movieDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rating}>Rating: {item.vote_average.toFixed(1)}/10</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search movies..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <Button title="Search" onPress={handleSearch} disabled={!searchQuery} />

      {loading && <Text style={styles.loadingText}>Loading...</Text>}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieItem}
          style={styles.resultList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  poster: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  movieDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    color: 'gray',
  },
  resultList: {
    marginTop: 10,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});

export default SearchScreen;