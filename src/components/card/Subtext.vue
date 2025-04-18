<script setup lang="ts">
const props = defineProps<{
  text: string;
  fontSize?: string;
}>();

const fontSize = computed(() => props.fontSize || 'text-sm');
</script>

<template>
  <span :class="`${fontSize} font-secondary text-vista-blue`">
    {{ text }}
  </span>
</template>
