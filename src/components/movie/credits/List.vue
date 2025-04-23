<script setup lang="ts">
import type { CreditsItem } from '~/types/movie';

defineProps<{
  peoples: CreditsItem[];
}>();
</script>

<template>
  <div class="mt-8 md:mt-10 w-full flex flex-col gap-4">
    <h2 class="text-lg font-primary font-extrabold text-delft-blue">
      <slot />
    </h2>
    <div class="grid grid-cols-2 gap-5">
      <MovieCreditsItem v-for="people in peoples" :key="people.id" :people="people" />
    </div>
  </div>
</template>
