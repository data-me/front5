<template>
  <div class="hello">
    <Navbar/>
    <br/>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '',
    }
  },
    mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('https://api5-datame.herokuapp.com/api/v1/helloworld', { headers: 
      { Authorization: token }
      }).then((result) => {
        this.msg = result.data.saludo
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: left;
  margin-left: 1em;
  
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
