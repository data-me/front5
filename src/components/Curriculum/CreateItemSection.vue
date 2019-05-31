<template lang="html">


    <div>

        <b-modal v-model="showModal" ref="messages" id="messages" hide-footer size="xl" title="Erros">
            <template slot="modal-header"> {{$t('check_errors')}} </template>
            <li id="messagesError" v-for="message in this.messages"> {{message}}</li>
            <template slot="modal-footer"><button class="btn btn-primary">{{$t('save_changes')}}</button></template>
            <b-button class="mt-3" variant="outline-danger" block @click="showModal = false">{{$t('close')}}</b-button>
        </b-modal>
        <b-button v-b-modal="'create-item-section-form' + secid">{{$t('newsectionitem')}}</b-button>

        <b-modal :id="'create-item-section-form' + secid" hide-footer ref="newItemMessage" size="x1" :title="$t('newsectionitem')">
            <b-form id="item" @submit.prevent @submit="onSubmit">

                <label for="name">{{$t('name')}}:</label>
                <b-form-input
                    id="name"
                    v-model="item.name"
                    required
                    :placeholder="this.$t('name_record')"
                ></b-form-input>

                    <label for="entity">{{$t('entity')}}:</label>
                <b-form-input
                    id="entity"
                    v-model="item.entity"
                    required
                    :placeholder="this.$t('org_entity')"
                ></b-form-input>

                    <label for="description">{{$t('description')}}:</label>
                <b-form-textarea
                    id="description"
                    v-model="item.description"
                    :placeholder="this.$t('enter_description')"
                    rows="3"
                    max-rows="6"
                    required
                ></b-form-textarea>

                    <label for="datestart">{{$t('datestart')}}:</label>

                <b-form-input
                    id="datestart"
                    v-model="item.datestart"
                    placeholder="yyyy-MM-dd"
                    required
                ></b-form-input>

                    <label for="datefinish">{{$t('datefinish')}}:</label>
                <b-form-input
                    id="datefinish"
                    v-model="item.datefinish"

                    placeholder="yyyy-MM-dd"
                ></b-form-input>
                <br/>
                <b-button type="submit" variant="primary">{{$t('save')}}</b-button>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'CreateItemSection',
    data(){
        return{
            item:{
                name: '',
                entity: '',
                description:'',
                datestart: '',
                datefinish: '',
            },
            showModal : false,
            messages: []

        }
    },
     props: ['secid'],
    methods: {
    onSubmit(evt) {
      evt.preventDefault()
        this.messages = []
         var now = new Date();
      var dateStart = new Date(this.item.datestart)
     var datePattern = new RegExp(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/g);
      if (!this.item.datestart.match(datePattern)) {
          if (this.language == "en") {
          this.messages.push("Starting date doesn't match the patter");
        } else {
          this.messages.push("La fecha de comienzo no cumple el patron");
        }
      }

    if (this.item.datefinish != '' && !this.item.datefinish.match(datePattern)) {
        if (this.language == "en") {
          this.messages.push("Finish date doesn't match the pattern");
        } else {
          this.messages.push("La fecha de fin no cumple el patron");
        }
      }

       if (this.item.datestart.length == 0) {
        if (this.language == "en") {
          this.messages.push("Starting date is required");
        } else {
          this.messages.push("la fecha de inicio es requerida");
        }
      }
      if (this.item.datefinish.length != 0) {
          var dateEnd = new Date(this.item.datefinish)
        if (dateEnd > now){
             if (this.language == "en") {
          this.messages.push("The finish date must be past");
        } else {
          this.messages.push("La fecha de fin debe de ser en pasado");
        }
        }
        if (dateEnd < dateStart){
             if (this.language == "en") {
          this.messages.push("The finish date must be after start date");
        } else {
          this.messages.push("la fecha de fin debe de ser despues de la fecha de inicio");
        }
        }
      }
      if(this.messages.length > 0){
       this.showModal = true;
      }
      else{
        var token = 'JWT ' + this.$cookies.get('token')
      const baseURI = 'https://api5-datame.herokuapp.com/api/v1/item'
      const formData = new FormData();
      formData.append('name', this.item.name);
      formData.append('secid', Number(this.secid));
      formData.append('description', this.item.description);
      formData.append('entity', this.item.entity);
      formData.append('datestart',this.item.datestart);
      if(this.item.datefinish !== null && this.item.datefinish.length !== 0){
        formData.append('datefinish',this.item.datefinish);
      }
      this.$http.post(baseURI, formData, { headers: { Authorization: token }})
      .then((result) => {
          location.reload()
      })
      }
    }
  }
}
</script>
<style lang="css" scoped>

</style>
