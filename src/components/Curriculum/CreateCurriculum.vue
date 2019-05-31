<template>
  <div>
    <b-form-select v-model="selected" :options="options" multiple :select-size="4"></b-form-select>
    <div class="mt-3">{{$t('selected')}}: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
  data () {
    return {
      sectionsNames: [],
    }
  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('https://api5-datame.herokuapp.com/api/v1/cv',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.items = result.data
      })
  }
}
</script>
