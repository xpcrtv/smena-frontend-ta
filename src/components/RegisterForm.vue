<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Регистрация</v-toolbar-title>
    </v-toolbar>
    <v-form
      ref="registerForm"
      @submit.prevent="registerUser"
      lazy-validation
      :disabled="loading"
    >
      <v-card-text>
        <v-text-field
          label="Ваше имя"
          name="username"
          prepend-icon="mdi-account"
          type="text"
          v-model="username"
          required
          :rules="userNameRules"
          autofocus
        />
        <v-text-field
          id="password"
          label="Введите пароль"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          v-model="password"
          required
          :rules="passwordRules"
        />
        <v-text-field
          id="password-prepeat"
          label="Повторите пароль еще раз"
          name="password-repeat"
          prepend-icon="mdi-lock"
          type="password"
          v-model="passwordRepeat"
          required
          :rules="passwordRules"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" type="submit" color="primary"
          >Зарегистрироваться</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    username: '',
    password: '',
    passwordRepeat: '',
    loading: false
  }),
  computed: {
    userNameRules() {
      return [value => value.length >= 3 || 'Слишком короткое имя!'];
    },
    passwordRules() {
      return [
        value => value.length >= 4 || 'Слишком короткий пароль!',
        value => value === this.password || 'Введенные пароли не совпадают!'
      ];
    }
  },
  methods: {
    registerUser() {
      const newUserData = {
        username: this.username,
        password: this.password
      };
      const isValid = this.$refs.registerForm.validate();
      if (isValid) {
        this.loading = true;
        this.$store
          .dispatch('register', newUserData)
          .then(() => this.$store.dispatch('logIn', newUserData))
          .then(() => this.$router.push('/'))
          .catch(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>
