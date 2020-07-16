import React, { useState, useEffect } from 'react'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import axios from '../axios'
import './Row.css'

const baseURL = 'https://image.tmdb.org/t/p/original/'

const Row = ({ title, fetchURL, isLargeRow }) => {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState('')

    useEffect(() => {
        async function fetchList() {
            const { data } = await axios.get(fetchURL)
            setMovies(data.results)
        }

        fetchList()
    }, [fetchURL])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    }

    const handleClick = (mov) => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(mov?.name || '')
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get('v'))
                })
                .catch((err) => console.log('+++err+++', err))
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map((mov) => (
                    <img
                        key={mov.id}
                        className={`row__poster ${
                            isLargeRow && 'row__postersLarge'
                        }`}
                        onClick={() => handleClick(mov)}
                        src={`${baseURL}${
                            isLargeRow ? mov.poster_path : mov.backdrop_path
                        }`}
                        alt={mov.title}
                    />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
