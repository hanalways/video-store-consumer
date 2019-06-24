import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import SearchForm from './SearchForm';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    }
  }

  searchCallback = (queryString) => {
    this.setState(queryString);
    const url = 'https://video-store-api-sh.herokuapp.com/'

    axios.get(url, {query: queryString})
    .then((response) => {
      const movieList = response.data.map((movie) => {
        return {
          title: movie.title,
          overview: movie.overview,
          release_date: movie.release_date,
          image_url: movie.image_url,
          id: movie.external_id,
        }
      });

      this.setState({
        movies: movieList,
      })
    })
    .catch((error) => {
      console.log(error);
    })
  };


  render() {
    return(
      <section>
        <SearchForm 
          searchCallback={this.searchCallback}
        />
      </section>
    )
  }
}

Search.propTypes = {
  url: PropTypes.string,
}

export default Search;