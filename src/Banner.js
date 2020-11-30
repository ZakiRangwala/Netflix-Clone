import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const movie_list = {
        Trending: requests.fetchTrending,
        NetflixOriginals: requests.fetchNetflixOriginals,
        TopRated: requests.fetchTopRated,
        HorrorMovies: requests.fetchHorrorMovies,
        Documentaries: requests.fetchDocumentaries,
        RomanceMovies: requests.fetchRomanceMovies,
      };
      const request = await axios.get(
        movie_list[Object.keys(movie_list)[Math.floor(Math.random() * 6)]]
      );
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      //background image
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "${base_url}${movie?.backdrop_path}"
            )`,
        backgroundPosition: "center center",
        opacity: 0.9,
      }}
    >
      <div className="banner__contents">
        {/* title */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* div 2 buttons */}
        <div className="banner_buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/* description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}
export default Banner;
