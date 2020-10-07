<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4"
      ><v-card class="mx-auto" max-width="400" v-if="user">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="user.avatar"
        />
        <v-card-title>{{ user.username }}</v-card-title>
        <v-card-text class="text--primary">
          <div>{{ user.about }}</div>
        </v-card-text>
      </v-card>
    </v-col></v-row
  >
</template>

<script>
export default {
  name: 'Home',
  computed: {
    user() {
      return this.$store.state.user.user;
    }
  },
  created() {
    this.$store.dispatch('getUserInfo');
  }
};
</script>
