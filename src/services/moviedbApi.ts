import { createFetch } from '@vueuse/core';
import { useUserPreferences } from '~/stores/userPreferences';

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

const defaultPage = 1;

function getDefaultLanguage() {
  const { defaultLanguage } = storeToRefs(useUserPreferences());
  return defaultLanguage.value;
}

export default {
  getNowPlayingMovies(language: string = getDefaultLanguage(), page: number = defaultPage) {
    return useMoviesFetch(`/movie/now_playing?language=${language}&page=${page}`).get().json();
  },

  getPopularMovies(language: string = getDefaultLanguage(), page: number = defaultPage) {
    return useMoviesFetch(`/movie/popular?language=${language}&page=${page}`).get().json();
  },

  getTopRatedMovies(language: string = getDefaultLanguage(), page: number = defaultPage) {
    return useMoviesFetch(`/movie/top_rated?language=${language}&page=${page}`).get().json();
  },

  getUpcomingMovies(language: string = getDefaultLanguage(), page: number = defaultPage) {
    return useMoviesFetch(`/movie/upcoming?language=${language}&page=${page}`).get().json();
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
