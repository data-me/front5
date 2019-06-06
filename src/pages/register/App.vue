<template>
  <div id="app">
    <Navbar/>

    <br>

    <b-modal v-model="modalShow" ref="messages" id="messages" hide-footer size="xl" title="Erros">
      <template slot="modal-header">{{$t('error_msg')}}</template>
      <li id="messagesError" v-for="message in this.messages">{{message}}</li>
      <template slot="modal-footer">
        <button class="btn btn-primary">{{$t('save_changes')}}</button>
      </template>
      <b-button
        class="mt-3"
        variant="outline-danger"
        block
        @click="modalShow = false"
      >{{$t('close')}}</b-button>
    </b-modal>

    <b-modal
      no-close-on-esc
      no-close-on-backdrop
      class="registered"
      v-model="registered"
      ref="registered"
      id="registered"
      hide-footer
      size="xl"
      title="registered"
    >
      <template slot="modal-header">{{$t('congrats')}}</template>
      {{this.registerMessage}}
      <br/>
      <b-button variant="success" href="/login.html">{{$t('go_login')}}</b-button>
      <!--<b-form @submit="login">
        <b-button
          type="submit"
          class="mt-2"
          variant="success"
          @click.stop.prevent="login()"
        >{{$t('lets_start')}}</b-button>
      </b-form>-->
    </b-modal>

    <b-form id="register" @submit="createUser">
      <label for="type">{{$t('account_type')}}</label>
      <br>
      <select v-model="selected">
        <option>DataScientist</option>
        <option>Company</option>
      </select>
      <br>
      <label for="username">{{$t('username')}}</label>
      <b-input
        type="text"
        v-model="form.username"
        id="username"
        :state="form.username.length > 5"
        :maxlength="80"
        aria-describedby="usernameHelpBlock"
        min="5"
        required
      />
      <b-form-text id="usernameHelpBlock">{{$t('username_placeholder')}}</b-form-text>
      <br>
      <label for="password">{{$t('password')}}</label>
      <b-input
        type="password"
        id="password"
        v-model="form.password"
        :state="form.password.length >= 8 && (new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/g).test(this.form.password))"
        aria-describedby="passwordHelpBlock"
        required
      />
      <b-form-text id="passwordHelpBlock">
        {{$t('password_help1')}}
        <br>
        {{$t('password_help2')}}
        <br>
        {{$t('password_help3')}}
        <br>
        {{$t('password_help4')}}
        <br>
        {{$t('password_help5')}}
      </b-form-text>
      <br>

      <label for="confirmPassword">{{$t('password_confim')}}</label>
      <b-input
        type="password"
        id="confirmPassword"
        v-model="form.confirmPassword"
        :state="form.confirmPassword == form.password && form.confirmPassword.length != 0"
        :maxlength="80"
        aria-describedby="confirmPasswordHelpBlock"
      />
      <b-form-text id="confirmPasswordHelpBlock">{{$t('password_error')}}</b-form-text>
      <br>

      <label for="name">{{$t('name')}}</label>
      <b-input
        type="text"
        id="text"
        v-model="form.name"
        :state="form.name.length > 0"
        :maxlength="80"
        aria-describedby="nameHelpBlock"
      />
      <b-form-text id="nameHelpBlock">{{$t('write_name')}}</b-form-text>
      <br>

      <div id="surname" v-if="selected ==='DataScientist'">
        <label for="surname">{{$t('surname')}}</label>
        <b-input
          type="text"
          id="text"
          v-model="form.surname"
          aria-describedby="nameHelpBlock"
          :state="form.surname.length > 0"
          :maxlength="80"
        />
        <b-form-text id="nameHelpBlock">{{$t('write_surname')}}</b-form-text>
        <br>
      </div>

      <div id="photo" v-if="selected ==='DataScientist'">
        <label for="photo">{{$t('photo')}}</label>
        <b-input
          type="url"
          id="text"
          v-model="form.photo"
          aria-describedby="photoHelpBlock"
          :state="form.photo.length > 0 && new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).test(this.form.photo)"
          :maxlength="80"
        />
        <b-form-text id="photoHelpBlock">{{$t('photo_help')}}</b-form-text>
        <br>
      </div>

      <label for="email">{{$t('email')}}</label>
      <b-input
        type="email"
        id="text"
        v-model="form.email"
        aria-describedby="emailHelpBlock"
        :state="form.email.length > 0 && new RegExp(/\S+@gmail+\.\S+|\S+@hotmail+\.\S+/).test(this.form.email)"
        :maxlength="80"
      />
      <b-form-text id="emailHelpBlock">{{$t('write_email')}}</b-form-text>
      <br>

      <div id="address" v-if="selected ==='DataScientist'">
        <label for="address">{{$t('address')}}</label>
        <b-input
          type="text"
          id="text"
          v-model="form.address"
          aria-describedby="addressHelpBlock"
          :state="form.address.length > 0"
          :maxlength="80"
        />
        <b-form-text id="addressHelpBlock">{{$t('write_address')}}</b-form-text>
        <br>
      </div>

      <div id="phone" v-if="selected ==='DataScientist'">
        <label for="phone">{{$t('phone')}}</label>
        <b-input
          type="text"
          id="text"
          v-model="form.phone"
          aria-describedby="phoneHelpBlock"
          :state="form.phone.length > 0 && new RegExp(/\d{9}/).test(this.form.phone)"
          :maxlength="9"
        />
        <b-form-text id="phoneHelpBlock">{{$t('write_phone')}}</b-form-text>
        <br>
      </div>

      <div id="description" v-if="selected ==='Company'">
        <label for="description">{{$t('description')}}</label>
        <b-form-textarea
          type="text"
          id="text"
          v-model="form.description"
          aria-describedby="descriptionHelpBlock"
          :state="form.description.length > 0"
          :maxlength="80"
        />
        <b-form-text id="descriptionHelpBlock">{{$t('description_help_company')}}</b-form-text>
        <br>
      </div>

      <div id="nif" v-if="selected ==='Company'">
        <label for="nif">{{$t('nif')}}</label>
        <b-input
          type="text"
          id="text"
          v-model="form.nif"
          aria-describedby="nifHelpBlock"
          :state="form.nif.length > 0"
          :maxlength="9"
        />
        <b-form-text id="nifHelpBlock">{{$t('write_nif')}}</b-form-text>
        <br>
      </div>

      <div id="logo" v-if="selected ==='Company'">
        <label for="logo">{{$t('logo_url')}}</label>
        <b-input
          type="url"
          id="text"
          v-model="form.logo"
          aria-describedby="logoHelpBlock"
          :state="form.logo.length > 0 && new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).test(this.form.logo)"
          :maxlength="80"
        />
        <b-form-text id="logoHelpBlock">{{$t('logo_url_help')}}</b-form-text>
        <br>
      </div>

      <b-form-checkbox
        id="checkbox-1"
        v-model="form.confirmTerms"
        name="checkbox-1"
        value="accepted"
        unchecked-value="not_accepted"
      >{{$t('terms_and_condition_claim')}}<a href="/terms_and_conditions.html">{{$t('terms')}}</a></b-form-checkbox>

      <br>

      <b-button
        type="submit"
        class="mt-2"
        variant="success"
        block
        @click.stop.prevent="createUser()"
        v-if="selected ==='Company'"
      >{{$t('create_company')}}:</b-button>
      <b-button
        type="submit"
        variant="success"
        block
        @click.stop.prevent="createUser()"
        v-if="selected ==='DataScientist'"
      >{{$t('create_ds')}}</b-button>
      <br>
      <br>
    </b-form>

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
  computed: {},
  data() {
    return {
      items: [],
      form: {
        username: "",
        password: "",
        name: "",
        surname: "",
        phone: "",
        address: "",
        email: "",
        photo: "",
        surname: "",
        logo: "",
        description: "",
        nif: "",
        confirmPassword: "",
        confirmTerms: "not_accepted"
      },
      selected: "DataScientist",
      messages: [],
      modalShow: "false",
      user_type: this.$cookies.get("user_type"),
      registered: "false",
      registerMessage: ""
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

    var token = "JWT " + this.$cookies.get("token");
    this.$http
      .get("https://api5-datame.herokuapp.com/api/v1/offer", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.items = result.data;
      });
  },
  methods: {
    checkErrors() {},

    createUser(event) {
      const formData = new FormData();
      formData.append("username", this.form.username);
      formData.append("password", this.form.password);
      formData.append("name", this.form.name);
      formData.append("confirmTerms", this.form.name);
      this.messages = [];
      if (this.form.password != this.form.confirmPassword) {
        this.messages.push(this.$t("register_error_password1"));
      }
      if (this.form.username.length < 5) {
        this.messages.push(this.$t("register_error_username"));
      }
      if (this.form.password.length < 8) {
        this.messages.push(this.$t("register_error_password2"));
      }
      var re = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/g);
      if (!re.test(this.form.password)) {
        this.messages.push(this.$t("register_error_password3"));
      }
      if (this.form.name.length == 0) {
        this.messages.push(this.$t("name_error"));
      }
      if (this.selected == "DataScientist" && this.form.surname.length == 0) {
        this.messages.push(this.$t("surname_error"));
      }

      if (this.selected == "DataScientist" && this.form.email.length == 0) {
        this.messages.push(this.$t("email_error"));
      }

      if (this.selected == "DataScientist" && this.form.address.length == 0) {
        this.messages.push(this.$t("address_error"));
      }
      if (this.selected == "Company" && this.form.nif.length == 0) {
        this.messages.push(this.$t("nif_error"));
      }
      var regex = new RegExp(
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
      );
      if (this.selected == "DataScientist" && !this.form.photo.match(regex)) {
        this.messages.push(this.$t("photo_error"));
      }

      if (this.selected == "Company" && this.form.description.length == 0) {
        this.messages.push(this.$t("description_error"));
      }
      if (this.selected == "Company" && !this.form.logo.match(regex)) {
        this.messages.push(this.$t("logo_error"));
      }
      if (this.form.confirmTerms == "not_accepted") {
        this.messages.push(this.$t("terms_error"));
      }
      if (this.messages.length > 0) {
        this.modalShow = true;
      } else {
        if (this.selected == "Company") {
          formData.append("type", "C");
          formData.append("nif", this.form.nif);
          formData.append("logo", this.form.logo);
          formData.append("email", this.form.email);
          formData.append("description", this.form.description);
        } else {
          formData.append("type", "DS");
          formData.append("surname", this.form.surname);
          formData.append("phone", this.form.phone);
          formData.append("address", this.form.address);
          formData.append("email", this.form.email);
          formData.append("photo", this.form.photo);
        }
        this.$http
          .post("https://api5-datame.herokuapp.com/api/v1/register", formData)
          .then(result => {
            this.registerMessage = this.$t('success_register')
            this.registered = true;
          });
      }
    },
    login(event) {
      const formLogin = new FormData();
      formLogin.append("username", this.form.username);
      formLogin.append("password", this.form.password);

      const baseURI = "https://api5-datame.herokuapp.com/api/v1/login";
      this.$http
        .post("https://api5-datame.herokuapp.com/api/v1/login", formLogin)
        .then(result => {
          this.$cookies.set("token", result.data.token);
          let token = `JWT ${this.$cookies.get("token")}`;
          this.$http
            .get("https://api5-datame.herokuapp.com/api/v1/whoami", {
              headers: { Authorization: token }
            })
            .then(result => {
              this.$cookies.set("user_type", result.data.user_type);
            });
        })
        .catch(err => {
          this.$bvModal.msgBoxOk(this.$t('error_signin'),  {
            okTitle:this.$t('accept')
          })
        });
      if (this.selected == "DataScientist") {
        this.$router.push({ path: "/my_cv" });
        window.location.replace("../");
      }
      if (this.selected == "Company") {
        this.$router.push({ path: "/helloworld.html" });
        window.location.replace("../");
      }
    }
  }
};

/*{
          'title': this.form.title,
          'description': this.form.description,
          'price_offered': this.form.price_offered,
          'currency': '0',
          'limit_time': '2019,12,12,10,40,0,0'
      },{ headers: {
       'Content-Type': 'multipart/form-data'
      }*/
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#offers {
  margin: 2em;
}

.create-offer {
  text-align: right;
}

#create-offer {
  margin-top: 2em;
  margin-right: 2em;
}

html {
  background-color: #ffffff;
}

#search-group {
  margin-left: 15%;
  margin-right: 15%;
}

#register {
  margin-left: 1%;
  max-width: 99%;
  margin-bottom: 5%;
}

#register input {
  max-width: 90%;
}

#particles-js {
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
