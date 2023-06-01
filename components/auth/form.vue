<template>
  <div>
    <div class="pt-5 space-y-6">

      <ui-input type="text" label="Username" placeholder="@username" v-model="userAuthData.username"/>
      <ui-input type="password" label="Password" placeholder="**********" v-model="userAuthData.password"/>

      <div>
        <button type="button" @click.prevent="() => userAuthLoginHandler(userAuthData)">Login</button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import Store from '../../store';
import {storeToRefs} from "pinia";

const userStore = Store.useUserStore();
const { userAuthData } = storeToRefs(userStore);
const { userAuthLoginHandler } = userStore;

</script>

<style scoped>

</style>
