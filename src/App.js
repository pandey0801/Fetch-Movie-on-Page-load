import React, { useCallback, useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import MyComponent from './components/MyComponent';

function App() {
  const [moviesState, setMoviesState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);


  const fetchHandler = useCallback( async ()=>{ 
  // async function fetchHandler() {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_data
        };
      });

      setMoviesState(transformedMovies);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    }
    setIsLoading(false);
  }

,[])

  useEffect(() => {
    fetchHandler();
  }, []);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && moviesState.length > 0 && <MoviesList movies={moviesState} />}
        {!isLoading && moviesState.length === 0 && !errorMsg && <h3>No movies found</h3>}
        {!isLoading && errorMsg && <h3>{errorMsg}</h3>}
        {isLoading && <h1>Loading....</h1>}
        <MyComponent/>
      </section>
    </React.Fragment>
  );
}

export default App;

