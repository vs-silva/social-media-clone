<template>
  <nuxt-link to="#"
             class="flex items-center p-3 w-min rounded-full text-black hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white"
             :class="defaultTransition">

      <div class="w-6 h-6 text-dark" :class="defaultTransition">
          <slot name="icon"></slot>
      </div>

      <div class="hidden ml-4 text-xl xl:block"
           :class="textClasses">
          <slot name="name"></slot>
      </div>

  </nuxt-link>

</template>

<script setup lang="ts">
const {defaultTransition} = useTailwindConfig();

const props = defineProps({
    active: {
        type: Boolean,
        required: false,
        default: false
    }
});

const textClasses = computed(() => props.active ? 'font-semibold': 'font-normal');

</script>

<style scoped>

</style>
