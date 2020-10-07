<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
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
            <v-btn :loading="loading" type="submit" color="primary"
              >Войти</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'LoginPage',
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
          .catch(({ response }) => {
            this.loading = false;
            dispatch('setError', response.data.error);
          });
      }
    }
  }
};
</script>

<style></style>
