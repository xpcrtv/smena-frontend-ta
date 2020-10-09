<template>
  <v-card class="mx-auto" max-width="400" v-if="user">
    <v-img class="white--text align-end" height="200px" :src="user.avatar" />
    <v-card-title>{{ user.username }}</v-card-title>
    <v-card-text class="text--primary">
      <div>{{ user.about }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
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

<style></style>
