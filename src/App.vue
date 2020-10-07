<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title dark>
        <router-link tag="span" to="/" style="cursor:pointer"
          >Smena team</router-link
        >
      </v-toolbar-title>
      <v-spacer />
      <v-btn text v-if="!isLoggedIn" to="/login">Вход</v-btn>
      <v-btn text v-if="!isLoggedIn" to="/registration">Регистрация</v-btn>
      <v-btn text v-if="isLoggedIn" @click="logOut"
        ><v-icon dark>mdi-exit-to-app</v-icon></v-btn
      >
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <notification />
        <router-view />
      </v-container>
    </v-main>

    <v-footer app> </v-footer>
  </v-app>
</template>

<script>
import Notification from '@/components/Notification.vue';

export default {
  name: 'App',
  components: {
    Notification
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut');
      this.$router.push('/login');
    }
  }
};
</script>
