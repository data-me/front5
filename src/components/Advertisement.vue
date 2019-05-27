<template>
    <div class="advertisement" v-if="this.$cookies.get('ads') == 'true'">
        <span class="ads_disclaimer">{{$t('advertisement')}}</span>
        <a :href="ad_url" target="_blank">
            <b-img class="advertisement-image" alt="Ad image" center :src="ad_img"/>
        </a>
        <button class="close_add" type="button" onclick="document.getElementsByClassName('advertisement')[0].style.display='none';">{{$t('close')}}</button>
    </div>
</template>
<script>
export default {
  name: 'Advertisement',
  props: {
  },
  data(){
      return{
        ad_url: "",
        ad_img: "",
        ads_items: [
            {
                ad_img: "https://www.todotaladros.com/img/cms/Blog/Amazon%20fraudes/Banner-Amazon-fraudes-blog.jpg",
                ad_url: "https://www.amazon.es/",
            },

            {
                ad_img: "https://technuggets.biz/wp-content/uploads/2018/09/Tech-Nuggets-thinkpad-e580-business-laptop_banner.jpg",
                ad_url: "https://www.lenovo.com/es/es/laptops/thinkpad/c/THINKPAD",
            },
            {
                ad_img: "https://searchengineland.com/figz/wp-content/seloads/2015/12/duckduckgo-logo-wordmark4-1920-800x450.png",
                ad_url: "https://duckduckgo.com/",
            },
            {
                ad_img: "https://developers.redhat.com/blog/wp-content/uploads/2018/04/Join-me-at-Red-Hat-Summit.png",
                ad_url: "https://www.redhat.com/en/summit/2019",
            }
        ]
      }
  },
  mounted: function(){
        var ad_selected;
        var ad_selected_image;
        var ad_selected_url;
        var random;
      if(this.ads_items != undefined && 0 < this.ads_items.length){
        var ads = this.ads_items;
        random = Math.random();
        ad_selected = ads[Math.floor(random * ads.length)];

        ad_selected_image = ad_selected["ad_img"];
        ad_selected_url = ad_selected["ad_url"];
      }else{
        ad_selected_image = "https://data-me.github.io/img/branding/DataMe-brand.png";
        ad_selected_url = "https://data-me.github.io/"
      }

      this.ad_img = ad_selected_image;
      this.ad_url = ad_selected_url;

  }
}
</script>

<style>
div.advertisement{
    position: relative;
    z-index: 999;
    /*float:center;*/
    text-align: center;
    
}

.advertisement-image{
    height: 175px;
}
span.ads_disclaimer{
    font: 10px/1 "Open Sans",Arial,sans-serif !important;
}


div.advertisement input.close_add {
    position:relative;
    top:0;
    left:0%;

}
@media all and (max-width: 699px) {
    .advertisement-image{
    height: 85%;
    width: 85%;
    }    
}
</style>
