<template>
  <header role="banner" class="transparent light">
    <div class="row-beetle">
      <div class="nav-inner row-beetle-content buffer-left buffer-right even clear-after">
        <div id="brand">
          <h1 class="reset">
            <router-link to="/">
              <img src="/static/img/white.png" alt="logo" class="beetle-logo">
            </router-link>
          </h1>
        </div><!-- brand -->
        <a id="menu-toggle" href="#"><i class="fa fa-bars fa-lg"></i></a>
        <nav>
          <ul class="reset" role="navigation">
            <li class="menu-item" v-for="(item, index) in menu" :key="index">
              <router-link v-if="item.route" v-bind:to="item.route" tag="a" v-text="item.name" class="router-link"></router-link>
              <a v-if="item.href" v-bind:href="item.href" v-text="item.name" target="_black" class="router-link"></a>
              <a v-if="item.action" v-text="item.name" class="router-link" v-on:click.prevent="item.action"></a>
            </li>
          </ul>
        </nav>
      </div><!-- row-beetle-content -->
    </div><!-- row-beetle -->
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('main', [ 'menu' ])
  }
}
</script>

<style>

</style>
