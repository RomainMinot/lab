<script setup lang="ts">
import type { Genre, Movie } from '~/types/movie';
import { useMovies } from '~/composables/movies';

const props = defineProps<{
  movie: Movie;
}>();

const { getPosterUrl, getVoteAverageDisplay, getGenres } = useMovies();
const detailsRoute = computed(() => `/movies/${props.movie.id}`);
const posterUrl = computed(() => getPosterUrl(props.movie.backdrop_path));
const posterAlt = computed(() => `${props.movie.original_title} poster`);
const voteAverage = computed(() => getVoteAverageDisplay(props.movie.vote_average));
const genres: Ref<Genre[]> = ref([]);

onMounted(async () => {
  genres.value = await getGenres(props.movie.genre_ids);
});
</script>

<template>
  <div class="flex flex-col gap-2 p-4 bg-vista-blue-light rounded-2xl relative hover:-translate-y-1 transition-all duration-300">
    <img :src="posterUrl" :alt="posterAlt" class="rounded-xl">
    <div class="flex flex-col justify-between grow-1 gap-3 p-2">
      <div class="flex flex-col gap-2">
        <h3 class="text-xl font-primary font-extrabold text-delft-blue text-truncate">
          {{ movie.title }}
        </h3>
        <MovieGenres :genres />
        <CardText :text="movie.overview" class="line-clamp-4" />
      </div>
      <CardSubtext :text="`Score: ${voteAverage}`" font-size="text-sm" />
    </div>
    <router-link :to="detailsRoute" class="absolute inset-0" />
  </div>
</template>
