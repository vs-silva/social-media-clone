<template>
  <div>
      <main-section :title="`Home`" :loading="loading">
          this is the home page!
      </main-section>
  </div>

</template>

<script setup lang="ts">
import Eventbus from "../eventbus";
import {ApiEngineEventTypeConstants} from "../api-engine/constants/api-engine-event-type.constants";

const loading = ref(false);

Eventbus.on(ApiEngineEventTypeConstants.SERVICE_REQUEST_STARTED, () => {
  console.log('here started')
  loading.value = true;
});

Eventbus.on(ApiEngineEventTypeConstants.SERVICE_REQUEST_ENDED, () => {
  console.log('here ended')
  loading.value = false;
});

</script>

<style scoped>

</style>
