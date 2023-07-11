
<template>
    <v-sheet width="300" class="loginContiner mx-auto" v-if="tab == 'login'">
        <v-form @submit.prevent>
          <v-text-field v-model="username" :rules="rulesUsername" label="Username" />
          <v-text-field v-model="password" :rules="rulesPassword" label="Password" />
        </v-form>
        <div class="flex gap-2 mt-2 w-300 justify-around">
          <v-btn type="submit" color="blue" size="large">登录</v-btn>
          <v-btn size="large" @click="() => { tab = 'register' }">注册</v-btn>
        </div>
      </v-sheet>
</template>

<style scoped>
.loginContiner {
  border: 2px solid #000;
  border-radius: 10px;
}
</style>