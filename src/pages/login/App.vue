<template>
  <div id="app">
    <Navbar v-if="showNavbar"/>

    <b-form id="form" @submit.prevent @submit="onSubmit" v-if="showForm">
      <label for="textUsername">{{$t('username')}}</label>
      <b-input type="text" v-model="form.username" id="textUsername"/>
      <br>
      <label for="textPassword">{{$t('password')}}</label>
      <b-input
        type="password"
        id="textPassword"
        v-model="form.password"
        aria-describedby="passwordHelpBlock"
      />
      <br>
      <br>
      <b-button type="submit" variant="primary">{{$t('login')}}</b-button>
    </b-form>

    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";

export default {
  name: "app",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      showForm: true,
      showNavbar: true
    };
  },
  mounted: function() {
    var lang;

    if (this.$cookies.get("lang")) {
      lang = this.$cookies.get("lang");
    } else {
      lang = "en";
    }
    this.$i18n.locale = lang;
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      var username = this.form.username;
      var password = this.form.password;

      const baseURI = "https://api5-datame.herokuapp.com/api/v1/login";
      this.$http
        .post(baseURI, {
          username: username,
          password: password
        })
        .then(result => {
          //alert(JSON.stringify(result.data))
          this.$cookies.set("token", result.data.token);
          //this.$router.replace({path:'/helloworld'})
          this.showForm = false;
          this.showNavbar = false;
          let token = `JWT ${this.$cookies.get("token")}`;
          this.$http
            .get("https://api5-datame.herokuapp.com/api/v1/whoami", {
              headers: { Authorization: token }
            })
            .then(result => {
              this.$cookies.set("user_type", result.data.user_type);
              this.$cookies.set("ads", result.data.ads);
              this.showNavbar = true;
              window.location.href = "/";
            });
        })
        .catch(() => {
          this.$bvModal.msgBoxOk(this.$t("login_error"),  {
            okTitle:this.$t('accept')
          })
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#form {
  padding-top: 5em;
  width: 18rem;
  text-align: center;
  display: inline-block;

}

html {
  background-color: #ffffff;
}

#particles-js {
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
