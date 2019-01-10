<template>
  <div id="app" class="page">
    <fade-transition origin="center" mode="out-in" :duration="1500" v-show="!loading">
    <div>
      <router-view name="nav"/>
        <fade-transition origin="center" mode="out-in" :duration="300">
          <router-view name="contents"/>
        </fade-transition>
      <router-view name="footer"/>
      <router-view name="scroll"/>
    </div>
    </fade-transition>
    <pageSpinner v-show="loading"></pageSpinner>
  </div>
</template>

<script>
import PageSpinner from './layout/PageSpinner'

export default {
  components: {
    PageSpinner
  },
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    setTimeout(_ => { this.loading = false }, 1000)
  }
}
</script>

<style>

</style>
