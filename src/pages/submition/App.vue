<template>
  <div id="app">
    <Navbar/>

    <br>

    <b-modal
      class="registered"
      v-model="submited"
      ref="submited"
      id="submited"
      hide-footer
      size="xl"
      title="submited"
    >
      <template slot="modal-header">{{this.message}}</template>
      <b-button
        v-if="message.length"
        class="mt-2"
        variant="outline-info"
        block
        @click="reloadPage"
      >{{$t('close')}}</b-button>
    </b-modal>

    <b-modal
      class="registered"
      v-model="reviewPopup"
      ref="reviewMopup"
      id="reviewMopup"
      hide-footer
      size="xl"
      title="submited"
    >
      <b-form @submit.prevent @submit="createReview">
        <label for="type">{{$t('score')}}</label>
        <br>
        <b-form-input type="number" id="score" v-model="reviewForm.score" max="5" min="0" required/>
        <label for="type">{{$t('comments')}}</label>
        <br>
        <b-form-textarea type="text" id="comments" v-model="reviewForm.comments"/>
        <b-button
          type="submit"
          class="mt-2"
          variant="success"
          block
        >{{$t('save_changes')}}</b-button>
      </b-form>
    </b-modal>

    <advertisement/>

    <!-- Show submitions -->
    <div v-bind:key="item.id" id="applications" v-for="(item, index) in items">
      <b-card no-body>
        <b-card-header header-tag="header" class="p-3" role="tab">
          <b-button
            block
            v-b-toggle="'accordion-' + index"
            variant="outline-primary"
            @click="prepareReviewPopup(item.dataScientist__user_id, item.offer__company__user_id)"
          >{{$t('submition_to')}} "{{item.offer__title}}"</b-button>
        </b-card-header>
        <b-collapse :id="'accordion-'+index" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <span class="font-weight-bold">{{$t('comments')}}:</span>
              {{item.comments}}
            </b-card-text>
            <b-card-text>
              <span class="font-weight-bold">{{$t('state')}}:</span>
              {{item.status}}
            </b-card-text>
            <b-card-text>
              <span class="font-weight-bold">{{$t('file')}}: </span>
              <a :href="item.file" target="_blank">{{item.file}}</a>
            </b-card-text>
            <b-button
              v-if="item.status != 'SU' && canDoAReview == true && user_type =='com' "
              class="mt-2"
              variant="success"
              block
              @click="reviewPopup = true"
            >{{$t('make_review_ds')}}</b-button>

            <b-button
              v-if="item.status != 'SU' && canDoAReview == true && user_type =='ds' "
              class="mt-2"
              variant="success"
              block
              @click="reviewPopup = true"
            >{{$t('make_review_com')}}</b-button>

            <b-form v-if="user_type == 'com' && item.status == 'SU'" @submit.prevent>
              <label for="type">{{$t('change_status')}}</label>
              <br>
              <select v-model="selected">
                <option>{{$t('accepted')}}</option>
                <option>{{$t('rejected')}}</option>
              </select>
              <b-button
                type="submit"
                class="mt-2"
                variant="success"
                block
                :disabled="selected != $t('accepted') && selected != $t('rejected') "
                @click="changeStatus(item.id)"
              >{{$t('change_status')}}</b-button>
            </b-form>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
        <!-- Empty items -->
    <div v-if="itemsCargados == true && (items == none || items.length == 0)">
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
  computed: {},
  data() {
    return {
      items: [],
      usersReviewed: [],
      url: "",
      messages: [],
      modalShow: "false",
      user_type: this.$cookies.get("user_type"),
      submited: false,
      message: "",
      selected: this.$t('accepted'),
      reviewPopup: false,
      reviewForm: {
        reviewedId: "",
        comments: "",
        score: "5"
      },
      canDoAReview: true,
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
    var lang;

    if (this.$cookies.get("lang")) {
      lang = this.$cookies.get("lang");
    } else {
      lang = "en";
    }
    this.$i18n.locale = lang;

    this.$http
      .get("https://api5-datame.herokuapp.com/api/v1/submit", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.items = result.data;
        this.itemsCargados = true;
      });

    this.$http
      .get("https://api5-datame.herokuapp.com/api/v3/data/get_user_reviews", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.usersReviewed = result.data;
      });
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
    prepareReviewPopup(idDs, idCom) {
      this.canDoAReview = true;
      if (this.user_type == "com") {
        this.reviewForm.reviewedId = idDs;
        for (var i = 0; i < this.usersReviewed.length; i++) {
          if (this.usersReviewed[i].reviewed_id == idDs) {
            this.canDoAReview = false;
            break;
          }
        }
      } else {
        this.reviewForm.reviewedId = idCom;
        for (var i = 0; i < this.usersReviewed.length; i++) {
          if (this.usersReviewed[i].reviewed_id == idCom) {
            this.canDoAReview = false;
            break;
          }
        }
      }
    },
    createReview() {
      this.errorMessage = "";
      this.message = "";
      var token = "JWT " + this.$cookies.get("token");
      const formData = new FormData();
      formData.append("score", this.reviewForm.score);
      formData.append("comments", this.reviewForm.comments);
      formData.append("reviewedId", this.reviewForm.reviewedId);
      this.$http
        .post("https://api5-datame.herokuapp.com/api/v3/data/create_review", formData, {
          headers: { Authorization: token }
        })
        .then(result => {
          this.message = result.data.message;
          this.submited = true;
        });
    },
    forceFileDownload(response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.csv"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    downloadWithVueResource(url) {
      this.$http({
        method: "get",
        url: "",
        responseType: "arraybuffer"
      })
        .then(response => {
          this.forceFileDownload(response);
        })
        .catch(e => this.$bvModal.msgBoxOk(this.$t('failed'),  {
          okTitle:this.$t('accept')
        }));
    },
    changeStatus(id) {
      this.errorMessage = "";
      this.message = "";
      var token = "JWT " + this.$cookies.get("token");
      const formData = new FormData();

      if (this.selected == this.$t('accepted')) {
        formData.append("status", "AC");
      } else {
        formData.append("status", "RE");
      }
      formData.append("submitId", id);
      this.$http
        .post("https://api5-datame.herokuapp.com/api/v1/change_status", formData, {
          headers: { Authorization: token }
        })
        .then(result => {
          this.message = result.data.message;
          this.submited = true;
        });
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

#NadaQueMostrar{
    color: blue;
    margin-top: 10%;
    text-align: center;
}

</style>
