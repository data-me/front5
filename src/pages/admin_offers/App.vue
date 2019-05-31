<template>
  <div id="app">
    <Navbar/>
    <div v-bind:key="offer.offer_id" id="offers" v-for="offer in offers">
      <b-card no-body>
        <b-card-header header-tag="header" class="p-3" role="tab">
          <b-button
            block
            v-b-toggle="'accordion-' +  offer.offer_id "
            variant="outline-primary"
          >{{offer.title}}</b-button>
        </b-card-header>

        <b-collapse :id="'accordion-'+offer.offer_id" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <span class="font-weight-bold">{{$t('description')}}:</span>
              {{ offer.description }}
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">{{$t('price_offered')}}:</span>
              {{ offer.price_offered + '€' }}
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">{{$t('creation_date')}}:</span>
              {{offer.creation_date.slice(0,10)}} {{ offer.creation_date.slice(11,16)}}
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">{{$t('limit_date')}}:</span>
              {{offer.limit_time.slice(0,10)}} {{ offer.limit_time.slice(11,16)}}
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">{{$t('state')}}:</span>
              {{ offer.finished ? $t('finished') : $t('not_finished') }}
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">{{$t('contract')}}: {{offer.contract}}</span>
            </b-card-text>

            <b-card-text>
              <span class="font-weight-bold">{{$t('file')}}: {{offer.files}}</span>
            </b-card-text>

            <div id="deleteoffer">
              <b-button
                variant="danger"
                class="mt-2"
                block
                @click="deleteOffer(offer.offer_id)"
              >{{$t('delete_offer')}}</b-button>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
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
      offers: []
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
      .get("https://api5-datame.herokuapp.com/api/v2/admin/offers", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.offers = result.data;
      });
  },

  methods: {
    deleteOffer(offer_id) {
      var token = "JWT " + this.$cookies.get("token");
    
      this.$bvModal.msgBoxConfirm(this.$t('confirm_delete_offer'),  {
           okTitle:this.$t('accept'),
           cancelTitle:this.$t('cancel')
        }).then(value => {
          if(value === true){
      
          this.$http
            .delete(
              "https://api5-datame.herokuapp.com/api/v2/admin/delete_offer/" + offer_id,
              {
                headers: {
                  Authorization: token
                }
              }
            )
            .then(result => {
              this.$bvModal.msgBoxOk(this.$t('successful_del_offer'), {
                okTitle:this.$t('accept')
              });
              window.location.href = "/admin_offers.html";
            });
      }
    })
  },
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

#particles-js {
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
