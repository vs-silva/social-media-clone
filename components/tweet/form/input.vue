<template>
  <div>
    <div class="flex items-center flex-shrink-0 p-4 pb-0">

      <div class="flex w-12 items-top">
          <img :src="props.user?.profileImage" alt="" class="inline-block w-10 h-10 rounded-full"/>
      </div>

      <div class="w-full p-2">
        <textarea class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0
dark:tex.white focus:ring-0" v-model="tweetText"></textarea>
      </div>

    </div>

    <div>
      <button @click.prevent="submitTweet">Tweet</button>
    </div>

  </div>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";
import type {UserResponseDTO} from "../../../server/business/user/core/dto/user-response.dto";
import type {TweetRequestDTO} from "../../../server/business/tweets/core/dtos/tweet-request.dto";

const tweetText = ref('');

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

function submitTweet(): void {
  props.submitHandler?.(<TweetRequestDTO>{
    text: tweetText.value
  });
}

</script>

<style scoped>

</style>
