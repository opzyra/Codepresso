<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="/static/img/login.png" alt="IMG">
        </div>

        <div class="login100-form validate-form">
          <span class="login100-form-title">
            Member Login
          </span>
          <span class="login100-form-help">
            아래의 소셜 계정을 통해 서비스를
            <br>
            이용하실 수 있습니다.
          </span>
          <!--
          <div class="wrap-input100 validate-input">
            <input class="input100" type="text" name="email" placeholder="Email">
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
          </div>

          <div class="wrap-input100 validate-input">
            <input class="input100" type="password" name="pass" placeholder="Password">
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
          </div>
          -->
          <div class="container-login100-form-btn">
            <button class="login100-form-btn github" @click="github">
              <i class="mdi mdi-github-circle m-r-8" aria-hidden="true"></i>
              GitHub
            </button>
          </div>
          <div class="container-login100-form-btn">
            <button class="login100-form-btn google" @click="google">
              <i class="mdi mdi-google-glass m-r-8" aria-hidden="true"></i>
              Google
            </button>
          </div>
          <div class="container-login100-form-btn">
            <button class="login100-form-btn facebook" @click="facebook">
              <i class="mdi mdi-facebook-box m-r-8" aria-hidden="true"></i>
              Facebook
            </button>
          </div>

          <div class="text-center p-t-12 p-b-120">
            <a class="txt2" href="javascript:history.back()">
              <i class="fa fa-long-arrow-left m-r-5" aria-hidden="true"></i>
              뒤로가기
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../api/auth'
import { mapMutations } from 'vuex'

export default {
  created () {
    const tk = this.$route.query.tk
    if (tk) {
      auth.getToken(decodeURI(tk)).then(res => {
        const token = res.data
        this.LOGIN(token)
        location.href = localStorage.from || '/'
      }).catch()
    }
  },
  methods: {
    ...mapMutations('auth', ['LOGIN']),
    github () {
      location.href = '/api/auth/github'
    },
    google () {
      location.href = '/api/auth/google'
    },
    facebook () {
      location.href = '/api/auth/facebook'
    }
  }
}
</script>

<style scoped>
@import '../assets/css/login.css';
</style>
