<script setup lang="ts">
import type { Movie, MoviesData, MovieTypeData } from '~/types/movie';
import moviedbApi from '~/services/moviedbApi';

const { y: scrollY } = useWindowScroll();
const { height: windowHeight } = useWindowSize();
const isFetching = ref(false);
const moviesData = ref<MoviesData | undefined>(undefined);
const movies = ref<Movie[]>([]);
const totalMovies = computed(() => moviesData.value?.total_results ? new Intl.NumberFormat('en-Us').format(moviesData.value?.total_results) : '0');
const movieTypesData = ref<MovieTypeData[]>([
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
const movieTypeSelect = useTemplateRef<HTMLSelectElement>('movieTypeSelect');
const selectedMovieLabel = computed(() => movieTypesData.value.find(movieType => movieType.selected)?.label);

onMounted(async () => {
  await getMoviesData('now_playing');
  useEventListener(window, 'scroll', async () => await loadMoreMovies());
});

async function loadMoreMovies() {
  if ((windowHeight.value + scrollY.value) >= document.body.offsetHeight - 32) {
    const movieTypeValue = movieTypeSelect.value?.value ?? 'now_playing';
    const language = movieTypeSelect.value?.value ?? 'en-US';
    const page = moviesData.value?.page ? moviesData.value.page + 1 : 1;
    await getMoviesData(movieTypeValue, language, page);
  }
}

async function handleMovieTypeChange(event: Event) {
  const eventTarget = event.target as HTMLSelectElement;
  const movieTypeValue = eventTarget.value;
  if (!movieTypeValue)
    return;

  movieTypesData.value.forEach((movieTypeData) => {
    movieTypeData.selected = movieTypeData.value === movieTypeValue;
  });
  
  movies.value = [];
  await getMoviesData(movieTypeValue);
}

async function getMoviesData(movieTypeValue: string, language?: string, page?: number) {
  isFetching.value = true;
  try {
    let data;
    switch (movieTypeValue) {
      case 'now_playing':
        ({ data } = await moviedbApi.getNowPlayingMovies(language, page));
        break;
      case 'popular':
        ({ data } = await moviedbApi.getPopularMovies(language, page));
        break;
      case 'top_rated':
        ({ data } = await moviedbApi.getTopRatedMovies(language, page));
        break;
      case 'upcoming':
        ({ data } = await moviedbApi.getUpcomingMovies(language, page));
        break;
    }
    moviesData.value = data?.value;
    movies.value = [...movies.value, ...(moviesData.value?.results ?? [])];
  }
  catch (error) {
    console.error('Failed to fetch movies:', error);
  }
  finally {
    isFetching.value = false;
  }
}
</script>

<template>
  <div class="flex items-end justify-between mt-4 mb-8">
    <div class="flex items-end gap-4">
      <h1 class="text-4xl font-primary font-extrabold text-delft-blue">
        {{ selectedMovieLabel }} movies
      </h1>
      <AppBadge v-if="totalMovies !== '0'" :label="totalMovies" class="mb-1" />
    </div>
    <div class="relative w-[18%]">
      <select ref="movieTypeSelect" class="font-primary rounded-lg block w-full appearance-none bg-vista-blue-light text-van-dyke text-sm px-3.5 py-2 hover:cursor-pointer hover:scale-102 transition-all duration-300" @change="handleMovieTypeChange($event)">
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
    <MovieCard v-for="movie in movies" :key="movie.id" :movie />
  </div>
  <div v-else-if="!isFetching" class="mt-14">
    <p class="text-center text-vista-blue">
      No movies found
    </p>
  </div>
  <div v-if="isFetching" class="w-full flex justify-center items-center mt-6">
    <AppSpinnerLoader />
  </div>
</template>
