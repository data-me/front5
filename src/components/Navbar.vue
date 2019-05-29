<template>
  <div id="nav">
    <b-navbar class="custom-nav" toggleable="lg"  :sticky="true">
      <b-navbar-brand href="/">
        <img id="DataMe-brand" alt="DataMe Logo" src="https://data-me.github.io/img/branding/DataMe-brand.png">
      </b-navbar-brand>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-show="isLoggedIn && (isDataScientist || isCompany)" href="/applications.html">{{ $t('applications') }}</b-nav-item>
          <b-nav-item v-show="isLoggedIn && (isDataScientist || isCompany)" href="/explore.html">{{ $t('offers') }}</b-nav-item>
          <b-nav-item v-show="isCompany && isLoggedIn" href="/companies.html">{{ $t('profile') }}</b-nav-item>
          <!-- <b-nav-item href="#">Pricing</b-nav-item> -->

          <b-nav-item v-show="isLoggedIn" href="/mail.html">
         {{ $t('mail') }} <span v-if="unviewedMessages != 0" id ="notification"> {{" " + unviewedMessages + " "}} </span>



          </b-nav-item>


          <!--<div v-if="user_type === 'ds'">-->
          <b-nav-item v-show="isDataScientist && isLoggedIn" href="/my_cv.html">{{ $t('profile') }}</b-nav-item>
          <b-nav-item v-show="isAdmin && isLoggedIn" href="/dashboard.html">{{ $t('dashboard') }}</b-nav-item>
          <b-nav-item v-show="isAdmin && isLoggedIn" href="/admin_offers.html" >{{ $t('manage_offers') }}</b-nav-item>
          <b-nav-item v-show="isAdmin && isLoggedIn" href="/manage_users.html" >{{ $t('manage_users') }}</b-nav-item>

          <b-nav-item v-show="isLoggedIn" href="/ranking.html" >Ranking</b-nav-item>

          <b-nav-item href="/submition.html" v-show="isDataScientist && isLoggedIn">{{ $t('my_submitions') }}</b-nav-item>
          <b-nav-item href="/submition.html" v-show="isCompany && isLoggedIn">{{ $t('recieved_submitions') }}</b-nav-item>
          <b-nav-item href="/user_plan.html" v-show="isDataScientist && isLoggedIn">{{ $t('user_plan') }}</b-nav-item>
          <b-nav-form class="buttons">
          <b-button size="sm" class="my-1 my-sm-0 accent-button" href="/login.html" v-show="!isLoggedIn">{{ $t('login') }}</b-button>
          </b-nav-form>
          <b-nav-form class="buttons">
          <b-button size="sm" class="my-2 my-sm-0 secondary-button" variant="outline-primary" href="/register.html" v-show="!isLoggedIn">{{ $t('signup') }}</b-button>
          </b-nav-form>
          <!--<b-nav-item href="/login.html" v-show="!isLoggedIn"><p class="accent-button">{{ $t('login') }}</p></b-nav-item>
          <b-nav-item href="/register.html" v-show="!isLoggedIn">{{ $t('signup') }}</b-nav-item>-->
          <b-nav-item href="#" v-show="isLoggedIn" @click="logOut">{{ $t('logout') }}</b-nav-item>
          <b-nav-item-dropdown :text="$t('lang')" v-model="$i18n.locale" right>
            <b-dropdown-item
              v-for="(lang, i) in langs"
              :key="`Lang${i}`"
              :value="lang"
              @click="changeLanguage(lang)"
            >{{ lang }}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {},
  data() {
    return {
      items: [],
      form: {
        title: "",
        description: "",
        status: "",
        date: null
      },
      isCompany: this.$cookies.get("user_type") === "com",
      isDataScientist: this.$cookies.get("user_type") === "ds",
      isAdmin: this.$cookies.get("user_type") === "admin",
      isLoggedIn: null,
      langs: ["English 🇬🇧", "Español 🇪🇸"],
      language: this.$t.lang,
      unviewedMessages: 0,
    };
  },
  mounted: function() {
    //var token = 'JWT ' + this.$cookies.get('token')

       if (this.getCookie("token")) {
        var token = 'JWT ' + this.$cookies.get('token')

        this.$http.get('http://localhost:8000/api/v3/unvieweds',{ headers:
        { Authorization: token }
        }).then((result) => {

            this.unviewedMessages = result.data.message
        })


     }

    if (this.getCookie("user_type") == "com") {
      this.isCompany = true;
    } else if (this.getCookie("user_type") == "ds") {
      this.isDataScientist = true;
    } else if (this.getCookie("user_type") == "admin") {
      this.isAdmin = true;
    }



  },
  created: function() {
    if (this.getCookie("token")) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  },
  methods: {
    getCookie: function(name) {
      var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return v ? v[2] : null;
    },
    setCookie: function(name, value, days) {
      var d = new Date();
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
      document.cookie =
        name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },
    logOut: function() {
      this.setCookie("token", "", -1);
      this.setCookie("ads", "true");
      this.setCookie("user_type", " ");
      window.location.href = "/";
    },
    changeLanguage: function(lang) {
      switch (lang) {
        case 'Español 🇪🇸':
            lang = 'es'
            break
        case 'English 🇬🇧':
            lang = 'en'
            break
      }
      this.$i18n.locale = lang;
      this.setCookie("lang", lang, 2);
      //window.location.href = "/"
    }
  }
};
</script>
<style>
#DataMe-brand {
  height: 35px;
  width: auto;
}

.custom-nav {
  background-color: #fff;
}
.accent-button {
  background-color: #22546f !important;
  border-color: #22546f;
  color: #fff;
  border: 0.5rem;
  margin-left: 0.3rem;
}

.secondary-button {
  background-color: #fff !important;
  border-color: #22546f !important;
  color: #22546f !important;
  margin-left: 0.3rem;
}

@media all and (max-width: 1000px)  {
  .buttons {
    text-align: center !important;
    display: block !important;
    margin-top:0.5rem;
  }
}
#notification{
    background: blue;
    color: white;
    border-radius: 60%;
    padding-left: 2px;
    padding-right: 2px;
}


</style>
