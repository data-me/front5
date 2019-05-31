<template>
    <div>
        <h2>{{$t('user_plan_current')}}</h2>
        <b-card class="display-current-user-plan text-center" :header="$t('user_plan_current')" :title="userPlan.currentUserPlan" :sub-title="userPlan.expirationDate.slice(0,10)">
          <b-card-text >
          </b-card-text>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'DisplayCurrentUserPlan',
    data(){
        return{
            userPlan:{},
        }
    },
    mounted: function(){
        var token = 'JWT ' + this.$cookies.get('token')
        this.$http.get('https://api5-datame.herokuapp.com/api/v2/currentUserPlan',{ headers:
        { Authorization: token }
            }).then((result) => {
                this.userPlan = result.data
            })

    }
}
</script>

<style>
.display-current-user-plan{
    margin: 2em;
}

</style>
