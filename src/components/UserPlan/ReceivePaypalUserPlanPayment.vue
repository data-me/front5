<template>
  <div>
  </div>
</template>

<script>
  export default {
    name: 'ReceivePaypalUserPlanPayment',
    data () {
      return {
        isDataScientist: this.$cookies.get("user_type") === "ds",
        wasPaymenetAccepted: false,
        alertType: '',
      }
    },
    mounted: function(){
    // Receiving payments
    var token = "JWT " + this.$cookies.get("token");
    if (this.$cookies.get("user_type") == "ds") {
      console.log('Logged as DS');
      try {
        console.log('Inside Try-Catch');
        if (1 < window.location.search.split("?").length) {
          console.log('Receiving the payment parameters');
          var paypal_response = window.location.search
            .split("?")[1]
            .split("&");

          var processPaypalUserPlanPaymentUrl


          console.log('Are we accepting or canceling the payment?');
          console.log(window.location.href.split("?")[0]);
          console.log('What does the String comparison outputs? for accept_userplan_payment: ' + window.location.href.split("?")[0].includes("accept_userplan_payment"));
          if(window.location.href.split("?")[0].includes("accept_userplan_payment")){
            console.log('Payment Accepted!');

            var paymentId = paypal_response[0].split("=")[1];
            var token_paypal = paypal_response[1].split("=")[1];
            var payerID = paypal_response[2].split("=")[1];
            this.wasPaymenetAccepted = true;

            processPaypalUserPlanPaymentUrl = 'https://api5-datame.herokuapp.com/api/v1/pagos/accept_paypal_userPlan_payment?paymentId=' + paymentId +
            '&token=' + token_paypal + '&PayerID=' + payerID;

            this.$http.get(processPaypalUserPlanPaymentUrl, { headers: { Authorization: token } })
            .then((result) => {
              console.log('Backend responded, executing promise');
              if(this.wasPaymenetAccepted){
                this.success();
              }
            });
          }else if(window.location.href.split("?")[0].includes("cancel_userplan_payment")){
            console.log('Decline payment!');
            this.wasPaymenetAccepted = false;
            this.error();
          }

        }
      } catch (error) {
        console.trace(error);
      }
    }
  },
  methods:{
    success() {
        this.$swal({
            type: 'success',
            title: this.$t('success_payment'),
            text: this.$t('thank_you')
        }).then(result =>{
              window.location.href = 'https://front5-datame.herokuapp.com/user_plan.html';
              this.$cookies.set("ads", "false");
            });
    },
    error(message) {
      if(message==undefined){
        message = "Payment was not received.";
      }
        this.$swal({
            type: 'error',
            title: this.$t('error_payment'),
            text: this.$t('error_upgrade')
        }).then(result =>{
              window.location.href = 'https://front5-datame.herokuapp.com/user_plan.html';
            });
    }
  }
    }

</script>

<style>
.send-button {
  text-align: center;
}

.user-plan-form{
    margin: 2em;
}
</style>
