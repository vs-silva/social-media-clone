<template>
  <div class="p-3 hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-300 border-b" :class="`${twitterBorderColor} ${defaultTransition}`">
      <slot></slot>
  </div>

</template>

<script setup lang="ts">
const {twitterBorderColor, defaultTransition} = useTailwindConfig();

</script>

<style scoped>

</style>
