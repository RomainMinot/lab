import { createFetch } from '@vueuse/core';

const useMoviesFetch = createFetch({
  baseUrl: 'https://api.themoviedb.org/3/',
  options: {
    async beforeFetch({ options }) {
      options.headers = new Headers(options.headers || {});
      options.headers.set('Authorization', `Bearer ${import.meta.env.VITE_MOVIE_API_TOKEN}`);

      return { options };
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
});

export default {
  getNowPlayingMovies() {
    return useMoviesFetch('/movie/now_playing').get().json();
  },

  getPopularMovies() {
    return useMoviesFetch('/movie/popular').get().json();
  },

  getTopRatedMovies() {
    return useMoviesFetch('/movie/top_rated').get().json();
  },

  getUpcomingMovies() {
    return useMoviesFetch('/movie/upcoming').get().json();
  },

  getMovie(id: string) {
    return useMoviesFetch(`/movie/${id}`).get().json();
  },

  getGenre(id: string) {
    return useMoviesFetch(`/genre/${id}`).get().json();
  },

  getCredits(id: string) {
    return useMoviesFetch(`/movie/${id}/credits`).get().json();
  },
};
