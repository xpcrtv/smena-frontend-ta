<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <user-info />
    </v-col>
  </v-row>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue';
export default {
  name: 'Home',
  components: {
    UserInfo
  }
};
</script>
