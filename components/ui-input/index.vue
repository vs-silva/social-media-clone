<template>
  <div>

    <label for="" v-if="props.label"
    class="block pl-3 ml-px text-sm font-medium text-gray-700"
    >{{props.label}}</label>

    <input :type="props.type" class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
           :placeholder="props.placeholder"
           :value="props.modelValue"
           @input="(event) => emits(UiInputEventTypeConstants.INPUT_VALUE_UPDATE, (event.target as HTMLInputElement).value)"
    />

  </div>
</template>

<script setup lang="ts">
import {UiInputEventTypeConstants} from "./constants/ui-input-event-type.constants";

const emits = defineEmits([UiInputEventTypeConstants.INPUT_VALUE_UPDATE]);

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  modelValue: {
    type: String,
    required: true,
    default: ''
  },
  label: {
    type: String,
    required: false,
    default: ''
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
});



</script>

<style scoped>

</style>
