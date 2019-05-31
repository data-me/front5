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
      title="submited">

      <template slot="modal-header">Info:</template>
      {{updatedMessage}}
      <b-button class="mt-2" variant="success" block @click="moreFunctions">{{$t('close')}}</b-button>

    </b-modal>

    <b-modal v-model="modalShow" ref="messages" id="messages" hide-footer size="xl" title="Erros">
      <template slot="modal-header">{{$t('error_msg')}}</template>
      <li v-bind:key="message.id" id="messagesError" v-for="message in this.messages">{{message}}</li>
      <template slot="modal-footer">
        <button class="btn btn-primary">{{$t('save_changes')}}</button>
      </template>
      <b-button class="mt-3" variant="outline-danger" block @click="modalShow = false">{{$t('close')}}</b-button>
    </b-modal>

    <div id="profile" v-if="ViewEdit">
      <img :src="this.form.photo" class="profileImage" >
      <div id="info">
        <b-card-text class="card-text">
          <label for="name">{{$t('name')}}:</label>
          {{this.form.name}}
        </b-card-text>
        <b-card-text class="card-text">
          <label for="surname">{{$t('surname')}}:</label>
          {{this.form.surname}}
        </b-card-text>
        <b-card-text class="card-text">
          <label for="phone">{{$t('phone')}}:</label>
          {{this.form.phone}}
        </b-card-text>
        <b-card-text class="card-text">
          <label for="email">{{$t('email')}}:</label>
          {{this.form.email}}
        </b-card-text>
        <b-card-text class="card-text">
          <label for="address">{{$t('address')}}:</label>
          {{this.form.address}}
        </b-card-text>
        <b-button class="mt-1" variant="success" block @click="toffleEditProfile">{{$t('edit')}}</b-button>
        <b-button
          class="mt-1"
          variant="success"
          block
          v-b-modal.new-new-section
         :disabled="section_names_is_empty"
        >{{$t("add_section")}}</b-button>
        <b-button class="mt-1" variant="primary" block v-b-modal.export>{{$t('export')}}</b-button>
      </div>
    </div>

    <div id="EditProfile" v-if="!ViewEdit">
      <img :src="this.form.photo" class="profileImage">

      <div id="info">
        <b-form @submit.prevent>
          <b-card-text class="card-text">
            <label for="name">{{$t('name')}}:</label>
            <b-input
              type="text"
              v-model="form.name"
              id="name"
              :state="this.form.name.length > 0"
              :maxlength="200"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="surname">{{$t('surname')}}:</label>
            <b-input
              type="text"
              v-model="form.surname"
              id="surname"
              :state="this.form.surname.length > 0"
              :maxlength="200"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="phone">{{$t('phone')}}:</label>
            <b-input
              type="text"
              v-model="form.phone"
              id="phone"
              :maxlength="9"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="email">{{$t('email')}}:</label>
            <b-input
              type="text"
              v-model="form.email"
              id="email"
              :state="this.form.email.length > 0"
              :maxlength="100"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="address">{{$t('address')}}:</label>
            <b-input
              type="text"
              v-model="form.address"
              id="address"
              :state="this.form.address.length > 0"
              :maxlength="200"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="address">{{$t('photo')}}:</label>
            <b-input
              type="text"
              v-model="form.photo"
              id="photo"
              :state="this.form.photo.length > 0"
              :maxlength="200"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-button class="mt-1" variant="success" block @click="saveProfile">Save</b-button>
        </b-form>
      </div>
    </div>

    <br/>
    <hr/>

    <div v-bind:key="item.id" id="cv_items" v-for="item in items">
      <div class="cv_item_title">
          <h2 class="section-title">{{item.Section}}</h2>
            <b-button
              size="sm"
              variant="danger"
              class="mt-2 delete_button"
              @click="deleteSection(item.Section_Id, $t('confirm_delete_section'))"
            >{{$t('delete_section')}}</b-button>
      </div>
      <p></p>
      <div v-bind:key="item2.id" id="cv_items_sub" v-for="item2 in item.Items">
        <b-card :title="item2.name" :sub-title="item2.description">
          <b-card-text>{{item2.entity}}</b-card-text>
          <b-card-text>{{$t('date_start')}}: {{item2.date_start}}</b-card-text>
          <b-card-text>{{$t('date_finish')}}: {{item2.date_finish}}</b-card-text>
          <div style="float: right;" id="deleteoffer">
            <div style="float: left; margin-right: 10px">
              <b-button
                variant="success"
                class="mt-2"
                block
                @click="saveIds(item2)"
                v-b-modal.edit-wryyyy
              >{{$t('edit_item')}}</b-button>
            </div>
            <div style="float: right;">
              <b-button
                variant="danger"
                class="mt-2"
                block
                @click="deleteItem(item2.id, $t('confirm_delete_item'))"
              >{{$t('delete_item')}}</b-button>
            </div>
          </div>
        </b-card>
      </div>
      <div id="create_item_section">
        <CreateItemSection :secid="item.Section_Id"></CreateItemSection>
      </div>
    </div>

    <advertisement/>

    <b-modal id="edit-wryyyy" hide-footer centered :title="$t('edit_item')">
      <div id="formDiobrando">
        <b-form @submit.prevent>
          <b-card-text class="card-text">
            <label for="name">{{$t('name')}}:</label>
            <b-input
              type="text"
              v-model="formDiobrando.name"
              id="name"
              :state="this.formDiobrando.name.length > 0"
              :maxlength="200"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="description">{{$t('description')}}:</label>
            <b-form-textarea
              type="text"
              v-model="formDiobrando.description"
              id="description"
              :state="this.formDiobrando.description.length > 0"
              :maxlength="500"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="entity">{{$t('entity')}}:</label>
            <b-input
              type="text"
              v-model="formDiobrando.entity"
              id="entity"
              :state="this.formDiobrando.entity.length > 0"
              :maxlength="200"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="date_start">{{$t('date_start')}}:</label>
            <b-input
              type="text"
              v-model="formDiobrando.date_start"
              id="date_start"
              :state="this.formDiobrando.date_start.length > 0 && new Date(this.formDiobrando.date_start) < new Date() && (this.formDiobrando.date_finish.length == 0 || (this.formDiobrando.date_finish.length != 0 && new Date(this.formDiobrando.date_finish) > new Date(this.formDiobrando.date_start))) "
              :maxlength="200"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>
          <b-card-text class="card-text">
            <label for="date_finish">{{$t('date_finish')}}:</label>
            <b-input
              type="text"
              v-model="formDiobrando.date_finish"
              :state="this.formDiobrando.date_start.length == 0 || (new Date(this.formDiobrando.date_finish) < new Date() && (new Date(this.formDiobrando.date_finish) > new Date(this.formDiobrando.date_start))) "

              id="date_finish"
              :maxlength="200"
              aria-describedby="fileHelpBlock"
            />
          </b-card-text>

          <b-button
            class="mt-1"
            variant="success"
            block
            @click="saveItem"
            v-b-modal.errrrrors
          >{{$t('save')}}</b-button>
        </b-form>
      </div>
    </b-modal>

    <b-modal
      v-if="messages.length > 0"
      id="errrrrors"
      hide-footer="true"
      centered
      :title="$t('errors')"
    >
      <template>
        {{$t('check_errors')}}
        <li
          variant="danger"
          v-bind:key="message.id"
          id="messagesError"
          v-for="message in this.messages"
        >{{message}}</li>
      </template>
    </b-modal>

    <b-modal id="new-new-section" hide-footer="true" centered :title="$t('add_section')">
      <div id="create_section">
        <create-section></create-section>
      </div>
    </b-modal>
    <deleteMeButton/>

    <b-modal id="export" ok-disabled hide-footer="true" centered :title="$t('export')">
      <b-button
        style="float:right"
        class="mt-1"
        variant="info"
        @click="exportasPDF(user)"
      >{{$t('exportpdf')}}</b-button>

      <b-button
        style="float:right; margin:10px"
        class="mt-1"
        variant="info"
        @click="exportasRAW(user)"
      >{{$t('exportraw')}}</b-button>
    </b-modal>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import CreateItemSection from "../../components/Curriculum/CreateItemSection.vue";
