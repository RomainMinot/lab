<script setup lang="ts">
import type { MovieTypeData } from '~/types/movie';
import moviedbApi from '~/services/moviedbApi';

const { isFetching, data: moviesData } = await moviedbApi.getNowPlayingMovies();
const movies = computed(() => moviesData.value?.results || []);
const movieTypesData: Ref<MovieTypeData[]> = ref([
  {
    label: 'Now playing',
    value: 'now_playing',
    selected: true,
  },
  {
    label: 'Popular',
    value: 'popular',
    selected: false,
  },
  {
    label: 'Top rated',
    value: 'top_rated',
    selected: false,
  },
  {
    label: 'Upcoming',
    value: 'upcoming',
    selected: false,
  },
]);
const selectedMovieLabel = computed(() => movieTypesData.value.find(movieType => movieType.selected)?.label);

async function handleMovieTypeChange(event: Event) {
  const eventTarget = event.target as HTMLSelectElement;
  const movieTypeValue = eventTarget.value;
  if (!movieTypeValue)
    return;

  movieTypesData.value.forEach((movieTypeData) => {
    movieTypeData.selected = movieTypeData.value === movieTypeValue;
  });

  await getMoviesData(movieTypeValue);
}

async function getMoviesData(movieTypeValue: string) {
  try {
    let data;
    switch (movieTypeValue) {
      case 'now_playing':
        ({ data } = await moviedbApi.getNowPlayingMovies());
        break;
      case 'popular':
        ({ data } = await moviedbApi.getPopularMovies());
        break;
      case 'top_rated':
        ({ data } = await moviedbApi.getTopRatedMovies());
        break;
      case 'upcoming':
        ({ data } = await moviedbApi.getUpcomingMovies());
        break;
    }
    moviesData.value = data?.value;
  }
  catch (error) {
    console.error('Failed to fetch movies:', error);
  }
}
</script>

<template>
  <div class="flex items-end justify-between mt-4 mb-8">
    <h1 class="text-4xl font-primary font-extrabold text-delft-blue">
      {{ selectedMovieLabel }} movies
    </h1>
    <div class="relative w-[18%]">
      <select class="font-primary rounded-lg block w-full appearance-none bg-vista-blue-light text-van-dyke text-sm px-3.5 py-2" @change="handleMovieTypeChange($event)">
        <option v-for="movieType in movieTypesData" :key="movieType.value" :value="movieType.value" :selected="movieType.selected">
          {{ movieType.label }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-van-dyke-light">
        <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
  <div v-if="movies.length > 0" class="grid grid-cols-1 md:grid-cols-3 justify-center gap-5">
    <div v-if="isFetching">
      Loading...
    </div>
    <MovieCard v-for="movie in movies" :key="movie.id" :movie />
  </div>
</template>
