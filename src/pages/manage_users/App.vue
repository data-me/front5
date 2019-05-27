<template>
  <div id="app">
    <Navbar/>
    <div class="user-list">
      <h1>{{ $t('manage_users') }}</h1>
      <DataScientistList/>
      <CompanyList/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import DataScientistList from "../../components/Users/DataScientistList.vue";
import CompanyList from "../../components/Users/CompanyList.vue";

export default {
  name: "app",
  components: {
    Navbar,
    Footer,
    DataScientistList,
    CompanyList
  },
  mounted: function() {
    var lang;

    if (this.$cookies.get("lang")) {
      lang = this.$cookies.get("lang");
    } else {
      lang = "en";
    }
    this.$i18n.locale = lang;
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.user-list {
  margin: 2em;
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