import CreateSection from "../../components/Curriculum/CreateSection.vue";
import DeleteMeButton from "../../components/Users/DeleteMeButton.vue";
import jsPDF from "jspdf";
import Advertisement from "../../components/Advertisement.vue";

export default {
  name: "app",
  components: {
    Navbar,
    Footer,
    CreateItemSection,
    CreateSection,
    DeleteMeButton,
    Advertisement
  },
  data() {
    return {
      items: [],
      user: "",
      ViewEdit: true,
      form: {
        name: "",
        surname: "",
        email: "",
        phone: "",
        photo: "",
        address: ""
      },
      formDiobrando: {
        itemid: "",
        secid: "",
        name: "",
        description: "",
        entity: "",
        date_start: "",
        date_finish: ""
      },
      submited: false,
      messages: [],
      updatedMessage: "",
      language: this.$cookies.get("lang"),
      modalShow: false,
      section_names: [],
    };
  },
  computed: {
    section_names_is_empty: function() {
      return this.section_names == undefined || this.section_names.length <= 0;
    }
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

    this.$http.get("https://api5-datame.herokuapp.com/api/v2/get_user_logged", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.user = result.data[0];
        this.form.name = this.user.name;
        this.form.surname = this.user.surname;
        this.form.email = this.user.user__email;
        this.form.phone = this.user.phone;
        this.form.photo = this.user.photo;
        this.form.address = this.user.address;
      });

    this.$http.get('https://api5-datame.herokuapp.com/api/v3/section_names_available',{ headers:
    { Authorization: token }
    }).then(result => {
        this.section_names = result.data;
      });


    this.$http
      .get("https://api5-datame.herokuapp.com/api/v1/cv", {
        headers: { Authorization: token }
      })
      .then(result => {
        this.items = result.data;
      });
  },
  watch: {
    name: function(value) {
      this.form.name = value;
    }
  },
  methods: {
    toffleEditProfile() {
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
      if (this.form.surname.length == 0) {
        var error_message_2 = this.$t('surname_req')
        this.messages.push(error_message_2);
      }

      if (this.form.email.length == 0) {
        var error_message_3 = this.$t('email_req')
        this.messages.push(error_message_3);
      }
      var regex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g);
      if (!this.form.phone.match(regex)) {
        var error_message_4 = this.$t('phone_req')
        this.messages.push(error_message_4);
      }

      if (this.form.address.length == 0) {
        var error_message_5 = this.$t('address_req')
        this.messages.push(error_message_5);
      }
      if (this.messages.length > 0) {
        this.modalShow = true;
      } else {
        formData.append("name", this.form.name);
        formData.append("surname", this.form.surname);
        formData.append("email", this.form.email);
        formData.append("phone", this.form.phone);
        formData.append("photo", this.form.photo);
        formData.append("address", this.form.address);
        this.$http
          .post("https://api5-datame.herokuapp.com/api/v2/change_info", formData, {
            headers: { Authorization: token }
          })
          .then(result => {
            this.ViewEdit = true;
            this.updatedMessage = this.$t('success_profile');
            this.submited = true;
          });
      }
    },
    saveItem() {
      var token = "JWT " + this.$cookies.get("token");
      const formData = new FormData();
      this.messages = [];
      var now = new Date();
      var dateStart = new Date(this.formDiobrando.date_start)
      if (this.formDiobrando.name.length == 0) {
        if (this.language == "en") {
          this.messages.push("Name is required");
        } else {
          this.messages.push("El nombre es requerido");
        }
      }
      if (this.formDiobrando.description.length == 0) {
        if (this.language == "en") {
          this.messages.push("Description is required");
        } else {
          this.messages.push("La descripción es requerida");
        }
      }
      if (this.formDiobrando.entity.length == 0) {
        if (this.language == "en") {
          this.messages.push("Entity is required");
        } else {
          this.messages.push("La entidad es requerida");
        }
      }
      if (this.formDiobrando.date_start.length == 0) {
        if (this.language == "en") {
          this.messages.push("Starting date is required");
        } else {
          this.messages.push("la fecha de inicio es requerida");
        }
      }
      if (this.formDiobrando.date_finish.length != 0) {
          var dateEnd = new Date(this.formDiobrando.date_finish)
        if (dateEnd > now){
             if (this.language == "en") {
          this.messages.push("The finish date must be past");
        } else {
          this.messages.push("la fecha de fin debe de ser en pasado");
        }
        }

        if (dateEnd < dateStart){
             if (this.language == "en") {
          this.messages.push("The finish date must be after start date");
        } else {
          this.messages.push("la fecha de fin debe de ser despues de la fecha de inicio");
        }
        }

      }

        if (dateStart > now){
             if (this.language == "en") {
          this.messages.push("Starting date must be past");
        } else {
          this.messages.push("la fecha de inicio debe de ser en pasado");
        }
        }
      if (!/^\d{4}[-]\d{2}[-]\d{2}/.test(this.formDiobrando.date_start)) {
        if (this.language == "en") {
          this.messages.push(
            "Starting date is does not follow the pattern yyyy-MM-dd HH:mm"
          );
        } else {
          this.messages.push(
            "la fecha de inicio no sigue el patrón yyyy-MM-dd HH:mm"
          );
        }
      }
      if (this.messages.length <= 0) {
        formData.append("name", this.formDiobrando.name);
        formData.append("description", this.formDiobrando.description);
        formData.append("entity", this.formDiobrando.entity);
        formData.append("datestart", this.formDiobrando.date_start);
        if(this.formDiobrando.date_finish.length == 0){
        }
        formData.append("datefinish", this.formDiobrando.date_finish);
        formData.append("secid", this.formDiobrando.secid);
        formData.append("itemid", this.formDiobrando.itemid);
        this.$http
          .post("https://api5-datame.herokuapp.com/api/v1/item", formData, {
            headers: { Authorization: token }
          })
          .then(result => {
            this.ViewEdit = true;
            this.updatedMessage = this.$t('success_item');
            this.submited = true;
          });
      }
    },
    deleteItem(item_id, text) {
      var token = "JWT " + this.$cookies.get("token");
      this.$bvModal.msgBoxConfirm(text,  {
           okTitle:this.$t('accept'),
           cancelTitle:this.$t('cancel')
         }).then(value => {
        if(value === true){
          this.$http.delete(
            "https://api5-datame.herokuapp.com/api/v2/data/delete_item/" + item_id,
            {
              headers: {
                Authorization: token
              }
            })
          window.location.href = "/my_cv.html";
        }
      })
    },
    deleteSection(section_id, text) {
      var token = "JWT " + this.$cookies.get("token");
      this.$bvModal.msgBoxConfirm(text, {
           okTitle:this.$t('accept'),
           cancelTitle:this.$t('cancel')
         }).then(value => {
        if(value === true){
          this.$http.delete(
            "https://api5-datame.herokuapp.com/api/v2/data/delete_section/" + section_id,
            {
              headers: {
                Authorization: token
              }
            }
          );
          window.location.href = "/my_cv.html";
        }
      })
    },
    saveIds: function(item) {
      this.formDiobrando.itemid = item.id;
      this.formDiobrando.secid = item.section_id;
      this.formDiobrando.name = item.name;
      this.formDiobrando.description = item.description;
      this.formDiobrando.entity = item.entity;
      this.formDiobrando.date_start = item.date_start;
      if(item.date_finish!=null && item.date_finish.length> 0){
      this.formDiobrando.date_finish = item.date_finish;
      }
    },
    moreFunctions() {
      this.submited = false;
      window.location.href = "/my_cv.html";
    },
    exportasPDF(user) {
      if (this.language == "en") {
        var text =
          "This will download files to your computer. Are you sure?";
        var email = "E-mail: ";
        var address = "Address: ";
        var phone = "Phone: ";
      } else {
        var text =
          "Esta acción descargará archivos en tu terminal. ¿Estas seguro?";
        var email = "Correo electrónico: ";
        var address = "Dirección: ";
        var phone = "Teléfono: ";
      }

      this.$bvModal.msgBoxConfirm(text, {
           okTitle:this.$t('accept'),
           cancelTitle:this.$t('cancel')
         }).then(value => {
        if(value === true){
        var nameSurname = user.name + " " + user.surname;
        let pdfName = nameSurname;

        var doc = new jsPDF("p", "mm", "a4");

        // Adding name and surname

        doc.setFontSize(20);

        doc.text(nameSurname.toUpperCase(), 10, 10);

        // Adding email

        doc.setFontSize(15);

        doc.text(email + user.user__email, 10, 20);

        // Adding address

        doc.text(address + user.address, 10, 30);

        // Adding phone

        doc.text(phone + user.phone, 10, 40);

        // Adding photo

        doc.setFontSize(10);

        var lMargin = 15;
        var rMargin = 15;
        var pdfInMM = 210;

        var photo = user.photo;

        var lines = doc.splitTextToSize(photo, pdfInMM - lMargin - rMargin);

        doc.text(lMargin, 50, photo);

        // Saving PDF
        doc.save(pdfName + ".pdf");
      }
      })
    },
    exportasRAW(user) {
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
          user.name +
          ",surname:" +
          user.surname +
          ",email:" +
          user.user__email +
          ",photo:" +
          user.photo +
          ",address:" +
          user.photo +
          ",phone:" +
          user.phone +
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

#cv_items {
  margin: 1rem;
  margin-right: 1rem;
}

