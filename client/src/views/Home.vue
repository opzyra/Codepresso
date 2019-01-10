<template>
  <div>
    <div id="intro-wrap">
      <div id="intro" class="preload darken" data-autoplay="5000" data-navigation="true" data-pagination="true" data-transition="fadeUp">
        <div class="intro-item" style="background-image: url(/static/img/warp-01.png);">
          <div class="caption">
            <h2>WEB Developer</h2>
            <p class="m-b-3">브라우저를 통해 사람을 연결하는 웹 개발자</p>
            <p>HYUN HO</p>
            <a class="button white transparent" v-scroll-to="{ element: '#main', duration: 800 }">Read More</a>
          </div>
          <div class="photocaption">
            <h4>Shot by <a href="https://www.freepik.com/" target="_black">Freepik Vectors</a></h4>
          </div>
        </div>
        <div class="intro-item" style="background-image: url(/static/img/warp-05.png);">
          <div class="caption">
            <h2>Work</h2>
            <p class="m-b-3">현장에서 개발에 참여한 프로젝트</p>
            <p>PROJECT</p>
            <router-link tag="a" class="button white transparent" to="/work" href="javascript:void(0)">Read More</router-link>
          </div>
          <div class="photocaption">
            <h4>Shot by <a href="https://www.freepik.com/" target="_black">Freepik Vectors</a></h4>
          </div>
        </div>
        <div class="intro-item" style="background-image: url(/static/img/warp-03.png);">
          <div class="caption">
            <h2>Portfolio</h2>
            <p class="m-b-3">다양한 기술을 공부하며 개발한 애플리케이션</p>
            <p>APPLICATIONS</p>
            <router-link tag="a" class="button white transparent" to="/portfolio" href="javascript:void(0)">Read More</router-link>
          </div>
          <div class="photocaption">
            <h4>Shot by <a href="https://www.freepik.com/" target="_black">Freepik Vectors</a></h4>
          </div>
        </div>
        <div class="intro-item" style="background-image: url(/static/img/warp-02.png);">
          <div class="caption">
            <h2>DevLog</h2>
            <p class="m-b-3">개발과 관련된 다양한 생각을 기록하는 공간</p>
            <p>ARCHIVE</p>
            <router-link tag="a" class="button white transparent" to="/devlog" href="javascript:void(0)">Read More</router-link>
          </div>
          <div class="photocaption">
            <h4>Shot by <a href="https://www.freepik.com/" target="_black">Freepik Vectors</a></h4>
          </div>
        </div>
        <div class="intro-item" style="background-image: url(/static/img/warp-04.png);">
          <div class="caption">
            <h2>GitHub</h2>
            <p class="m-b-3">나만의 코딩 스타일을 살펴보는 곳</p>
            <p>REPOSITORIES</p>
            <a class="button white transparent" href="https://github.com/opzyra" target="_black">Read More</a>
          </div>
          <div class="photocaption">
            <h4>Shot by <a href="https://www.freepik.com/" target="_black">Freepik Vectors</a></h4>
          </div>
        </div>
      </div>
    </div>

    <div id="main">
      <section class="row-beetle section call-to-action">
        <div class="row-beetle-content buffer even">
          <p class="m-b-0">Hello world!</p>
          <p class="m-t-0">A place to study solid code like espresso</p>
        </div>
      </section>

      <section class="row-beetle section greyish">
        <div class="row-beetle-content buffer even clear-after">
          <div class="section-title"><h3>Skills</h3></div>
          <div class="column four">
            <div class="small-icon red"><img src="/static/img/java.png" class="img-rounded"></div>
            <div class="small-icon-text clear-after">
              <h4>Java</h4>
              <p class="text-xs">객체지향에 대한 이해를 바탕으로 상속과 인터페이스를 활용하며 코드의 흐름을 캐치할 수 있습니다.</p>
            </div>
          </div>
          <div class="column four">
            <div class="small-icon"><img src="/static/img/js.png" class="img-rounded"></div>
            <div class="small-icon-text clear-after">
              <h4>Javascript</h4>
              <p class="text-xs">자바스크립트의 기본적인 문법을 숙지하고 있고 ES6, Node.js, Front-Framework로 개발할 수 있습니다.</p>
            </div>
          </div>
          <div class="column four last">
            <div class="small-icon red"><img src="/static/img/html.png" class="img-rounded"></div>
            <div class="small-icon-text clear-after">
              <h4>HTML / CSS</h4>
              <p class="text-xs">다양한 태그와 속성을 적절하게 활용하여 원하는 형태의 웹 페이지를 구성할 수 있습니다.</p>
            </div>
          </div>
          <div class="column four">
            <div class="small-icon red"><img src="/static/img/spring.png" class="img-rounded"></div>
            <div class="small-icon-text clear-after">
              <h4>Spring</h4>
              <p class="text-xs">DI, AOP, Interceptor, Annotation을 활용하여 간단한 웹 어플리케이션을 개발할 수 있습니다.</p>
            </div>
          </div>
          <div class="column four">
            <div class="small-icon red"><img src="/static/img/vue.png" class="img-rounded"></div>
            <div class="small-icon-text clear-after">
              <h4>VueJS</h4>
              <p class="text-xs">기본적인 디렉티브와 ES6로 Router, Vuex를 적용하여 SPA을 개발할 수 있습니다.</p>
            </div>
          </div>
          <div class="column four last">
            <div class="small-icon red"><img src="/static/img/db.png" class="img-rounded"></div>
            <div class="small-icon-text clear-after">
              <h4>Database</h4>
              <p class="text-xs">웹 어플리케이션 개발에 필요한 CRUD, Join, Index와 같은 기본적인 개념을 알고 활용할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="row-beetle section text-light" style="background-color:#cec8bc">
        <div class="row-beetle-content buffer even clear-after">
          <div class="section-title"><h3>Interested</h3></div>
          <div class="testimonial-slider" data-autoplay="5000" data-pagination="true" data-transition="fade" data-autoheight="false">
            <div class="quote">
              <div class="column two">
                <figure class="testimonial-img">
                  <img src="/static/img/nodejs.png" alt="">
                </figure>
              </div>
              <div class="column ten last">
                <p>"NodeJS를 통해 REST API & JWT를 활용한 웹 서버를 구축에 관심을 가지고 공부하고 있습니다."</p>
                <div class="author">Node.JS</div>
              </div>
            </div>
            <div class="quote">
              <div class="column two">
                <figure class="testimonial-img">
                  <img src="/static/img/vue-native.png" alt="">
                </figure>
              </div>
              <div class="column ten last">
                <p>"VueJS를 통해 모바일 애플리케이션 개발이 가능한 Vue Native에 대해 찾아보고 공부하고 있습니다."</p>
                <div class="author">Vue Native</div>
              </div>
            </div>
            <div class="quote">
              <div class="column two">
                <figure class="testimonial-img">
                  <img src="/static/img/mongodb.png" alt="">
                </figure>
              </div>
              <div class="column ten last">
                <p>"RDB라는 틀에서 벗어난 JSON형태의 NoSQL을 프로젝트에 녹여내기 위해 찾아보고 있습니다."</p>
                <div class="author">MongoDB</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="row-beetle section">
        <div class="row-beetle-content buffer even clear-after">
          <div class="timeline-label column six">
            <h4>Work Experience</h4>
            <p>
              경력사항, 프로젝트 등<br>
              자세한 정보는 이력서에서 확인해주세요.
            </p>
            <a class="button transparent aqua" @click="resume">View on Resume</a>
          </div>
          <div class="timeline column six last">
            <div class="year">
              <time datetime="2018">2018</time>
              <div class="experience">
                <span class="circle"></span>
                <div class="experience-img"><img src="/static/img/datagen.png" alt=""></div>
                <div class="experience-info clear-after">
                  <h5>Datagen</h5>
                  <div class="role">Web Service Researcher</div>
                  <p class="m-b-0">2018.11 ~ Now (<span v-text="dataGenMonthCal"></span> months) Deajeon, Korea</p>
                  <p class="m-t-0">블록체인 기반 웹 서비스</p>
                </div>
              </div>
            </div>
            <div class="year">
              <time datetime="2017">2017</time>
              <div class="experience">
                <span class="circle"></span>
                <div class="experience-img"><img src="/static/img/nuvo.png" alt=""></div>
                <div class="experience-info clear-after">
                  <h5>NUVO Cyber Business</h5>
                  <div class="role">System Engineer</div>
                  <p class="m-b-0">2017.11 ~ 2018.04 (6 months) Tokyo, Japan</p>
                  <p class="m-t-0">일본 연금 프로젝트</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="row-beetle section text-light" style="background-color:#434A54">
        <div class="row-beetle-content buffer even clear-after">
          <div class="section-title"><h3>PORTFOLIO</h3></div>
          <div class="slider desktop-slider white-controls" data-autoplay="3000">
            <figure>
              <div><img src="/static/img/atsumari.png" alt=""></div>
              <div><img src="/static/img/jtalk.png" alt=""></div>
              <div><img src="/static/img/endorphin.png" alt=""></div>
              <div><img src="/static/img/jabis.png" alt=""></div>
              <div><img src="/static/img/fcallvan-resize.png" alt=""></div>
            </figure>
          </div>
        </div>
      </section>

      <section class="row-beetle section call-to-action buffer even clear-after">
        <div class="row-beetle-content">
          <div class="related clear-after">
          <div class="section-title"><h3>DEVLOG</h3></div>
          <p class="centertxt">개발과 관련된 다양한 생각을 기록하는 공간입니다.</p>
          <div class="m-t-40 buffer even animation">
            <div class="column three">
            <div class="count-item">
              <div class="small-icon red"><i class="nc-icon nc-atom"></i></div>
              <div class="count-number" data-from="0" :data-to="devlogCount.topic" data-speed="1000" data-refresh-interval="25"></div>
              <div class="count-subject">Topics</div>
            </div>
          </div>
          <div class="column three">
            <div class="count-item">
              <div class="small-icon red"><i class="mdi mdi-console"></i></div>
              <div class="count-number" data-from="0" :data-to="devlogCount.feed" data-speed="1500" data-refresh-interval="25"></div>
              <div class="count-subject">Feeds</div>
            </div>
          </div>
          <div class="column three">
            <div class="count-item">
              <div class="small-icon red"><i class="mdi mdi-pound"></i></div>
              <div class="count-number" data-from="0" :data-to="devlogCount.tag" data-speed="2000" data-refresh-interval="25"></div>
              <div class="count-subject">Tags</div>
            </div>
          </div>
          <div class="column three last">
            <div class="count-item">
              <div class="small-icon red"><i class="mdi mdi-comment-processing-outline"></i></div>
              <div class="count-number" data-from="0" :data-to="devlogCount.comment" data-speed="2500" data-refresh-interval="25"></div>
              <div class="count-subject">Comments</div>
            </div>
          </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import info from '../api/info'

export default {
  data () {
    return {
      devlogCount: {}
    }
  },
  created () {
    info.devlogCount().then(res => {
      this.devlogCount = res
    })
  },
  computed: {
    ...mapState('main', [ 'resumePublished' ]),
    dataGenMonthCal () {
      return new Date(
        new Date().getTime() - new Date('2018-11-01').getTime()
      ).getMonth()
    }
  },
  methods: {
    resume () {
      if (!this.resumePublished) {
        const title = '열람 불가'
        const text = '이력서가 비공개 상태입니다.'
        this.$swal({title, text, type: 'error', confirmButtonText: '확인'})
      }
    }
  }
}
</script>

<style>
</style>
