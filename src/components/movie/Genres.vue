<script setup lang="ts">
import type { Genre } from '~/types/movie';

defineProps<{
  genres?: Genre[];
}>();
</script>

<template>
  <div v-if="genres && genres.length > 0" class="flex flex-row flex-wrap gap-1 my-1">
    <AppBadge v-for="genre in genres" :key="genre.id" :label="genre.name" />
  </div>
</template>
