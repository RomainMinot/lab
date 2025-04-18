<script setup lang="ts">
defineProps<{
  label: string;
  to: string;
  external?: boolean;
}>();

const style = 'text-sm font-primary bg-vista-blue-light text-van-dyke rounded-lg px-4 py-2 max-w-fit hover:scale-102 hover:text-van-dyke-light transition-all duration-300';
</script>

<template>
  <a
    v-if="external"
    :href="to"
    target="_blank"
    :class="style"
  >
    {{ label }}
  </a>
  <router-link
    v-else
    :to="to"
    :class="style"
  >
    {{ label }}
  </router-link>
</template>
