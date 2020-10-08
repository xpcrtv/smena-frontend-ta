<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <register-form />
    </v-col>
  </v-row>
</template>

<script>
import RegisterForm from '@/components/RegisterForm';
export default {
  components: {
    RegisterForm
  }
};
</script>
