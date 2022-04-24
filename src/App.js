import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Movies from './components/Movies';
import MoviesHeading from './components/MoviesHeading';
import SearchBox from './components/SearchBox';
import AddWatchlist from './components/AddWatchlist';
import RemoveWatchlist from './components/RemoveWatchlist';



const App = () => {
  const [title, setTitle] = useState('No content selected');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [plot, setPlot] = useState('');
  const [rated, setRated] = useState('');
  const [runtime, setRuntime] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [writer, setWriter] = useState('');
  const [actors, setActors] = useState('');
  const [awards, setAwards] = useState('');
  const [metascore, setMetascore] = useState('');
  const [imdbscore, setIMDBscore] = useState('');
  const [boxoffice, setBoxOffice] = useState('');
  const [production, setProduction] = useState('');

  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=f1b8a5be`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('reactSavedWatchlist'));
    setWatchlist(savedWatchlist);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('reactSavedWatchlist', JSON.stringify(items));
  }

  const addToWatchlist = (movie) => {
    const newWatchlist = [...watchlist, movie]
    setWatchlist(newWatchlist);
    saveToLocalStorage(newWatchlist);
  };

  const removeFromWatchlist = (movie) => {
    const newWatchlist = watchlist.filter((watchlist) => watchlist.imdbID !== movie.imdbID);

    setWatchlist(newWatchlist);
    saveToLocalStorage(newWatchlist);
  };

  // const fetchMovieDetail = (movie, title) => {
  //   console.log(movie.Title);
  //   title = movie.Title;
  //   console.log(title);


  // };

  //On-Click Function
  const fetchMovieDetail = async (movie) => {

    const fullurl = `http://www.omdbapi.com/?t=${movie.Title}&plot=full&apikey=f1b8a5be`;
    const fullresponse = await fetch(fullurl);
    const data = await fullresponse.json();
    console.log(plot)

    const movieTitle = movie.Title;
    const movieYear = movie.Year;
    const movieType = movie.Type;
    const moviePlot = data.Plot;
    const movieRated = data.Rated
    const movieRuntime = data.Runtime
    const movieGenre = data.Genre
    const movieDirector = data.Director
    const movieWriter = data.Writer
    const movieActors = data.Actors
    const movieAwards = data.Awards
    const movieMetascore = data.Metascore
    const movieIMDBscore = data.imdbRating
    const movieBoxOffice = data.BoxOffice
    const movieProduction = data.Production

    setTitle(movieTitle);
    setYear(movieYear);
    setType(movieType);
    setPlot(moviePlot);
    setRated(movieRated);
    setRuntime(movieRuntime);
    setGenre(movieGenre);
    setDirector(movieDirector);
    setWriter(movieWriter);
    setActors(movieActors);
    setAwards(movieAwards);
    setMetascore(movieMetascore);
    setIMDBscore(movieIMDBscore);
    setBoxOffice(movieBoxOffice);
    setProduction(movieProduction);

    //console.log(plot)

    //console.log(fullmovie)
  };

  //const title = 'no content';

  return (
    <div className='container-fluid movie-app'>
      <tr className='maintable'>
        <td className='td1'>
          <div className='col'>
            <MoviesHeading heading='Movies' />
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
          <div className='col'>
            <Movies
              movies={movies}
              handlePosterClick={fetchMovieDetail}
              handleWatchlistClick={addToWatchlist}
              watchlistComponent={AddWatchlist} />
          </div>
        </td>
        <td className='td1'>
          <div className='col'>
            <MoviesHeading heading='My Watchlist' />
          </div>
          <div className='col mt-5'>
            <Movies
              movies={watchlist}
              handlePosterClick={fetchMovieDetail}
              handleWatchlistClick={removeFromWatchlist}
              watchlistComponent={RemoveWatchlist} />
          </div>
        </td>
        <td className=''>
          <div className='details'><MoviesHeading heading='Content Details' />
            <table className='detailtable'>
              <tr>
                <td className='detailhead'>Title: </td>
                <td className='content'>{title}</td>
              </tr>
              <tr>
                <td className='detailhead'>Released/Aired in Year: </td>
                <td className='content'>{year}</td>
              </tr>
              <tr>
                <td className='detailhead'>Type: </td>
                <td className='content'>{type}</td>
              </tr>
              <tr>
                <td className='detailhead'>Synopsis/Plot: </td>
                <td className='content'>{plot}</td>
              </tr>
              <tr>
                <td className='detailhead'>Age Rating: </td>
                <td className='content'>{rated}</td>
              </tr>
              <tr>
                <td className='detailhead'>Duration/Runtime: </td>
                <td className='content'>{runtime}</td>
              </tr>
              <tr>
                <td className='detailhead'>Genre: </td>
                <td className='content'>{genre}</td>
              </tr>
              <tr>
                <td className='detailhead'>Director: </td>
                <td className='content'>{director}</td>
              </tr>
              <tr>
                <td className='detailhead'>Writer/s: </td>
                <td className='content'>{writer}</td>
              </tr>
              <tr>
                <td className='detailhead'>Actors: </td>
                <td className='content'>{actors}</td>
              </tr>
              <tr>
                <td className='detailhead'>Awards: </td>
                <td className='content'>{awards}</td>
              </tr>
              <tr>
                <td className='detailhead'>Metascore (out of 100): </td>
                <td className='content'>{metascore}</td>
              </tr>
              <tr>
                <td className='detailhead'>IMDb Rating (out of 10): </td>
                <td className='content'>{imdbscore}</td>
              </tr>
              <tr>
                <td className='detailhead'>Box Office: </td>
                <td className='content'>{boxoffice}</td>
              </tr>
              <tr>
                <td className='detailhead'>Production: </td>
                <td className='content'>{production}</td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
    </div>
  );
};

export default App;
