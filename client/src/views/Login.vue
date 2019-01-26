<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img v-lazy="`/img/login.png`" alt="IMG">
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
import VueCookie from 'vue-cookie'
import { mapMutations } from 'vuex'

export default {
  metaInfo () {
    return {
      title: this.meta.title,
      meta: [
        { name: 'keywords', property: 'keywords', content: this.meta.keywords },
        { name: 'description', property: 'description', content: this.meta.description },
        { name: 'author', property: 'author', content: this.meta.url },

        { property: 'og:title', content: this.meta.title },
        { property: 'og:site_name', content: 'Codepresso' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: this.meta.url },
        { property: 'og:image', content: this.meta.image },
        { property: 'og:description', content: this.meta.description },

        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: this.meta.url },
        { name: 'twitter:title', content: this.meta.title },
        { name: 'twitter:description', content: this.meta.description },
        { name: 'twitter:creator', content: '@opzyra' },
        { name: 'twitter:image:src', content: this.meta.image },

        { itemprop: 'name', content: this.meta.title },
        { itemprop: 'description', content: this.meta.description },
        { itemprop: 'image', content: this.meta.image }
      ]
    }
  },
  data () {
    return {
      meta: {
        title: 'Codepresso | Login',
        keywords: '웹개발, 프론트엔드, 백엔드, 개발자 블로그, 포트폴리오',
        description: 'WEB Developer HYUN HO - A place to study solid code like espresso',
        url: 'https://codepresso.net',
        image: 'https://codepresso.net/img/og.png'
      }
    }
  },
  created () {
    const tk = this.$route.query.tk
    if (tk) {
      const token = VueCookie.get('token')
      this.LOGIN({ token })
      location.href = localStorage.from || '/'
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
/* eslint-disable */
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body, html {
  height: 100%;
  font-family: 'Montserrat', sans-serif !important;
}

/*---------------------------------------------*/
a {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
  outline: none !important;
}

a:hover {
  text-decoration: none;
  color: #57b846;
}

/*---------------------------------------------*/
h1,h2,h3,h4,h5,h6 {
  margin: 0px;
}

p {
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
}

ul, li {
  margin: 0px;
  list-style-type: none;
}

/*---------------------------------------------*/
input {
  outline: none;
  border: none;
}

textarea {
  outline: none;
  border: none;
}

textarea:focus, input:focus {
  border-color: transparent !important;
}

input:focus::-webkit-input-placeholder { color:transparent; }
input:focus:-moz-placeholder { color:transparent; }
input:focus::-moz-placeholder { color:transparent; }
input:focus:-ms-input-placeholder { color:transparent; }

textarea:focus::-webkit-input-placeholder { color:transparent; }
textarea:focus:-moz-placeholder { color:transparent; }
textarea:focus::-moz-placeholder { color:transparent; }
textarea:focus:-ms-input-placeholder { color:transparent; }

input::-webkit-input-placeholder { color: #999999; }
input:-moz-placeholder { color: #999999; }
input::-moz-placeholder { color: #999999; }
input:-ms-input-placeholder { color: #999999; }

textarea::-webkit-input-placeholder { color: #999999; }
textarea:-moz-placeholder { color: #999999; }
textarea::-moz-placeholder { color: #999999; }
textarea:-ms-input-placeholder { color: #999999; }

/*---------------------------------------------*/
button {
  outline: none !important;
  border: none;
  background: transparent;
}

button:hover {
  cursor: pointer;
}

iframe {
  border: none !important;
}

/*//////////////////////////////////////////////////////////////////
[ Utility ]*/
.txt1 {
  font-size: 13px;
  line-height: 1.5;
  color: #999999;
}

.txt2 {
  font-size: 13px;
  line-height: 1.5;
  color: #666666;
}

/*//////////////////////////////////////////////////////////////////
[ login ]*/

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #363842;
  background: -webkit-linear-gradient(-135deg, #363842, #4158d0);
  background: -o-linear-gradient(-135deg, #363842, #4158d0);
  background: -moz-linear-gradient(-135deg, #363842, #4158d0);
  background: linear-gradient(-135deg, #363842, #4158d0);
}

.wrap-login100 {
  width: 960px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 177px 130px 33px 95px;
}

/*------------------------------------------------------------------
[  ]*/
.login100-pic {
  width: 316px;
}

.login100-pic img {
  max-width: 100%;
}

/*------------------------------------------------------------------
[  ]*/
.login100-form {
  width: 290px;
}

.login100-form-title {
  font-size: 24px;
  color: #333333;
  line-height: 1.2;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  display: block;
  padding-bottom: 20px;
}

.login100-form-help {
  font-size: 16px;
  color: #333333;
  line-height: 1.6;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  display: block;
  padding-bottom: 10px;
}

/*---------------------------------------------*/
.wrap-input100 {
  position: relative;
  width: 100%;
  z-index: 1;
  margin-bottom: 10px;
}

.input100 {
  font-size: 15px;
  line-height: 1.5;
  color: #666666;

  display: block;
  width: 100%;
  background: #e6e6e6;
  height: 50px;
  border-radius: 25px;
  padding: 0 30px 0 68px;
}

/*------------------------------------------------------------------
[ Focus ]*/
.focus-input100 {
  display: block;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 0px 0px;
  color: rgba(87,184,70, 0.8);
}

.input100:focus + .focus-input100 {
  -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
  animation: anim-shadow 0.5s ease-in-out forwards;
}

@-webkit-keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}

@keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}

.symbol-input100 {
  font-size: 15px;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 35px;
  pointer-events: none;
  color: #666666;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.input100:focus + .focus-input100 + .symbol-input100 {
  color: #57b846;
  padding-left: 28px;
}

/*------------------------------------------------------------------
[ Button ]*/
.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 15px;
}

.login100-form-btn {
  font-size: 17px;
  line-height: 1.5;

  width: 100%;
  height: 50px;
  border-radius: 25px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  padding: 0 35px;
  font-family: 'Montserrat', sans-serif;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.github {
  background: #e9ecef;
  color: #212529;
}

.google {
  background: #c92a2a;
  color: #fff;
}

.facebook {
  background: #1971c2;
  color: #fff;
}

.login100-form-btn:hover {
  opacity: 0.6;
}

/*------------------------------------------------------------------
[ Responsive ]*/

@media (max-width: 992px) {
  .wrap-login100 {
    padding: 177px 90px 33px 85px;
  }

  .login100-pic {
    width: 35%;
  }

  .login100-form {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .wrap-login100 {
    padding: 100px 80px 33px 80px;
  }

  .login100-pic {
    display: none;
  }

  .login100-form {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .wrap-login100 {
    padding: 100px 15px 33px 15px;
  }
}

/*------------------------------------------------------------------
[ Alert validate ]*/

.validate-input {
  position: relative;
}

.alert-validate::before {
  content: attr(data-validate);
  position: absolute;
  max-width: 70%;
  background-color: white;
  border: 1px solid #c80000;
  border-radius: 13px;
  padding: 4px 25px 4px 10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 8px;
  pointer-events: none;

  color: #c80000;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;

  visibility: hidden;
  opacity: 0;

  -webkit-transition: opacity 0.4s;
  -o-transition: opacity 0.4s;
  -moz-transition: opacity 0.4s;
  transition: opacity 0.4s;
}

.alert-validate::after {
  content: "\f06a";
  font-family: FontAwesome;
  display: block;
  position: absolute;
  color: #c80000;
  font-size: 15px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 13px;
}

.alert-validate:hover:before {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 992px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 1;
  }
}
</style>
