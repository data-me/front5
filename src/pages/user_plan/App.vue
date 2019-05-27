<template>
  <div id="app">
    <Navbar/>
    <display-current-user-plan></display-current-user-plan>
      <b-card :header="$t('price')" align="center" class="text-center default-margin">
        <b-card-text>
          {{$t('price_per_month')}}
        </b-card-text>
      </b-card>
    <user-plan-form></user-plan-form>
    <receive-paypal-user-plan-payment/>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import DisplayCurrentUserPlan from "../../components/UserPlan/DisplayCurrentUserPlan.vue";
import UserPlanForm from "../../components/UserPlan/UserPlanForm.vue";
import ReceivePaypalUserPlanPayment from "../../components/UserPlan/ReceivePaypalUserPlanPayment.vue";
import UserPlanInformation from "../../components/UserPlan/UserPlanInformation.vue";

export default {
  name: "app",
  components: {
    Navbar,
    Footer,
    DisplayCurrentUserPlan,
    UserPlanForm,
    ReceivePaypalUserPlanPayment,
    UserPlanInformation
  },
  data() {
    return {};
  },
  mounted: function() {
    var token = "JWT " + this.$cookies.get("token");
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

html {
  background-color: #ffffff;
}

.default-margin{
    margin-right : 2em;
    margin-left : 2em;
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
