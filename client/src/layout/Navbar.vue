<template>
  <header role="banner" class="transparent light">
    <div class="row-beetle">
      <div class="nav-inner row-beetle-content buffer-left buffer-right even clear-after">
        <div id="brand">
          <h1 class="reset">
            <router-link to="/">
              <img src="/img/white.png" alt="logo" class="beetle-logo">
            </router-link>
          </h1>
        </div><!-- brand -->
        <a id="menu-toggle" href="#"><i class="fa fa-bars fa-lg"></i></a>
        <nav class="nav">
          <ul class="reset" role="navigation">
            <li class="menu-item" v-for="(item, index) in menu" :key="index">
              <router-link v-if="item.route" v-bind:to="item.route" tag="a" v-text="item.name" class="router-link"></router-link>
              <a v-if="item.href" v-bind:href="item.href" v-text="item.name" target="_black" class="router-link"></a>
              <a v-if="item.action" v-text="item.name" class="router-link" v-on:click.prevent="item.action"></a>
            </li>
            <li class="menu-item icon">
              <span class="router-link m-r-15 inline" @click="resume"><i class="mdi mdi-calendar-text-outline"></i></span>
              <router-link tag="span" to="/login" class="router-link inline" v-if="token == null"><i class="fa fa-user-circle-o"></i></router-link>
              <span class="router-link inline" v-else @click="signOut"><i class="fa fa-sign-out"></i></span>
            </li>
          </ul>
        </nav>
      </div><!-- row-beetle-content -->
    </div><!-- row-beetle -->
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('main', [ 'menu', 'resumePublished' ]),
    ...mapState('auth', [ 'token' ])
  },
  methods: {
    ...mapMutations('auth', ['LOGOUT']),
    resume () {
      if (!this.resumePublished) {
        const title = '열람 불가'
        const text = '이력서가 비공개 상태입니다.'
        this.$swal({ title, text, type: 'error', confirmButtonText: '확인' })
      } else {
        window.open('https://codepresso.net/resume/', '_blank')
      }
    },
    signOut () {
      this.LOGOUT()
      this.$swal({ title: '로그아웃', text: '세션이 종료되었습니다.', type: 'success', confirmButtonText: '확인' }).then(sres => {
        location.href = '/'
      })
    }
  }
}
</script>

<style>
.nav .inline {
  display: inline;
}

header.transparent.light nav > ul > li > span {
  line-height: 3rem;
  color: #fff;
}

header.fixed-header.transparent.light nav > ul > li > span {
  line-height: 3rem;
  color: #333;
  text-shadow: none;
}

@media handheld, only screen and (max-width: 48em) {
  nav > ul > li.icon {
    padding: 5px 0px !important;
  }

  nav span {
    color: #333 !important;
  }
}
</style>
