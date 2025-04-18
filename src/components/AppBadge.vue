<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <span class="text-xs font-secondary bg-vista-blue-light text-glaucous rounded-lg px-2 py-1 max-w-fit">
    {{ label }}
  </span>
</template>
