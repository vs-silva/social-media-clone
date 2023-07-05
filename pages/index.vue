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
import {ref} from "@vue/runtime-core";

const userStore = Store.useUserStore();
const { user } = storeToRefs(userStore);

const tweetStore = Store.useTweetStore();
const { handleTweetSubmit } = tweetStore;

const loading = ref(false);

</script>

<style scoped>

</style>
