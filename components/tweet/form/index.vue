<template>
  <div>

    <div  v-if="loading" class="flex items-center justify-center py-6">
      <spinner />
    </div>

     <div v-else>
       <tweet-form-input :user="props.user as UserResponseDTO"
       @submit-tweet="(tweetData) =>  submitHandler({
        text: tweetData.tweetText,
        mediaFile: [tweetData.mediaFile]
       })"/>
     </div>


  </div>
</template>

<script setup lang="ts">

import {PropType, ref} from "@vue/runtime-core";
import type {UserResponseDTO} from "../../../server/business/user/core/dto/user-response.dto";
import type {TweetRequestDTO} from "../../../server/business/tweets/core/dtos/tweet-request.dto";

const loading = ref(false);

const props = defineProps({
  user: {
    type: Object as PropType<UserResponseDTO>,
    required: true
  },
  submitHandler: {
    type: Function as PropType<(dto: TweetRequestDTO) => {}>,
    required: false,
    default: () => 'please provide a tweet submit handler'
  },
});

</script>

<style scoped>

</style>
