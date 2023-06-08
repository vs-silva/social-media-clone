<template>
  <div>
      <main-section :title="`Home`" :loading="loading">
          {{ user }}
      </main-section>
  </div>

</template>

<script setup lang="ts">
import Store from "./../store";
import {storeToRefs} from "pinia";

const loading = ref(false);

const userStore = Store.useUserStore();
const { user } = storeToRefs(userStore);


</script>

<style scoped>

</style>
