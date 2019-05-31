<template lang="html">
    <div>
        <h4>{{$t('create_section')}}</h4>
            <b-form id="section" @submit="onSubmit">

            <b-col sm="3">
            <label for="name">{{$t('name')}}:</label>
            </b-col>
            <b-col sm="9">
            <b-form-select v-model="section.name" :options="options"></b-form-select>
            </b-col>
            <b-col sm="9">
            <b-button type="submit" variant="primary">{{$t('save')}}</b-button>
             </b-col>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'CreateSection',
    data() {
      return {
        selected: null,
        options: [
        ],
        section:{
            name: ''
        }
      }
    }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('https://api5-datame.herokuapp.com/api/v3/section_names_available',{ headers:
      { Authorization: token }
      }).then((result) => {
          for(var i = 0, size = result.data.length; i < size ; i++){
            var section_name = result.data[i];
             this.options.push({'text': section_name.name, 'value': section_name.name});
            }
      })
  },    methods: {
    onSubmit(evt) {
      evt.preventDefault()
        var token = 'JWT ' + this.$cookies.get('token')
      const baseURI = 'https://api5-datame.herokuapp.com/api/v1/section'
      const formData = new FormData();
      formData.append('name', this.section.name);
      this.$http.post(baseURI, formData, { headers: { Authorization: token }})
      .then((result) => {
          location.reload()
      })
    }
  }

  }
</script>
