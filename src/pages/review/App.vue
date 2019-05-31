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
      <b-form @submit.prevent>
        <label for="type">{{$t('score')}}</label>
        <br>
        <b-form-input type="number" id="score" v-model="reviewForm.score" max="5"/>
        <label for="type">{{$t('comments')}}</label>
        <br>
        <b-form-textarea type="text" id="comments" v-model="reviewForm.comments"/>
        <b-button
          type="submit"
          class="mt-2"
          variant="success"
          block
          @click="createReview()"
        >{{$t('save_changes')}}</b-button>
      </b-form>
    </b-modal>

    <!-- Show submitions -->
    <div v-bind:key="item.id" id="applications" v-for="(item, index) in items">
      <b-card no-body>
        <b-card-header header-tag="header" class="p-3" role="tab">
          <b-button
            block
            v-b-toggle="'accordion-' + index"
            variant="outline-primary"
            @click="prepareReviewPopup(item.dataScientist_id)"
          >{{$t('submition_to')}} </b-button>
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
              <span class="font-weight-bold">{{$t('file')}}:</span>
              {{item.file}}
            </b-card-text>
            <b-button
              v-if="item.status != 'SU' && canDoAReview == true"
              class="mt-2"
              variant="success"
              block
              @click="reviewPopup = true"
            >{{$t('make_review_ds')}}</b-button>

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
                @click="changeStatus(item.id)"
              >{{$t('change_status')}}</b-button>
            </b-form>
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
      selected: "Accepted",
      reviewPopup: false,
      reviewForm: {
        reviewedId: "",
        comments: "",
        score: "5"
      },
      canDoAReview: true
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
    prepareReviewPopup(id) {
      if (this.user_type == "com") {
        this.reviewForm.reviewedId = id;
      } else {
        this.reviewForm.reviewedId = id;
      }
      for (var user in this.usersReviewed) {
        if (user == id) {
          this.canDoAReview = false;
          break;
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
          this.message = this.$t('success_new_review');
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

      if (this.selected == "Accepted") {
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
          this.message = this.$t('success_changed')
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
</style>
