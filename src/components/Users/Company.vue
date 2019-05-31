<template>
  <b-card class="company-bcard" :title="'Company ID: ' + company.id">
    <b-card-text class="card-text">
      <label for="address">{{$t('name')}}:</label>
      {{company.name}}
    </b-card-text>
    <b-card-text class="card-text">
      <label for="address">{{$t('description')}}:</label>
      {{company.description}}
    </b-card-text>
    <b-card-text class="card-text">
      <label for="address">NIF:</label>
      {{company.nif}}
    </b-card-text>
    <div style="float: right;">
      <b-button
        variant="danger"
        class="mt-2"
        block
        @click="deleteUser(company.user_id, $t('confirm_delete_user'))"
      >{{$t('delete_user')}}</b-button>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "Company",
  data() {
    return {};
  },
  props: ["company"],
  methods: {
    deleteUser(user_id, text) {
      var token = "JWT " + this.$cookies.get("token");
      const formData = new FormData();
      formData.append("user_id", user_id);
      this.$bvModal.msgBoxConfirm(text, {
           okTitle:this.$t('accept'),
           cancelTitle:this.$t('cancel')
         })
         .then(value => {
        if(true === true){
          this.$http
            .post(" https://api5-datame.herokuapp.com/api/v2/delete_user", formData, {
              headers: { Authorization: token }
            })
            .then(result => {
              location.reload();
            });
        }
      })
    }
  }
};
</script>

<style>
.company-bcard {
  margin: 2em;
}
</style>
