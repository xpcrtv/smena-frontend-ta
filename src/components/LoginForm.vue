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
      const { dispatch } = this.$store;
      const { loginForm } = this.$refs;
      const userData = {
        username: this.username,
        password: this.password
      };
      const isValid = loginForm.validate();
      if (isValid) {
        this.loading = true;
        dispatch('logIn', userData)
          .then(() => this.$router.push('/'))
          .catch(error => {
            this.loading = false;
            let errorMsg;
            if (error.message === 'Network Error') {
              errorMsg =
                'Проблемы с сетью или сервером. Попробуйте войти позже!';
            } else {
              errorMsg = error.response.data.error;
            }
            dispatch('setError', errorMsg);
          });
      }
    }
  }
};
</script>
