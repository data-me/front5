<template>
  <div class="user-plan-form">
    <h4>{{$t('upgrade_to_PRO')}}</h4>
    <b-button @click="modaluserPlanFormShow = !modaluserPlanFormShow">{{$t('upgrade')}}</b-button>


    <b-modal hide-footer v-model="modaluserPlanFormShow" id="user-plan-form" size="x1" :title="$t('upgrade_user_plan')">
      <b-form  @submit.prevent @submit="onSubmit">
        <b-container fluid>
          <b-col sm="9">
              <label for="nMonths">{{$t('user_plan_nmonths')}}</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
                id="nMonths"
                v-model="userPlanForm.nMonths"
                required
                type="number"                :state="this.userPlanForm.nMonths.length> 0 && this.userPlanForm.nMonths>0 && parseInt(this.userPlanForm.nMonths) <= parseInt(this.maxMonthsToExtend)"
            />
            <b-form-invalid-feedback id="input-live-feedback">
              {{$t('user_plan_nmonths_warning')}}
            </b-form-invalid-feedback>
            <br/>
            <b-button @click="modaluserPlanFormShow = !modaluserPlanFormShow" :disabled=isDisabled class="send-button" type="submit" variant="primary">{{$t('send')}}</b-button>
          </b-col>
        </b-container>
      </b-form>

    </b-modal>

  </div>
</template>

<script>
  export default {
    name: 'UserPlanForm',
    data () {
      return {
        maxMonthsToExtend:'',
        userPlanForm: {
          nMonths:'1',
        },
        modaluserPlanFormShow: false,
        redirect_url : '',
      }
    },
    computed:{
      isDisabled(){
        return ! (this.userPlanForm.nMonths.length> 0 && this.userPlanForm.nMonths>0 && parseInt(this.userPlanForm.nMonths) <= parseInt(this.maxMonthsToExtend));
      }
    },
    methods: {
    
      onSubmit(evt) {
        evt.preventDefault()
        var token = 'JWT ' + this.$cookies.get('token')
        const baseURI = 'https://api5-datame.herokuapp.com/api/v2/payUserPlan'
        const formData = new FormData();
        formData.append('nMonths', this.userPlanForm.nMonths);
        this.$http.post(baseURI, formData, { headers: { Authorization: token }})
        .then((result) => {
            if(result.data.userplan_pk != null){
              this.$http.get('https://api5-datame.herokuapp.com/api/v1/pagos/paypal_userPlan_payment?userplan_pk=' + result.data.userplan_pk,
              { headers: { Authorization: token } })
                .then((result) => {
                  this.redirect_url =  result.data.redirect_url
                  this.payment_question()
              })
              }
        })
        },
        payment_question() {
        this.$swal({
            type: 'warning',
            title: this.$t('proceed_payment'),
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: this.$t('pay'),
            cancelButtonText: this.$t('cancel'),
        }).then((result) =>{
            if(result.value){
            window.location.href = this.redirect_url;
            }
          })
      },
    },
    mounted: function(){
        var token = 'JWT ' + this.$cookies.get('token')
        this.$http.get('https://api5-datame.herokuapp.com/api/v2/currentUserPlan',{ headers:
        { Authorization: token }
            }).then((result) => {
                this.maxMonthsToExtend = result.data["maxMonthsToExtend"];
                console.log(this.maxMonthsToExtend);
            })

    }
    }

</script>

<style>
.user-plan-form{
    margin: 2em;
}
</style>
