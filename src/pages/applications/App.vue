<template>
  <div id="app">
    <Navbar/>
    <b-modal v-model="modalShow" ref="messages" id="messages" hide-footer size="xl" title="Erros">
      <template slot="modal-header">{{$t('error_msg')}}</template>
      <li :key="message.id" id="messagesError" v-for="message in this.messages">{{message}}</li>
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
      class="registered"
      v-model="submited"
      ref="submited"
      id="submited"
      hide-footer
      size="xl"
      :title="this.$t('create_review')"
    >
      <template slot="modal-header">{{$t('congrats')}}</template>
      {{$t('submited_success')}}
      <b-button class="mt-2" variant="success" block @click="reloadPage">{{$t('close')}}</b-button>
    </b-modal>

    <!-- Show applications -->

    <div id="applications">
      <Apply
        v-on:clicked="onClickChild"
        v-on:clicked2="onClickChild2"
        v-for="(item, index) in items"
        v-bind:item="item"
        v-bind:isCompany="isCompany"
        v-bind:index="index"
        v-bind:key="item.id"
      ></Apply>
    </div>
    <!-- Empty items -->
    <div v-if="itemsCargados == true && (items == none || items.length == 0)">
       <h2 id="NadaQueMostrar"> {{$t('nothing_to_show')}} </h2>
    </div>

    <b-modal id="modalxl" hide-footer ref="newOffer" size="xl" :title="$t('create_offer')">
      <b-form @submit.prevent>
        <label for="title">{{$t('file')}}</label>
        <b-input
          type="text"
          v-model="submitForm.file"
          id="file"
          :state="(new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).test(submitForm.file))"
          :maxlength="200"
          aria-describedby="fileHelpBlock"
        />
        <b-form-text id="titleHelpBlock">{{$t('solution_input_placeholder')}}</b-form-text>
        <br>

        <label for="comments">{{$t('comments')}}</label>
        <b-form-textarea
          type="text"
          id="comments"
          v-model="submitForm.comments"
          :state="submitForm.comments.length > 0"
          aria-describedby="commentsHelpBlock"
        />
        <b-form-text id="commentsHelpBlock">{{$t('comment_input_placeholder')}}</b-form-text>
        <br>
        <b-button class="mt-2" variant="success" block @click="createSubmit">{{$t('submit')}}</b-button>
      </b-form>
    </b-modal>

        <advertisement/>


    <!-- Modal Pop up showDataScientist -->
    <div>
      <b-modal
        id="showDataScientist"
        hide-footer
        ref="detailedDataScientist"
        size="xl"
        :title="$t('datascientistdetails')"
      >
        <div id="info">
          <b-card-text class="card-text">
            <label for="username">{{$t('username')}}:</label>
            {{this.username}}
          </b-card-text>
          <b-card-text class="card-text">
            <label for="name">{{$t('name')}}:</label>
            {{this.name}}
          </b-card-text>
          <b-card-text class="card-text">
            <label for="surname">{{$t('surname')}}:</label>
            {{this.surname}}
          </b-card-text>
          <b-card-text class="card-text">
            <label for="phone">{{$t('phone')}}:</label>
            {{this.phone}}
          </b-card-text>
          <b-card-text class="card-text">
            <label for="email">{{$t('email')}}:</label>
            {{this.email}}
          </b-card-text>
          <b-card-text class="card-text">
            <label for="address">{{$t('address')}}:</label>
            {{this.address}}
          </b-card-text>
        </div>
        <hr/>
        <div id="cv_items_5" v-for="cvitem in dss">
          <h4>{{cvitem.Section}}</h4>
          <div id="cv_items_sub" v-for="item2 in cvitem.Items">
            <b-card :title="item2.name" :sub-title="item2.description">
              <b-card-text>{{item2.date_start}} - {{item2.date_finish}}</b-card-text>
            </b-card>
          </div>
        </div>
      </b-modal>
    </div>

  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import Apply from "../../components/Apply/LoadApply.vue";
import Advertisement from "../../components/Advertisement.vue";

export default {
  name: "app",
  components: {
    Navbar,
    Footer,
    Apply,
    Advertisement
  },
  data() {
    return {
      items: [],
      form: {
        title: "",
        description: "",
        status: "",
        date: null
      },
      submitForm: {
        comments: "",
        file: ""
      },
      user: "",
      name: "",
      username: "",
      surname: "",
      email: "",
      phone: "",
      photo: "",
      address: "",
      dsId: "",
      dss: [],
      idDataScientist: "",
      isCompany: null,
      idOffer: "",
      messages: [],
      modalShow: false,
      submited: false,
      user_type: this.$cookies.get("user_type"),
      offertodl: [],
      url: "",
      itemsCargados: false,
    };
  },
  computed: {},
  mounted: function() {
    var lang;

    if (this.$cookies.get("lang")) {
      lang = this.$cookies.get("lang");
    } else {
      lang = "en";
    }
    this.$i18n.locale = lang;

    var token = "JWT " + this.$cookies.get("token");
    if (this.$cookies.get("user_type") == "com") {
      this.isCompany = true;
    } else {
      this.isCompany = false;
    }

    this.$http
      .get("https://api5-datame.herokuapp.com/api/v1/apply", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.items = result.data;
        this.itemsCargados = true;
      });
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
    onClickChild(value) {
      this.idOffer = value;
    },
    onClickChild2(value) {
      this.idDataScientist = value;
      var token = "JWT " + this.$cookies.get("token");
      this.$http
        .get(
          "https://api5-datame.herokuapp.com/api/v1/dataScientist?dataScientistId=" +
            this.idDataScientist,
          {
            headers: { Authorization: token }
          }
        )
        .then(result => {
          this.user = result.data[0]
          this.name = this.user.name;
          this.surname = this.user.surname;
          this.email = this.user.user__email;
          this.phone = this.user.phone;
          this.photo = this.user.photo;
          this.address = this.user.address;
          this.username = this.user.user__username;
        });
      this.$http
        .get(
          "https://api5-datame.herokuapp.com/api/v1/cv?dataScientistId=" +
            this.idDataScientist,
          { headers: { Authorization: token } }
        )
        .then(result => {
          this.dss = result.data;
        });
    },
    createSubmit() {
      var token = "JWT " + this.$cookies.get("token");
      const formData = new FormData();
      this.messages = [];
      var regex = new RegExp(
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
      );
      if (!this.submitForm.file.match(regex)) {
        var error_message_1 = this.$t('not_url')
        this.messages.push(error_message_1);
      }

      if (!this.submitForm.comments > 0) {
        var error_message_2 = this.$t('comments_req')
        this.messages.push(error_message_2);
      }

      if (this.messages.length > 0) {
        this.modalShow = true;
      } else {
        formData.append("comments", this.submitForm.comments);
        formData.append("file", this.submitForm.file);
        formData.append("offerId", this.idOffer);
        this.$http
          .post("https://api5-datame.herokuapp.com/api/v1/submit", formData, {
            headers: { Authorization: token }
          })
          .then(result => {
            this.submited = true;
          });
      }
    }
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

#applications {
  margin: 2em;
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

#NadaQueMostrar{
    color: blue;
    margin-top: 10%;
    text-align: center;
}
</style>
