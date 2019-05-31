<template>
    <div class="companyList">
        <h2>{{ $t('companies') }}</h2>
        <div :key="companyItem.id" v-for="companyItem in companyList">
            <Company :company="companyItem"/>
        </div>
    </div>
</template>

<script>
import Company from "./Company.vue";
export default {
    name: "CompanyList",
    components: {
        Company,
    },
    data(){
        return{
            companyList: [],
        };
    },
    mounted: function(){
        var token = "JWT " + this.$cookies.get("token");

        this.$http
        .get("https://api5-datame.herokuapp.com/api/v2/list_companies", {
        headers: { Authorization: token }
      }).then(result => {
          this.companyList = result.data;
      })

    },

}
</script>
<style>
.companyList{
    margin: 2em;
}
</style>
