<template>
  <div id="app">
    <Navbar/>
    <div id="cv_items_5" v-for="item in items" :key="item">
      <h4>{{item.Section}}</h4>
      <p></p>
      <div id="cv_items_sub" v-for="item2 in item.Items" :key="item2">
        <b-card :title="item2.name" :sub-title="item2.description">
          <b-card-text>{{item2.date_start}} - {{item2.date_finish}}</b-card-text>
        </b-card>
      </div>
    </div>
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
      items: []
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

    var id_ds = window.location.search.split("=")[1];

    var token = "JWT " + this.$cookies.get("token");
    this.$http
      .get(`https://api5-datame.herokuapp.com/api/v1/cv?dataScientistId=${id_ds}`, {
        headers: { Authorization: token }
      })
      .then(result => {
        this.items = result.data;
      });
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

#cv_items_5 {
  margin: 2em;
}

#cv_items_sub {
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

#particles-js {
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
