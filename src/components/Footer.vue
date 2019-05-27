<template>
    <div id="footer">
    <b-navbar type="dark" variant="dark" :fixed="isSticky()">
        <b-nav-text><p class="text">© Copyright 2019 | {{$t('made_in_sevilla')}}</p></b-nav-text>
         <b-navbar-nav class="ml-auto">
            <b-nav-item href="https://data-me.github.io/"><p class="link" >{{$t("about_us")}}</p></b-nav-item>
            <b-nav-item href="/terms_and_conditions.html"><p class="link">{{$t('terms&conditions')}}</p></b-nav-item>
            <!--<b-nav-item href="#">Privacy policy</b-nav-item>-->
        </b-navbar-nav>

    </b-navbar>
    </div>
</template>
<script>
export default {
  name: 'Footer',
  props: {
      fixed: String,
      sticky: Boolean
  }, methods: {
      isSticky(){
          if (this.sticky == "yes"){
              return "bottom"
          } else {
              return "none"
          }
      }
  }
}
</script>

<style>

.link {
    color: white;
}

.text {
    color:aliceblue;
}


</style>
