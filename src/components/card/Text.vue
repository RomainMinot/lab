<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <p class="text-sm font-secondary text-glaucous">
    {{ text }}
  </p>
</template>