#cv_items_sub {
  margin: 2em;
}

#create_item_section {
  margin: 2em;
}

#create_section {
  margin: 2em;
}

.create-offer {
  text-align: right;
}

#create-offer {
  margin-top: 2em;
  margin-right: 2em;
}

.profileImage {
  width: 25rem;
  vertical-align: bottom;
  max-width: 201px;
  max-height: 290px;
}

#info {
  display: inline-table;
  margin-left: 1%;
  margin-top: 2rem;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  }
#profile {
  margin-left: 1em;
}
#EditProfile {
  margin-left: 1em;
}
html {
  background-color: #ffffff;
}
#info b-button {
  margin-top: 0.25rem !important;
  width: 25%;
  max-width: 201px;
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

.section-title {
  display: inline-block;
}

.cv_item_title {
  display: table-cell;
}
.delete_button {
  margin-bottom: 1em;
  margin-left: 1em;
}

@media all and (max-width: 699px) {
  #profile {
    display: flex;              /* establish flex container */
    flex-direction: column;     /* stack flex items vertically */
    align-items: center;        /* center items horizontally, in this case */
  }
  #EditProfile {
    display: flex;              /* establish flex container */
    flex-direction: column;     /* stack flex items vertically */
    align-items: center;        /* center items horizontally, in this case */
  }
}
</style>
