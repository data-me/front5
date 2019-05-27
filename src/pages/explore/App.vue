<template>
  <div id="app">
    <Navbar/>
    <!-- ////// -->
    <b-modal v-model="modalShow" ref="messages" id="messages" hide-footer size="xl" title="Erros">
      <template slot="modal-header">{{$t('check_errors')}}</template>
      <li id="messagesError" v-for="message in this.messages">{{message}}</li>
      <template slot="modal-footer">
        <button class="btn btn-primary">Save Changes</button>
      </template>
      <b-button class="mt-3" variant="outline-danger" block @click="modalShow = false">Close</b-button>
    </b-modal>
    <!-- Create an offer -->
    <div v-if="user_type === 'com'">
      <div class="create-offer">
        <b-button id="create-offer" v-b-modal.modalxl variant="outline-primary">{{$t('new_offer')}}</b-button>
      </div>
    </div>
    <div v-else-if="user_type === 'ds'">
      <!-- Search bar -->
      <div id="search-group">
        <b-form @submit="onSubmit">
          <b-input-group :prepend="$t('search')" class="mt-3">
            <b-form-input
              v-on:keyup="onSubmit"
              id="search_title"
              v-model="form.search_title"
              :placeholder="$t('search_placeholder_title_desc')"
            ></b-form-input>
            <b-form-input
              v-on:keyup="onSubmit"
              id="search_price"
              v-model="form.search_price"
              :placeholder="$t('search_placeholder_price')"
            ></b-form-input>
            <b-form-input
              v-on:keyup="onSubmit"
              id="search_date"
              v-model="form.search_date"
              :placeholder="$t('search_placeholder_date')"
            ></b-form-input>
          </b-input-group>
        </b-form>
      </div>
    </div>
    <!-- ////// -->

    <!-- Show offers -->
    <div id="offers" v-bind:key="item.id" v-for="(item, index) in items">
      <b-card no-body>
        <b-card-header header-tag="header" class="p-3" role="tab">
          <b-button @click="getCompany(item.company_id)" block v-b-toggle="'accordion-' + index" variant="outline-primary" >
              <div id="OfferTittle" style="Float: 'left'">{{item.title}} </div>
              <div id="OfferNOfApplications">{{item.num_applicantions}} {{$t('num_applicantions')}}</div>
              <div id="OfferPrice">{{item.price_offered + '€'}} </div>
              </b-button>
        </b-card-header>
        <b-collapse :id="'accordion-'+index" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <span class="font-weight-bold">{{$t('Company')}}:</span>
              {{com.name}} ({{com.user__username}})
            </b-card-text>
            <b-card-text>
              <span class="font-weight-bold">{{$t('description')}}:</span>
              {{item.description}}
            </b-card-text>
            <b-card-text>
              <span class="font-weight-bold">{{$t('price_offered')}}:</span>
              {{item.price_offered + '€'}}
            </b-card-text>
            <b-card-text>
              <span class="font-weight-bold">{{$t('creation_date')}}:</span>
              {{item.creation_date.slice(0,10)}} {{ item.creation_date.slice(11,16)}}
            </b-card-text>
            <b-card-text>
              <span class="font-weight-bold">{{$t('limit_date')}}:</span>
              {{item.limit_time.slice(0,10)}} {{ item.limit_time.slice(11,16)}}
            </b-card-text>
            <b-card-text>
              <span class="font-weight-bold">{{$t('state')}}:</span>
              {{ item.finished ? $t('finished') : $t('not_finished') }}
            </b-card-text>
            <b-card-text>
              <span class="font-weight-bold">{{$t('contract')}}: {{item.contract}}</span>
            </b-card-text>
            <b-card-text></b-card-text>
            <div v-if="user_type === 'ds'">
              <b-link
                href="#"
                v-if="item.finished == false"
                class="card-link"
                v-b-modal.createApply
                variant="outline-primary"
                @click="saveId(item.id)"
              >{{$t('apply')}}</b-link>
            </div>

            <div id="deleteoffer" v-if="user_type !== 'ds' && item.num_applicantions == 0">
              <b-button
                style="float: right; margin: 5px; margin-right:-5px"
                variant="danger"
                class="card-link"
                @click="deleteOffer(item.id, $t('confirm_delete_offer'))"
              >{{$t('delete_offer')}}</b-button>
            </div>
            <div id="editOffer" v-if="(user_type === 'com' && item.num_applicantions == 0)">
              <b-button
                style="float: right; margin: 5px"
                class="card-link"
                v-b-modal.EditOffer
                variant="outline-primary"
                @click="saveId(item.id,item.title,item.description)"
              >{{$t('edit_offer')}}</b-button>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>


  <advertisement/>

    <!-- ////// -->
    <!-- Empty items -->
    <div v-if="itemsCargados == true && (items == none || items.length == 0)">
       <h2 id="NadaQueMostrar"> {{$t('nothing_to_show')}} </h2>
    </div>

    <!-- Editing offer -->
    <b-modal id="EditOffer" hide-footer ref="editOffer" size="xl" :title="$t('edit_offer')">
      <b-form @submit.prevent>
        <label for="title">{{$t('title')}}</label>
        <b-input
          type="text"
          v-model="formEdit.title"
          id="title"
          :state="formEdit.title.length > 0"
          :maxlength="80"
          aria-describedby="titleHelpBlock"
        />
        <b-form-text id="titleHelpBlock">{{$t('title_offer_placeholder')}}</b-form-text>
        <br>
        <label for="description">{{$t('description')}}</label>
        <b-form-textarea
          type="text"
          id="description"
          v-model="formEdit.description"
          :state="formEdit.description.length >= 10"
          aria-describedby="descriptionHelpBlock"
        />
        <b-form-text id="descriptionHelpBlock">{{$t('description_offer_placeholder')}}</b-form-text>
        <br>
        <!--No sé como pasarle la oferta a la funcion updateOffer porque offerId está vacío -->
        <b-button class="mt-2" variant="success" block @click="updateOffer">{{$t('edit_offer')}}</b-button>
      </b-form>
    </b-modal>

    <!-- Modal Pop up -->
    <div>
      <b-modal id="modalxl" hide-footer ref="newOffer" size="xl" :title="$t('create_offer')">
        <b-form @submit.prevent>
          <label for="title">{{$t('title')}}</label>
          <b-input
            type="text"
            v-model="form.title"
            id="title"
            :state="form.title.length >= 5"
            :maxlength="80"
            aria-describedby="titleHelpBlock"
          />
          <b-form-text id="titleHelpBlock">{{$t('title_offer_placeholder')}}</b-form-text>
          <br>
          <label for="description">{{$t('description')}}</label>
          <b-form-textarea
            type="text"
            id="description"
            v-model="form.description"
            :state="form.description.length >= 10"
            aria-describedby="descriptionHelpBlock"
          />
          <b-form-text id="descriptionHelpBlock">{{$t('description_offer_placeholder')}}</b-form-text>
          <br>
          <label for="price">{{$t('price_offered')}}:</label>
          <b-input
            type="number"
            id="price"
            v-model="form.price_offered"
            :state="! form.price_offered == '' && form.price_offered > 0"
            aria-describedby="priceHelpBlock"
          />
          <b-form-text id="priceHelpBlock">{{$t('price_offered_placeholder')}}</b-form-text>
          <br>

          <label for="limit_time">{{$t('limit_time')}}:</label>
          <b-input
            type="text"
            id="limit_time"
            v-model="form.limit_time"
            aria-describedby="descriptionHelpBlock"
            :state="(new RegExp(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/).test(form.limit_time))"
          />
          <b-form-text id="descriptionHelpBlock">{{$t('limit_date_offer_placeholder')}}</b-form-text>
          <label for="files">{{$t('files')}}</label>
          <b-input
            type="text"
            id="files"
            v-model="form.files"
            :state="(new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).test(form.files))"
            aria-describedby="descriptionHelpBlock"
          />
          <b-form-text id="descriptionHelpBlock">{{$t('file_offer_placeholder')}}</b-form-text>
          <br>
          <label for="contract">{{$t('contract')}}</label>
          <b-form-textarea
            type="text"
            id="contract"
            v-model="form.contract"
            aria-describedby="descriptionHelpBlock"
            :state="this.form.contract.length > 0"
          />
          <b-form-text id="descriptionHelpBlock">{{$t('contract_offer_placeholder')}}</b-form-text>
          <br>

          <b-button class="mt-2" variant="success" block @click="createOffer">{{$t('create_offer')}}</b-button>
        </b-form>
      </b-modal>
    </div>

    <!-- Modal Pop up CreateApply -->
    <div>
      <b-modal id="createApply" hide-footer ref="newApply" size="xl" title="Create an apply">
        <b-form @submit.prevent>
          <label for="title">{{$t('title')}}</label>

          <b-input
            type="text"
            v-model="formApply.title"
            id="title"
            aria-describedby="titleHelpBlock"
          />
          <b-form-text id="titleHelpBlock">{{$t('title_offer_placeholder')}} {{$t('title_apply_feedback')}}</b-form-text>
          <b-form-invalid-feedback id="apply-tittle-feedback">{{$t('title_apply_feedback')}}</b-form-invalid-feedback>
          <br>
          <label for="description">{{$t('description')}}</label>
          <b-form-textarea
            type="text"
            id="description"
            v-model="formApply.description"
            aria-describedby="descriptionHelpBlock"
          />
          <b-form-text id="descriptionHelpBlock">{{$t('description_apply_placeholder')}} {{$t('description_apply_feedback')}}</b-form-text>
          <b-form-invalid-feedback
            id="apply-description-feedback"
          >{{$t('description_apply_feedback')}}</b-form-invalid-feedback>
          <br>
          <b-button
            class="mt-2"
            variant="success"
            block
            @click="toggleCreateApply($t('apply_offer'))"
          >{{$t('create_apply')}}</b-button>
        </b-form>
      </b-modal>
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
  computed: {
    tittleApply() {
      return this.formApply.title.length >= 5 ? true : false;
    },
    descriptionApply() {
      return this.formApply.description.length >= 10 ? true : false;
    }
  },
  data() {
    return {
      items: [],
      applications: [],
      formApply: {
        title: "",
        description: "",
        offerId: null
      },
      form: {
        title: "",
        description: "",
        price_offered: null,
        files: "",
        contract: "",
        limit_time: ""
      },
      formEdit: {
        title: "",
        description: ""
      },
      com: "",
      comName: "",
      comUsername: "",
      offerId: "",
      messages: [],
      modalShow: "false",
      user_type: this.$cookies.get("user_type"),
      itemsCargados: false,
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

    // Para los pagos
    if (this.$cookies.get("user_type") == "com") {
      if (window.location.search) {
        if (window.location.search.split("?")[1].split("&")) {
          var respuesta_paypal = window.location.search
            .split("?")[1]
            .split("&");
          var paymentId = respuesta_paypal[0].split("=")[1];
          var token_paypal = respuesta_paypal[1].split("=")[1];
          var payerID = respuesta_paypal[2].split("=")[1];
          var url_guarda_pagos = `https://api4-datame.herokuapp.com/api/v1/pagos/accept_paypal_payment/${paymentId}/${token_paypal}/${payerID}/`;
          this.$http
            .get(url_guarda_pagos, { headers: { Authorization: token } })
            .then(result => {
              // El pago se ha guardado
              //alert(result.data.message);
              this.$bvModal.msgBoxOk(this.$t('successful_payment'), {
                okTitle:this.$t('accept')
              })
              // Hago la llamada para obtener las offers con la nueva offer dentro
              var token = "JWT " + this.$cookies.get("token");
              this.$http
                .get("https://api4-datame.herokuapp.com/api/v1/offer", {
                  headers: { Authorization: token }
                })
                .then(result => {
                  this.items = result.data;
                  this.itemsCargados = true;
                });
            });
        }
      } else {
        // Hago una llamada normal para que me las de
        var token = "JWT " + this.$cookies.get("token");
        this.$http
          .get("https://api4-datame.herokuapp.com/api/v1/offer", {
            headers: { Authorization: token }
          })
          .then(result => {
            this.items = result.data;
            this.itemsCargados = true;
          });
      }
    } else {
      // Hago una llamada para que me las de siendo DS. Porque no soy company
      var token = "JWT " + this.$cookies.get("token");
      this.$http
        .get("https://api4-datame.herokuapp.com/api/v1/offer", {
          headers: { Authorization: token }
        })
        .then(result => {
          this.items = result.data;
          this.itemsCargados = true;
        });
    }

    //este es el endpoint que devuelve las applications que tiene una oferta pero tengo el mismo problema
    //que para el edit, que no consigo pasarle la oferta. offerId está vacía
    this.$http
      .get("https://api4-datame.herokuapp.com/api/v2/applicationsOfOffer/" + offerId, {
        headers: { Authorization: token }
      })
      .then(result => {
        this.applications = result.data;
      });
  },
  methods: {
    toggleCreateApply(text) {
      this.$bvModal.msgBoxConfirm(text,  {
           okTitle:this.$t('accept'),
           cancelTitle:this.$t('cancel')
         }).then(value => {
        if(value === true){
          var token = "JWT " + this.$cookies.get("token");
          const formApply = new FormData();
          if (
            this.formApply.title.length < 5 ||
            this.formApply.description.length < 10
          ) {
            this.$bvModal.msgBoxOk(this.$t("fix_errors"),  {
              okTitle:this.$t('accept')
            })
          } else {
            formApply.append("title", this.formApply.title);
            formApply.append("description", this.formApply.description);
            formApply.append("offerId", this.offerId);
            this.$http
              .post("https://api4-datame.herokuapp.com/api/v1/apply", formApply, {
                headers: { Authorization: token }
              })
              .then(result => {
                this.$bvModal.msgBoxOk(this.$t("successful_apply"), {
                  okTitle:this.$t('accept')
                })
                location.reload()
              })
            }
          }
      })
    },
    saveId: function(idOffer,title,description) {
      this.offerId = idOffer;
      this.formEdit.title = title;
      this.formEdit.description = description;
    },
    getCompany: function(companyId) {
      var token = "JWT " + this.$cookies.get("token");
      this.$http
        .get("https://api4-datame.herokuapp.com/api/v1/company?companyId=" + companyId, {
          headers: { Authorization: token }
        })
        .then(result => {
          this.com = result.data[0];
          this.comName = this.com.name;
          this.comUsername = this.com.user__username;
        });
    },
    createOffer() {
      var token = "JWT " + this.$cookies.get("token");
      const formData = new FormData();

      this.messages = [];
      if (this.form.title.length == 0) {
        this.messages.push(this.$t('title_req'));
      }
      else if (this.form.title.length < 5){
        this.messages.push(this.$t('title_min'));
      }
      if (this.form.description.length == 0) {
        this.messages.push(this.$t('description_req'));
      }
      else if (this.form.description.length < 10){
        this.messages.push(this.$t('description_min'));
      }
      if (this.form.price_offered == null) {
        this.messages.push(this.$t('price_req'));
      }
      else if (this.form.price_offered < 0) {
        this.messages.push(this.$t('price_positive'));
      }
      if (this.form.limit_time == null) {
        this.messages.push(this.$t('limit_req'));
      }
      if (this.form.files.length == null) {
        this.messages.push(this.$t('file_req'));
      }
      if (this.form.contract.length == 0) {
        this.messages.push(this.$t('contract_req'));
      }
      if (this.form.limit_time == null) {
        this.messages.push(this.$t('limit_req'));
      } else {
        var datePattern = new RegExp(
          /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/g
        );
        if (!this.form.limit_time.match(datePattern)) {
          this.messages.push(this.$t('check_pattern'));
        } else {
          let date = new Date(this.form.limit_time);
          let now = Date.now();
          if (date < now) {
            this.messages.push(this.$t('not_past'));
          }
        }
      }

      var regex = new RegExp(
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
      );
      if (!this.form.files.match(regex)) {
        this.messages.push(this.$t('not_url'));
      }

      if (this.messages.length > 0) {
        this.modalShow = true;
      } else {
        formData.append("title", this.form.title);
        formData.append("description", this.form.description);
        formData.append("price_offered", this.form.price_offered);
        formData.append("limit_time", this.form.limit_time);
        formData.append("files", this.form.files);
        formData.append("contract", this.form.contract);
        this.$http
          .post("https://api4-datame.herokuapp.com/api/v1/offer", formData, {
            headers: { Authorization: token }
          })
          .then(result => {
            // alert(result.data.message)
            var offer_created = result.data.offer_id;
            this.$http
              .get(
                `https://api4-datame.herokuapp.com/api/v1/pagos/create_papyal_payment/${offer_created}/`,
                { headers: { Authorization: token } }
              )
              .then(result => {
                window.location.href = result.data.url_pago;
              });
          });
      }
    },
    deleteOffer(id, text) {
      var token = "JWT " + this.$cookies.get("token");
       this.$bvModal.msgBoxConfirm(text,  {
           okTitle:this.$t('accept'),
           cancelTitle:this.$t('cancel')
         }).then(value => {
            if(value === true){
              this.$http
                .delete("https://api4-datame.herokuapp.com/api/v1/company/offer/" + id, {
                  headers: {
                    Authorization: token
                  }
                })
                .then(result => {
                  this.$bvModal.msgBoxOk(this.$t('successful_del_offer'),  {
                    okTitle:this.$t('accept')
                  });
                  window.location.href = "/explore.html";
                });
            }
       })
    },
    onSubmit() {
      let token = `JWT ${this.$cookies.get("token")}`;
      let search_title = this.form.search_title;
      let search_price = this.form.search_price;
      let search_date = this.form.search_date;

      if (
        (search_title == "" || search_title == undefined) &&
        (search_price == "" || search_price == undefined) &&
        (search_date == "" || search_date == undefined)
      ) {
        this.$http
          .get(`https://api4-datame.herokuapp.com/api/v1/offer`, {
            headers: { Authorization: token }
          })
          .then(result => {
            this.items = result.data;
          });
      } else {
        this.$http
          .get(
            `https://api4-datame.herokuapp.com/api/v1/offer?search_title=${
              this.form.search_title
            }&search_price=${this.form.search_price}&search_date=${
              this.form.search_date
            }`,
            { headers: { Authorization: token } }
          )
          .then(result => {
            this.items = result.data;
          });
      }
    },
    updateOffer() {
      var token = "JWT " + this.$cookies.get("token");
      this.messages = [];
      if (this.formEdit.title.length == 0) {
        this.messages.push(this.$t('title_req'));
      }
      else if (this.formEdit.title.length < 5){
        this.messages.push(this.$t('title_min'));
      }
      if (this.formEdit.description.length == 0) {
        this.messages.push(this.$t('description_req'));
      }
      else if (this.formEdit.description.length < 10){
        this.messages.push(this.$t('description_min'));
      }
      if (this.messages.length > 0) {
        this.modalShow = true;
      } else {
      const formData = new FormData();
      formData.append("title", this.formEdit.title);
      formData.append("description", this.formEdit.description);
      this.$http
        .post(
          "https://api4-datame.herokuapp.com/api/v2/change_offer/" + this.offerId,
          formData,
          { headers: { Authorization: token } }
        )
        .then(result => {
          this.items = result.data;
          this.$bvModal.msgBoxOk(this.$t('updated_offer'),  {
            okTitle:this.$t('accept')
          })
          window.location.href = "/explore.html";
        });
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

#particles-js {
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#OfferTittle{
    float:left;
}

#OfferPrice{
    float:right;
    margin-right: 2%;
}

#OfferNOfApplications{
    float:right;
    margin-right: 2%;
}

#NadaQueMostrar{
    color: blue;
    margin-top: 10%;
    text-align: center;
}

</style>
