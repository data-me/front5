<template>
        <div style="float: center;">
            <b-button
              variant="danger"
              class="mt-2"
              block
              @click="deleteConfirmation()">
                {{$t('deleteme')}}
              </b-button>
        </div>
</template>

<script>
export default {
    name: "DeleteMeButton",
    data(){
        return{

        }
    },
    methods:{
      deleteConfirmation(){
        this.$swal({
            type: 'warning',
            title: this.$t('del_confirmation'),
            text: this.$t('del_confirmation_text'),
            showCancelButton: true,
            //confirmButtonColor: '#3085d6',
            confirmButtonText: this.$t('delete'),
            cancelButtonText: this.$t('cancel')
        }).then((result) => {
            if (result.value) {
              this.deleteUser();
              }
          })
      },
      deleteUser(){
          var token = "JWT " + this.$cookies.get("token");
          const formData = new FormData();
          this.$http
          .post("https://api5-datame.herokuapp.com/api/v3/delete_me", formData, {
              headers: { Authorization: token }
          }).then((result) => {
              if (result.data.success) {
                this.$swal({
                  type: 'success',
                  title: this.$t('deleted'),
                  text: this.$t('deleted_text')
                }
                ).then((result) => {
                  this.setCookie("token", "", -1);
                  if (result.value) {
                    window.location.href = 'https://front5-datame.herokuapp.com';
                  }else if(result.dismiss){
                    window.location.href = 'https://front5-datame.herokuapp.com';
                  }
                  })
              }
            })
      },
      setCookie: function(name, value, days) {
      var d = new Date();
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
      document.cookie =
        name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },
    }
}

</script>

<style>
  .company-bcard {
    margin: 2em;
  }
</style>
