<script setup lang="ts">
import type { CreditsItem } from '~/types/movie';
import { useMovies } from '~/composables/movies';
import moviedbApi from '~/services/moviedbApi';

const props = defineProps<{ id: string }>();
const { data: movie } = await moviedbApi.getMovie(props.id);
const { getPosterUrl, getVoteAverageDisplay, getRuntimeDisplay } = useMovies();

const posterUrl = computed(() => getPosterUrl(movie.value.poster_path, 'w780'));
const releaseYear = computed(() => movie.value.release_date.split('-')[0]);
const runtime = computed(() => getRuntimeDisplay(movie.value.runtime));
const voteAverage = computed(() => getVoteAverageDisplay(movie.value.vote_average));
const siteLink = computed(() => `https://www.themoviedb.org/movie/${movie.value.id}`);
const { data: credits } = await moviedbApi.getCredits(props.id);
const displayCast = computed(() => sortByOrder(credits.value.cast.slice(0, 6)));
const displayCrew = computed(() => credits.value.crew.slice(0, 4));

function sortByOrder(items: CreditsItem[]) {
  return items.sort((a, b) => a.order - b.order);
}
</script>

<template>
  <router-link to="/" class="font-primary text-van-dyke hover:text-van-dyke-light transition-all duration-300'">
    Go back to movies
  </router-link>
  <div class="w-full md:w-[75%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mt-10 md:mt-14 md:gap-10 mb-10 md:mb-0">
    <div class="flex flex-col gap-3 order-2 md:order-1">
      <div class="flex flex-row items-end justify-between gap-2">
        <h1 class="text-2xl md:text-3xl font-primary font-extrabold text-delft-blue">
          {{ movie.title }} ({{ releaseYear }})
        </h1>
        <CardSubtext :text="runtime" font-size="text-sm" class="whitespace-nowrap" />
      </div>
      <MovieGenres :genres="movie.genres" />
      <CardText :text="movie.overview" />
      <div class="flex flex-row justify-start items-center gap-4 mt-3">
        <AppButton label="View on The Movie DB" :to="siteLink" external />
        <CardSubtext :text="`Score: ${voteAverage}`" font-size="text-sm" />
      </div>
      <MovieCreditsList :peoples="displayCast">
        Cast
      </MovieCreditsList>
      <MovieCreditsList :peoples="displayCrew">
        Crew
      </MovieCreditsList>
    </div>
    <img :src="posterUrl" :alt="movie.original_title" class="rounded-2xl object-cover object-top order-1 md:order-2">
  </div>
</template>
