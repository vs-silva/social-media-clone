<template>
  <div class="flex flex-col">

      <!-- preview card: What's happening -->
      <sidebar-right-preview-card :title="`What's happening`">

          <sidebar-right-preview-card-item v-for="item in whatsHappeningItems" :key="item.title">
              <div>
                  <h2 class="font-bold text-gray-800 text-md dark:text-white">{{item.title}}</h2>
                  <p class="text-xs text-gray-400">{{item.count}}</p>
              </div>
          </sidebar-right-preview-card-item>

      </sidebar-right-preview-card>

      <!-- preview card: Who to follow -->
      <sidebar-right-preview-card :title="`Who to follow`">

          <sidebar-right-preview-card-item  v-for="item in whoToFollowItems" :key="item.name">

              <div class="flex flex-row items-center justify-between p-2">
                  <div class="flex flex-row">
                      <img class="w-10 h-10 rounded-full" :src="item.image" :alt="item.name"/>

                      <div class="flex flex-col ml-2">
                          <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{item.name}}</h1>
                          <p class="text-xs text-gray-400">{{item.handle}}</p>
                      </div>

                  </div>

                  <div class="flex h-full">
                      <button class="px-4 py-2 font-bold text-xs text-white bg-black rounded-full dark:text-black dark:bg-white">Follow</button>
                  </div>

              </div>

          </sidebar-right-preview-card-item>

      </sidebar-right-preview-card>

  </div>
</template>

<script setup lang="ts">

const whatsHappeningItems = ref([
    {
        title: '#SCIENCE',
        count: '100.8k Tweets'
    },
    {
        title: '#JIU-JITSU',
        count: '40.8k Tweets'
    },
    {
        title: '#UFC',
        count: '20.8k Tweets'
    }
]);

const whoToFollowItems = ref([
    {
        image: 'https://picsum.photos/200/200',
        name: 'Timothy Berners-Lee',
        handle: '@timothylee'
    },
    {
        image: 'https://picsum.photos/200/200',
        name: 'Tony Hawk',
        handle: '@sk8Tony'
    },

]);

</script>

<style scoped>

</style>
