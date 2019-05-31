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

    <!-- Create new message button -->
    <b-modal
      class="registered"
      v-model="submited"
      ref="submited"
      id="submited"
      hide-footer
      size="xl"
      title="submited"
    >
      <template slot="modal-header">{{$t('congrats')}}</template>
      {{this.message}}
      <b-button class="mt-2" variant="success" block @click="reloadPage">{{$t('close')}}</b-button>
    </b-modal>

    <div class="create-message">
      <b-button id="create-message" v-b-modal.modalxl variant="outline-info">
        <font-awesome-icon style="color:#14AABF" :icon="['fas','envelope']"/>
        {{$t('create_message')}}
        </b-button>
    </div>
    <!-- -->

    <!-- Create new notification button -->
    <div>
    <b-modal
      class="registered"
      v-model="submited_notification"
      ref="submited_notification"
      id="submited_notification"
      hide-footer
      size="xl"
      :title="$t('submited_notification')">


      <!-- If text given by server contains "wrong" will print a fail modal -->
        <div v-if="textContains()">
          <template slot="modal-header">{{$t('failed')}}</template>
          {{this.message}}
        </div>
        <!-- Otherwise it will print a congrats modal -->
        <div v-else>
          <template slot="modal-header">{{$t('congrats')}}</template>
          {{$t('notification_sent')}}
        </div>

        <b-button class="mt-2" variant="success" block @click="reloadPage">{{$t('close')}}</b-button>
    </b-modal>
    </div>

    <div v-if="user_type === 'admin'" class="create-notification">
      <b-button id="create-notification" v-b-modal.modalxl2 style="color:#b9bc0b;background-color:white;border-color:#b9bc0b;" >
        <font-awesome-icon style="color:#b9bc0b" :icon="['fas','bell']"/>
        {{$t('create_notification')}}
      </b-button>
    </div>

    <b-tooltip target="create-notification" placement="bottom">{{$t('notification_tooltip')}}</b-tooltip>

    <!-- -->


    <div id="titlepage">
      <h2>{{$t('received_messages')}}</h2>
    </div>
    <div :key="item.id" id="messages" v-for="item in items">
      <div v-if="item.isAlert">
        <b-card bg-variant="warning" border :title="item.title">
          <b-card-text>{{item.body}}</b-card-text>
          <b-card-text
            style="color:white"
            class="small text-muted"
          >{{item.moment.slice(0,10)}} {{item.moment.slice(11, 16)}}</b-card-text>
          <font-awesome-icon style="color:white" pull="right" :icon="['fas','bell']"/>
        </b-card>
      </div>

      <div v-else>
        <b-card border bg-variant="light" :title="item.title">
          <b-card-text>{{item.body}}</b-card-text>
          <b-card-text
            class="small text-muted"
          >{{item.moment.slice(0,10)}} {{item.moment.slice(11, 16)}}</b-card-text>
          <font-awesome-icon style="color:black" pull="right" :icon="['fas','comments']"/>
        </b-card>
      </div>
    </div>
    <!-- Modal for creating a new message -->
    <div>
      <b-modal id="modalxl" hide-footer ref="newMessage" size="xl" :title="$t('create_message')">
        <b-form @submit.prevent>
          <label for="title">{{$t('title')}}</label>
          <b-input
            type="text"
            v-model="form.title"
            id="title"
            :state="form.title.length > 0"
            :maxlength="100"
            aria-describedby="titleHelpBlock"
          />
          <b-form-text id="titleHelpBlock">{{$t('message_title_helpblock')}}</b-form-text>
          <br>
          <label for="body">{{$t('body')}}</label>
          <b-form-textarea
            type="text"
            id="body"
            v-model="form.body"
            :state="form.body.length > 0"
            :maxlength="1000"
            aria-describedby="bodyHelpBlock"
          />
          <b-form-text id="bodyHelpBlock">{{$t('message_body_helpblock')}}</b-form-text>
          <br>

          <label for="receiver">{{$t('search_receiver')}}</label>

          <b-input
            type="text"
            v-model="query"
            :placeholder="$t('message_receiver_placeholder')"
            v-on:keyup="changeVisibility"
          />
          <div id="options" class="options" style="display:None;">
            <hr>
            <ul>
              <li
                v-for="(match, index) in matches"
                :key="match[filterby]"
                :class="{'selected':(selected == index)}"
                @click="itemClicked(index)"
                v-text="match[filterby]"
              ></li>
            </ul>
          </div>

          <b-form-text id="receiverHelpBlock">{{$t('message_receiver_helpblock')}}</b-form-text>
          <br>

          <b-button class="mt-2" variant="success" block @click="toggleModalMessage">{{$t('message_create')}}</b-button>
        </b-form>
      </b-modal>

          <!-- Create a new notification -->
    <div>
      <b-modal id="modalxl2" hide-footer ref="newNotification" size="xl" :title="this.$t('create_notification_all')">
        <b-form @submit.prevent>
          <label for="title">{{$t('title')}}</label>
          <b-input
            type="text"
            v-model="form.title"
            id="title"
            :state="form.title.length > 0"
            :maxlength="100"
            aria-describedby="titleHelpBlock"
          />
          <b-form-text id="titleHelpBlock">{{$t('title_help')}}</b-form-text>
          <br>
          <label for="body">{{$t('body')}}</label>
          <b-form-textarea
            type="text"
            id="body"
            v-model="form.body"
            :state="form.body.length > 0"
            :maxlength="1000"
            aria-describedby="bodyHelpBlock"
          />
          <b-form-text id="bodyHelpBlock">{{$t('body_help')}}</b-form-text>
          <br>


          <b-button class="mt-2" variant="success" block @click="toggleModalNotification">{{$t("notification_button")}}</b-button>
        </b-form>
      </b-modal>
    </div>
    </div>

  <div v-if="items.length == 0">
    <p class="no_msg_alert">{{$t('nothing_to_show')}}</p>
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
      filterby: "username",
      selected: 0,
      selectedItem: null,
      visible: false,
      query: "",
      users: [],
      items: [],
      form: {
        title: "",
        body: "",
        receiver: null
      },
      messages: [],
      modalShow: false,
      submited: false,
      submited_notification: false,
      message: "",
      user_type: this.$cookies.get("user_type")
    };
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

    this.$http
      .get("https://api5-datame.herokuapp.com/api/v1/message", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.items = result.data;
      });

    this.$http
      .get("https://api5-datame.herokuapp.com/api/v1/users", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.users = result.data;
      });
  },
  methods: {
    textContains() {
      return this.message.includes('wrong')
    },
    itemClicked(index) {
      this.selected = index;
      this.selectItem();
    },
    selectItem() {
      this.selectedItem = this.matches[this.selected];
      //console.log(this.selectedItem[this.filterby]);
      const cadena = JSON.stringify(this.selectedItem[this.filterby]).replace(
        /['"]+/g,
        ""
      );
      this.form.receiver = cadena;

      console.log(this.form.receiver);
      document.getElementById("options").style.display = "none";
      this.query = this.form.receiver;
      this.visible = true;
    },
    changeVisibility() {
      if (this.query === "") {
        document.getElementById("options").style.display = "None";
      } else {
        document.getElementById("options").style.display = "";
      }
    },
    toogleVisible() {
      this.visible = !this.visible;
    },
    reloadPage() {
      window.location.reload();
    },
    toggleModalMessage() {
      var token = "JWT " + this.$cookies.get("token");

      this.messages = [];
      if (this.form.title.length < 1) {
        this.messages.push(this.$t("title_required"));
      }
      if (this.form.body.length < 1) {
        this.messages.push(this.$t("body_required"));
      }

      if (this.form.receiver == null) {
        this.messages.push(this.$t("receiver_required"));
      }

      if (this.messages.length > 0) {
        this.modalShow = true;
      } else {
        const formData = new FormData();
        formData.append("title", this.form.title);
        formData.append("body", this.form.body);
        formData.append("username", this.form.receiver);

        this.$http
          .post("https://api5-datame.herokuapp.com/api/v1/message", formData, {
            headers: { Authorization: token }
          })
          .then(result => {
            this.submited = true;
            this.message = result.data.message;
          });
      }
    },
    toggleModalNotification() {
      var token = "JWT " + this.$cookies.get("token");

      this.messages = [];
      if (this.form.title.length < 1) {
        this.messages.push(this.$t("title_required"));
      }
      if (this.form.body.length < 1) {
        this.messages.push(this.$t("body_required"));
      }
      if (this.messages.length > 0) {
        this.modalShow = true;
      } else {
        const formData = new FormData();
        formData.append("subject", this.form.title);
        formData.append("body", this.form.body);

        this.$http
          .post("https://api5-datame.herokuapp.com/api/v3/notification", formData, {
            headers: { Authorization: token }
          })
          .then(result => {
            this.submited_notification = true;
            this.message = result.data.message;
          });
      }
    }

  },
  computed: {
    matches() {
      if (this.query == "") {
        return [];
      }

      return this.users.filter(user =>
        user[this.filterby].toLowerCase().includes(this.query.toLowerCase())
      );
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

#messages {
  margin: 2em;
}

#titlepage {
  margin: 2em;
}

.create-message {
  text-align: right;
}
#create-message {
  margin-top: 2em;
  margin-right: 2em;
}

