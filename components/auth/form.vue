<template>
  <div>
    <div class="pt-5 space-y-6">

      <ui-input type="text" label="Username" placeholder="@username" v-model="authData.username"/>
      <ui-input type="password" label="Password" placeholder="**********" v-model="authData.password"/>

      <div>
        <button type="button" @click.prevent="() => AuthLoginHandler({
          username: authData.username,
          password: authData.password
        })">Login</button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {UserAuthDTO} from "../../server/business/user/core/dto/user-auth.dto";
import {AuthLoginHandler} from "./utils/auth-login-handler";

const authData = reactive(<UserAuthDTO>{
  username: '',
  password: ''
});

</script>

<style scoped>

</style>
