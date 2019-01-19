<template>
    <transition name="icon-fade">
    <div class="top-button" v-show="topButton" v-scroll-to="{ element: '#app', duration: 2000 }">
      <span class="top-cursor">
        <i class="fa fa-chevron-up"></i>
      </span>
    </div>
    </transition>
</template>
<script>
/* eslint-disable */
export default {
  name: 'scroll',
  data() {
    return {
      topButton: false
    };
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (window.pageYOffset >= 630){
        this.topButton = true
        $('header').addClass('fixed-header')
        $('.beetle-logo').attr('src', '/img/black.png')
      } else {
        this.topButton = false
          if(!$('body').hasClass('mobile')){
            $('header').removeClass('fixed-header')
            $('.beetle-logo').attr('src', '/img/white.png')
          }
      } 
    }
  }
};
</script>
<style>
</style>
