<template>
  <div id="app">
    <Navbar/>
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
      {{$t('submited_success')}}
      <b-button class="mt-2" variant="success" block @click="reloadPage">{{$t('close')}}</b-button>
    </b-modal>

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

    <div v-bind:key="item.id" id="company" v-for="item in items">
      <b-card :title="item.name" :sub-title="item.nif ">
        <b-card-text>{{item.description}}</b-card-text>
        <b-img
          style="width: 200px; height:200px;"
          v-bind:src="item.logo"
          :alt="$t('company_logo_alt')"
        ></b-img>

        <div>
          <b-button
            v-if="isCompany"
            class="button"
            variant="success"
            block
            @click="toggleEditProfile"
            v-b-modal.EditProfile
          >{{$t("edit")}}</b-button>

          <b-button
            v-if="isCompany"
            class="button"
            variant="primary"
            block
            v-b-modal.export
          >{{$t("export")}}</b-button>
        </div>
      </b-card>
    </div>

    <b-modal
      id="EditProfile"
      v-if="!ViewEdit"
      ok-disabled
      hide-footer="true"
      centered
      :title="$t('modal_edit_profile')"
    >
      <!-- Editing company info -->
      <div id="info">
        <b-form @submit.prevent>
          <b-card-text class="card-text">
            <label for="name">{{$t('name')}}</label>
            <b-input
              type="text"
              v-model="form.name"
              id="name"
              :state="form.name.length > 0"
              :maxlength="200"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="description">{{$t('description')}}</label>
            <b-form-textarea
              type="text"
              v-model="form.description"
              id="description"
              :state="form.description.length > 0"
              :maxlength="50"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="logo">{{$t('logo')}}</label>
            <b-input
              type="url"
              v-model="form.logo"
              id="logo"
              aria-describedby="fileHelpBlock"
              :state="(new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).test(form.logo))"
            />
          </b-card-text>
          <b-button class="mt-1" variant="success" block @click="saveProfile">{{$t('save_changes')}}</b-button>
        </b-form>
      </div>
    </b-modal>
    <deleteMeButton/>

    <b-modal id="export" ok-disabled hide-footer="true" centered :title="$t('export')">
      <b-button
        style="float:right"
        class="mt-1"
        variant="info"
        @click="exportasPDF(items)"
      >{{$t('exportpdf')}}</b-button>

      <b-button
        style="float:right; margin:10px"
        class="mt-1"
        variant="info"
        @click="exportasRAW(items)"
      >{{$t('exportraw')}}</b-button>
    </b-modal>

  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import DeleteMeButton from "../../components/Users/DeleteMeButton.vue";
import jsPDF from "jspdf";

export default {
  name: "app",
  components: {
    Navbar,
    Footer,
    DeleteMeButton
  },
  data() {
    return {
      items: [],
      ViewEdit: true,
      isCompany: this.$cookies.get("user_type") === "com",
      form: {
        name: "",
        description: "",
        logo: ""
      },
      language: this.$cookies.get("lang"),
      submited: false,
      messages: [],
      updatedMessage: "",
      modalShow: false,
      submited: false
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
      .get("https://api5-datame.herokuapp.com/api/v1/company", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.items = result.data;
      });

    this.$http
      .get("https://api5-datame.herokuapp.com/api/v2/get_user_logged", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.user = result.data[0];
        this.form.name = this.user.name;
        this.form.description = this.user.description;
        this.form.logo = this.user.logo;
      });
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
    toggleEditProfile() {
      this.ViewEdit = false;
    },
    saveProfile() {
      var token = "JWT " + this.$cookies.get("token");
      const formData = new FormData();
      this.messages = [];
      if (this.form.name.length == 0) {
        var error_message_1 = this.$t('name_req')
        this.messages.push(error_message_1);
      }
      if (this.form.description.length == 0) {
        var error_message_2 = this.$t('description_req')
        this.messages.push(error_message_2);
      }
      var regex = new RegExp(
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
      );
      if (!this.form.logo.match(regex)) {
        var error_message_3 = this.$t('not_url')
        this.messages.push(error_message_3);
      }

      if (this.messages.length > 0) {
        this.modalShow = true;
      } else {
        formData.append("name", this.form.name);
        formData.append("description", this.form.description);
        formData.append("logo", this.form.logo);
        this.$http
          .post("https://api5-datame.herokuapp.com/api/v2/change_info", formData, {
            headers: { Authorization: token }
          })
          .then(result => {
            this.ViewEdit = true;
            this.updatedMessage = result.data.message;
            this.submited = true;
          });
      }
    },
    exportasPDF(items) {
      if (this.language == "en") {
        var text =
          "This will download files to your computer. Are you sure?";
      } else {
        var text =
          "Esta acción descargará archivos en tu terminal. ¿Estas seguro?";
      }


      this.$bvModal.msgBoxConfirm(text,  {
           okTitle:this.$t('accept'),
           cancelTitle:this.$t('cancel')
        }).then(value => {
        if(value === true){
          let pdfName = items[0].name;

          var doc = new jsPDF("p", "mm", "a4");

          // Adding name of the copany

          doc.setFontSize(20);

          doc.text(items[0].name.toUpperCase(), 10, 10);

          // Adding description of the company

          doc.setFontSize(14);

          var lMargin = 15;
          var rMargin = 15;
          var pdfInMM = 210;

          var description = items[0].description;

          var lines = doc.splitTextToSize(
            description,
            pdfInMM - lMargin - rMargin
          );

          doc.text(lMargin, 20, lines);

          // Adding NIF of the company

          doc.text("NIF: " + items[0].nif, 10, 50);

          // Adding logo

          doc.setFontSize(10);

          var logo = items[0].logo;

          var lines = doc.splitTextToSize(logo, pdfInMM - lMargin - rMargin);

          doc.text(lMargin, 60, logo);

          // Saving PDF
          doc.save(pdfName + ".pdf");
      }
      })
    },
    exportasRAW(items) {
      if (this.language == "en") {
        var text =
          "This will download files to your computer. Are you sure?";
      } else {
        var text =
          "Esta acción descargará archivos en tu terminal. ¿Estas seguro?";
      }
      

      this.$bvModal.msgBoxConfirm(text, {
           okTitle:this.$t('accept'),
           cancelTitle:this.$t('cancel')
        }).then(value => {
        if(value === true){
        var text =
          "{name:" +
          items[0].name +
          ",description:" +
          items[0].description +
          ",nif:" +
          items[0].nif +
          ",ĺogo" +
          items[0].logo +
          "}";

        var blob = new Blob([JSON.stringify(text)], { type: "text/plain" });

        var e = document.createEvent("MouseEvents"),
          a = document.createElement("a");
        a.download = "Data";
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ["text/plain", a.download, a.href].join(":");
        e.initEvent(
          "click",
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
        a.dispatchEvent(e);
        }
      })
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

#particles-js {
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#company {
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
</style>
