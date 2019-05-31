<template>
  <div id="app">
    <Navbar/>


      <br>
      <br>
      <h1 class = 'title'>{{$t('Reviews_of_companies')}}</h1>
      <div id="ranking" v-bind:key="item.id" v-for="(item) in rankingCompanies">
              <b-card-body>
                  <div class="card bg-light mb-3">
                    <h2 class="card-header">{{item.reviewed_name}} <br></h2>
                    <h2 class="card-header text-white bg-info">{{$t('Average')}}: {{item.average}} <br></h2>
                    <h2 class="card-header">{{$t('LastReview')}}:<h4 style="color:#8c8c8c;">{{item.comments}}</h4></h2>
                    
                </div>

              </b-card-body>
      </div>

      <h1 class = 'title'>{{$t('Reviews_of_datascientists')}}</h1>
      <div id="ranking" v-bind:key="item.id" v-for="(item) in rankingData">
              <b-card-body>
                  <div class="card bg-light mb-3">
                    <h2 class="card-header">{{item.reviewed_name}} <br></h2>
                    <h2 class="card-header text-white bg-info">{{$t('Average')}}: {{item.average}} <br></h2>
                    <h2 class="card-header">{{$t('LastReview')}}:<h4 style="color:#707070;">{{item.comments}}</h4></h2>
                </div>

              </b-card-body>
      </div>

      <advertisement/>


          <!-- Empty items -->
    <div v-if="!(itemsCargados1 && itemsCargados2)">
       <h2 id="NadaQueMostrar"> {{$t('nothing_to_show')}} </h2>
    </div>




  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import Advertisement from "../../components/Advertisement.vue";

export default {
  name: "app",
  components: {
    Navbar,
    Footer,
    Advertisement
  },
  data() {
    return {
      rankingData:[],
      rankingCompanies:[],
      itemsCargados1: false,
      itemsCargados2: false,
    }
  }, mounted: function () {

    var lang

    if (this.$cookies.get('lang')) {
      lang = this.$cookies.get('lang')
    } else {
      lang = 'en'
    }
    this.$i18n.locale = lang

    var token = 'JWT ' + this.$cookies.get('token')
/*
    this.$http.get('https://api5-datame.herokuapp.com/api/v3/reviews_companies',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.reviews_c = result.data
      })

    this.$http.get('https://api5-datame.herokuapp.com/api/v3/reviews_datascientists',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.reviews_d = result.data
      })
*/
    this.$http.get('https://api5-datame.herokuapp.com/api/v3/ranking_datascientists',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.rankingData = result.data
        this.itemsCargados1 = true
      })

    this.$http.get('https://api5-datame.herokuapp.com/api/v3/ranking_companies',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.rankingCompanies = result.data
        this.itemsCargados2 = true
      })

  },

}

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#ranking {
  margin: 2em;
  text-align: center;
}
.title{
  text-align : center;
}
html {
  background-color: #ffffff;
}

#NadaQueMostrar{
    color: blue;
    margin-top: 10%;
    text-align: center;
}

</style>
