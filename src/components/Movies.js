import React from 'react';

const Movies = (props) => {
    const WatchlistComponent = props.watchlistComponent;

    return (
        <>
            {props.movies.map((movie, index) => (
                <div 
                    onClick={()=> props.handlePosterClick(movie)}
                    className='image-container d-flex justify-content-start m-3'
                >
                    <td>
                        <td className='ptitle'>{movie.Title}</td>
                    <img src={movie.Poster} alt='movie'></img>
                    </td>
                    <div
                         onClick={()=> props.handleWatchlistClick(movie)} 
                         className='overlay d-flex align-items-center justify-content-center'>
                        <WatchlistComponent />
                    </div>
                </div>
            ))}
        </>
    );
};

export default Movies;