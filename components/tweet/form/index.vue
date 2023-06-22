<template>
  <div>
    <tweet-form-input :user="props.user as UserResponseDTO"
                      :submitHandler="props.submitHandler"/>
  </div>
</template>

<script setup lang="ts">

import {PropType} from "@vue/runtime-core";
import type {UserResponseDTO} from "../../../server/business/user/core/dto/user-response.dto";
import type {TweetRequestDTO} from "../../../server/business/tweets/core/dtos/tweet-request.dto";

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
