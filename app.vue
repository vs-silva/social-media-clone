<template>
  <div :class="{dark: darkMode}">

      <div class="bg-white dark:bg-dim-900">

          <loading-animation v-if="loading"/>

          <div v-if="user" class="min-h-full">

              <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">

                  <!--Sidebar left-->
                  <div class="hidden md:block xs:col-span-1 xl:col-span-2">
                      <div class="sticky top-0">
                          <sidebar-left />
                      </div>
                  </div>

                  <!--Main content-->
                  <main class="col-span-12 md:col-span-8 xl:col-span-6">
                      <router-view />
                  </main>

                  <!--Sidebar right-->
                  <div class="hidden col-span-12 md:block md:col-span-3 xl:col-span-4">
                      <div class="sticky top-0">
                          <sidebar-right />
                      </div>
                  </div>

              </div>

          </div>

         <auth v-else/>

      </div>

  </div>
</template>

<script setup>
import Store from "./store";
import {storeToRefs} from "pinia";
import Eventbus from "./eventbus";
import {ApiEngineEventTypeConstants} from "./api-engine/constants/api-engine-event-type.constants";
import {ref} from "@vue/runtime-core";

const userStore = Store.useUserStore();
const { user, accessToken } = storeToRefs(userStore);
const { refreshToken, getUser } = userStore;

const darkMode = ref(false);
const loading = ref(false);

onBeforeMount(async () => {

  Eventbus.on(ApiEngineEventTypeConstants.SERVICE_REQUEST_STARTED, () => {
    loading.value = true;
  });

  Eventbus.on(ApiEngineEventTypeConstants.SERVICE_REQUEST_ENDED, () => {
    loading.value = false;
  });

  await refreshToken();

  if(accessToken.value) {
    await getUser();
  }
});

onDeactivated(() => {
  Eventbus.off(ApiEngineEventTypeConstants.SERVICE_REQUEST_STARTED);
  Eventbus.off(ApiEngineEventTypeConstants.SERVICE_REQUEST_ENDED);
});
</script>
