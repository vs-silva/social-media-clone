<template>
  <div>
      <main-section :title="`Home`" :loading="loading">

        <tweet-form
            :user="user as UserResponseDTO"
            :submitHandler="handleTweetSubmit"
        />

      </main-section>
  </div>

</template>

<script setup lang="ts">
import Store from "./../store";
import {storeToRefs} from "pinia";
import type {UserResponseDTO} from "../server/business/user/core/dto/user-response.dto";

const loading = ref(false);

const userStore = Store.useUserStore();
const tweetStore = Store.useTweetStore();

const { user } = storeToRefs(userStore);
const { handleTweetSubmit } = tweetStore;


</script>

<style scoped>

</style>
