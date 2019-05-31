<template>
    <div class="dataScientistsList">
        <h2>{{ $t('data_scientists') }}</h2>
        <div :key="userItem.id" v-for="userItem in dataScientistsList">
            <User :user="userItem"/>
        </div>
    </div>
</template>

<script>
import User from "./User.vue";
export default {
    name: "DataScientistList",
    components: {
        User,
    },
    data(){
        return{
            dataScientistsList: [],
        };
    },
    mounted: function(){
        var token = "JWT " + this.$cookies.get("token");

        this.$http
        .get("https://api5-datame.herokuapp.com/api/v2/list_dataScientists", {
        headers: { Authorization: token }
      }).then(result => {
          this.dataScientistsList = result.data;
      })

    },

}
</script>
<style>
.dataScientistsList{
    margin: 2em;
}
</style>
