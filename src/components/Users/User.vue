<template>
        <b-card class='user-bcard' :title="'User ID: ' + user.id">
        <b-card-text class="card-text">
          <label for="address">{{ $t('name') }}:</label>
          {{user.name}}
        </b-card-text>
        <b-card-text class="card-text">
          <label for="address">{{ $t('surname') }}:</label>
          {{user.surname}}
        </b-card-text>
        <b-card-text class="card-text">
          <label for="address">{{ $t('phone') }}:</label>
          {{user.phone}}
        </b-card-text>
        <div style="float: right;">
            <b-button
              variant="danger"
              class="mt-2"
              block
              @click="deleteUser(user.user_id, $t('confirm_delete_user'))">
                {{$t('delete_user')}}
              </b-button>
        </div>
        </b-card>
</template>

<script>
export default {
    name: "User",
    data(){
        return{

        }
    },
    props:['user'],
    methods:{
        deleteUser(user_id, text){
            var token = "JWT " + this.$cookies.get("token");
            const formData = new FormData();
            formData.append('user_id', user_id);
            this.$bvModal.msgBoxConfirm(text, {
              okTitle:this.$t('accept'),
              cancelTitle:this.$t('cancel')
            }).then(value => {
              if(value === true){
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
}

</script>

<style>
.user-bcard {
  margin: 2em;
}
</style>
