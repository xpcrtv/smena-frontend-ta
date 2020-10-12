<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Вход</v-toolbar-title>
    </v-toolbar>
    <v-form
      ref="loginForm"
      :disabled="loading"
      @submit.prevent="logIn"
      lazy-validation
    >
      <v-card-text>
        <v-text-field
          label="Ваше имя"
          name="name"
          prepend-icon="mdi-account"
          type="text"
          v-model="username"
          :rules="userNameRules"
          autofocus
        />
        <v-text-field
          id="password"
          label="Ваш пароль"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          v-model="password"
          :rules="passwordRules"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" type="submit" color="primary">Войти</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    username: '',
    password: '',
    loading: false
  }),
  computed: {
    userNameRules() {
      return [value => !!value || 'Введите имя!'];
    },
    passwordRules() {
      return [value => !!value || 'Введитепароль!'];
    }
  },
  methods: {
    logIn() {
      const userData = {
        username: this.username,
        password: this.password
      };
      const isValid = this.$refs.loginForm.validate();
      if (isValid) {
        this.loading = true;
        this.$store
          .dispatch('logIn', userData)
          .then(() => this.$router.push('/'))
          .catch(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>