.create-notification {
  text-align: right;
}
#create-notification {
  margin-top: 2em;
  margin-right: 2em;
}

html {
  background-color: #ffffff;
}

.autocomplete {
  width: 100%;
  position: relative;
}

.input {
  border-radius: 3px;
  border: 2px solid lightgray;
  box-shadow: 0 0 10pc #eceaea;
  padding-left: 10px;
  padding-top: 13px;
  padding-bottom: 13px;
  cursor: text;
}

.popover {
  min-height: 50px;
  border: 2px solid lightgray;
  position: relative;
  top: 46px;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 3px;
  text-align: center;
}

.popover input {
  width: 95%;
  margin-top: 5px;
  height: 40px;
  font-size: 15px;
  border-radius: 3px;
  border: 1px solid lightgray;
  padding-left: 8px;
}

.options {
  max-height: 150px;
  overflow-y: scroll;
  margin-top: 5px;
}

.options ul {
  list-style-type: none;
  text-align: left;
  padding-left: 0;
}

.options ul li {
  border-bottom: 1px solid lightgray;
  padding: 10px;
  cursor: pointer;
  background: #f1f1f1;
}

.options ul li.selected {
  background: #58bd4c;
  color: #fff;
  font-weight: 600;
}

#particles-js {
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.no_msg_alert {
  color: gray;
  text-align: center;
}
</style>
