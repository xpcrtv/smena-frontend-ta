<template>
  <div class="app-notification">
    <v-slide-y-transition>
      <v-alert
        v-if="error"
        border="left"
        colored-border
        type="error"
        elevation="4"
        width="400px"
      >
        {{ error }}
      </v-alert>
    </v-slide-y-transition>
  </div>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.errorMessage;
    }
  },
  updated() {
    const { commit } = this.$store;
    setTimeout(() => commit('clearError'), 3000);
  }
};
</script>

<style>
.app-notification {
  position: fixed;
  top: 90px;
  right: 20px;
}
</style>
