<template>
  <div>
      <main-section :title="`Home`" :loading="loading">
          this is the home page!
      </main-section>
  </div>

</template>

<script setup lang="ts">
const loading = ref(false);

</script>

<style scoped>

</style>
