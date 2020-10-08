<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <login-form />
    </v-col>
  </v-row>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
export default {
  name: 'LoginPage',
  components: {
    LoginForm
  }
};
</script>

<style></style>
