<script setup lang="ts">
import type { CreditsItem } from '~/types/movie';
import placeholder from '~/assets/img/placeholder.jpg';
import { useMovies } from '~/composables/movies';

const props = defineProps<{
  people: CreditsItem;
}>();

const { getPosterUrl } = useMovies();

const posterUrl = computed(() => {
  return props.people.profile_path ? getPosterUrl(props.people.profile_path, 'w300') : placeholder;
});
const role = computed(() => props.people.character || props.people.job);
</script>

<template>
  <div class="flex flex-row items-center gap-3">
    <img :src="posterUrl" :alt="people.name" class="rounded-lg bg-vista-blue-light object-cover object-center w-[60px] h-[75px]">
    <div class="flex flex-col gap-1">
      <CardText :text="people.name" class="leading-4" />
      <CardSubtext v-if="role" :text="role" font-size="text-xs" />
    </div>
  </div>
</template>
