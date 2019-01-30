<template>
  <div>
    <div id="intro-wrap">
      <div id="intro" class="preload darken more-button">
          <div class="intro-item" style="background-image: url(/img/warp-03.png);">
            <div class="caption">
              <h2>Portfolio</h2>
              <p>다양한 기술을 공부하며 개발한 애플리케이션</p>
            </div>
            <div class="photocaption">
              <h4>Shot by <a href="https://www.freepik.com/" target="_blank">Freepik Vectors</a></h4>
            </div>
          </div>
        </div>
      </div>

    <div id="main">
      <section class="row-beetle section call-to-action">
        <div class="row-beetle-content buffer even">
          <p class="m-b-0">프로젝트를 통해 성장합니다 !</p>
          <p class="m-t-0">웹 개발 기술 스택을 바탕으로 다양한 애플리케이션을 개발하였습니다.</p>
        </div>
      </section>

      <section class="row-beetle" style="background-color: #cec8bc">
        <div class="row-beetle-content buffer even clear-after">
          <div class="column four centertxt">
            <img v-lazy="`/img/java.png`" class="img-rounded img-stack`">
            <div class="big-icon-text clear-after">
              <h4>Java</h4>
              <p class="text-s">객체에 대한 기본 개념을 DRY한 코드 구현을 위해 노력하며 리펙토링과 디자인 패턴에 많은 관심을 가지고 개발합니다.</p>
              <a class="button transparent black" href="javascript:void(0)" v-scroll-to="{ element: '#java', duration: 2000 }">Read more</a>
            </div>
          </div>
          <div class="column four centertxt">
            <img v-lazy="`/img/spring.png`" class="img-rounded img-stack`">
            <div class="big-icon-text clear-after">
              <h4>Spring</h4>
              <p class="text-s">CRUD 기반의 애플리케이션 개발을 위한 기본 환경설정을 구축하고 DI, AOP등의 Spring의 특징을 살려 개발합니다.</p>
              <a class="button transparent black" href="javascript:void(0)" v-scroll-to="{ element: '#spring', duration: 2000 }">Read more</a>
            </div>
          </div>
          <div class="column four last centertxt">
            <img v-lazy="`/img/js.png`" class="img-rounded img-stack`">
            <div class="big-icon-text clear-after">
              <h4>Javascript</h4>
              <p class="text-s">ES6, NodeJS, VueJS에 대한 함수형 프로그래밍에 대한 이해를 바탕으로 SPA/REST기반의 웹 애플리케이션을 개발합니다.</p>
              <a class="button transparent black" href="javascript:void(0)" v-scroll-to="{ element: '#js', duration: 2000 }">Read more</a>
            </div>
          </div>
        </div>
      </section>
      <section class="row-beetle section promo" id="java">
        <div class="row-beetle-content buffer even clear-after">
          <div class="side-mockup right-mockup animation">
            <img src="/img/promo-1.png" class="floating" alt="">
          </div>
          <div class="column six">
            <img v-lazy="`/img/java.png`" class="promo-stack">
            <h2 class="promo-title">JTalk<small>JSL연수원 내부 커뮤니티</small></h2>
            <p>연수원 팀 프로젝트로 대나무숲, 정보마당, 장터등을 구현한 커뮤니티 웹 어플리케이션입니다. 주로 프로그램 설계와 화면을 담당하여 작업했습니다.</p>
            <ul class="list-unstyled mt-4 mb-3">
              <li class="p-t-10 p-b-10">
              <div class="d-flex align-items-center">
                <span class="badge mr-10 badge-primary badge-circle"><i class="fa fa-cube"></i></span>
                <h5 class="m-b-0 m-t-0 font-sans">JAVA, JSP/Servlet MVC2, AJAX, MySQL</h5>
              </div>
              </li>
              <li class="p-t-10 p-b-10">
              <div class="d-flex align-items-center">
                <span class="badge mr-10 badge-primary badge-circle"><i class="fa fa-html5"></i></span>
                <h5 class="m-b-0 m-t-0 font-sans">HTML, CSS, Bootstrap, JQuery</h5>
              </div>
              </li>
              <li class="p-t-10 p-b-10">
              <div class="d-flex align-items-center">
                <span class="badge mr-10 badge-primary badge-circle"><i class="fa fa-calendar"></i></span>
                <h5 class="m-b-0 m-t-0 font-sans">2017.08.27 ~ 2017.10.08</h5>
              </div>
              </li>
            </ul>
            <a class="button transparent black" href="https://github.com/opzyra/JTalk" target="_blank">GITHUB</a>
          </div>
        </div>
      </section>
      <section class="row-beetle section promo" id="spring">
        <div class="row-beetle-content buffer even clear-after">
          <div class="side-mockup right-mockup animation">
            <img src="/img/promo-2.png" class="floating" alt="">
          </div>
          <div class="column six">
            <img v-lazy="`/img/spring.png`" class="promo-stack">
            <h2 class="promo-title">JABIS<small>종합학원 학생/강사 통합관리 프로그램</small></h2>
            <p>개인프로젝트로 학원의 강사와 학생 데이터를 통한 통합 관리 솔루션입니다. 현재 AWS EC2 + RDS + ELB로 배포하여 서비스 중이며 유지보수를 진행하고 있습니다.</p>
            <ul class="list-unstyled mt-4 mb-3">
              <li class="p-t-10 p-b-10">
              <div class="d-flex align-items-center">
                <span class="badge mr-10 badge-primary badge-circle"><i class="fa fa-cube"></i></span>
                <h5 class="m-b-0 m-t-0 font-sans">SpringBoot, Security, RestAPI, Mybatis, MySQL</h5>
              </div>
              </li>
              <li class="p-t-10 p-b-10">
              <div class="d-flex align-items-center">
                <span class="badge mr-10 badge-primary badge-circle"><i class="fa fa-html5"></i></span>
                <h5 class="m-b-0 m-t-0 font-sans">HTML, CSS, Bootstrap, JQuery, Thymeleaf, VueJS</h5>
              </div>
              </li>
              <li class="p-t-10 p-b-10">
              <div class="d-flex align-items-center">
                <span class="badge mr-10 badge-primary badge-circle"><i class="fa fa-calendar"></i></span>
                <h5 class="m-b-0 m-t-0 font-sans">2018.08.01 ~ 2018.09.04</h5>
              </div>
              </li>
            </ul>
            <a class="button transparent black" href="https://github.com/opzyra/JABIS" target="_blank">GITHUB</a>
          </div>
        </div>
      </section>
      <section class="row-beetle section promo" id="js">
        <div class="row-beetle-content buffer even clear-after">
          <div class="side-mockup right-mockup animation">
            <img src="/img/promo-4.png" class="floating" alt="">
          </div>
          <div class="column six">
            <img v-lazy="`/img/js.png`" class="promo-stack">
            <h2 class="promo-title">Codepresso<small>포트폴리오 및 블로그</small></h2>
            <p>개인프로젝트로 자료 정리 목적의 블로그와 포트폴리오 랜딩페이지를 겸한 웹사이트 입니다. ES6, NodeJS, VueJS 학습 후 실습형 프로젝트로 1차 개발이 완료되었습니다.</p>
            <ul class="list-unstyled mt-4 mb-3">
              <li class="p-t-10 p-b-10">
              <div class="d-flex align-items-center">
                <span class="badge mr-10 badge-primary badge-circle"><i class="fa fa-cube"></i></span>
                <h5 class="m-b-0 m-t-0 font-sans">NodeJS, Express, ES6, RestAPI, Sequelize, MySQL</h5>
              </div>
              </li>
              <li class="p-t-10 p-b-10">
              <div class="d-flex align-items-center">
                <span class="badge mr-10 badge-primary badge-circle"><i class="fa fa-html5"></i></span>
                <h5 class="m-b-0 m-t-0 font-sans">HTML, CSS, VueJS</h5>
              </div>
              </li>
              <li class="p-t-10 p-b-10">
              <div class="d-flex align-items-center">
                <span class="badge mr-10 badge-primary badge-circle"><i class="fa fa-calendar"></i></span>
                <h5 class="m-b-0 m-t-0 font-sans">2018.12.01 ~ 진행중</h5>
              </div>
              </li>
            </ul>
            <a class="button transparent black" href="https://github.com/opzyra/Codepresso" target="_blank">GITHUB</a>
          </div>
        </div>
      </section>

      <section class="c section greyish">
        <div class="row-beetle-content buffer even clear-after">
          <div class="section-title"><h3>More</h3></div>
          <p class="centertxt">상단의 대표 포트폴리오 이외에도 웹 개발 관련 기술을 공부하며 개발한 애플리케이션이 더 있습니다.<br>
          프로젝트를 클릭하시면 해당 GitHub를 확인할 수 있습니다.</p>
          <!--
          <div class="chart" data-percent="79" data-bar-color="#ffce54" data-animate="2500">
            <div class="chart-content">
              <div class="percent"></div>
              <div class="chart-title">Front-End</div>
            </div>
          </div>
          <div class="chart" data-percent="63" data-bar-color="#fd685b" data-animate="2000">
            <div class="chart-content">
              <div class="percent"></div>
              <div class="chart-title">Back-End</div>
            </div>
          </div>
          <div class="chart" data-percent="48" data-bar-color="#a0d468" data-animate="3000">
            <div class="chart-content">
              <div class="percent"></div>
              <div class="chart-title">Database</div>
            </div>
          </div>
          <div class="chart" data-percent="32" data-bar-color="#ac92ec" data-animate="3500">
            <div class="chart-content">
              <div class="percent"></div>
              <div class="chart-title">Network</div>
            </div>
          </div>
          -->
        </div>
      </section>

      <section class="row-beetle portfolio">
        <div class="row-beetle-content buffer clear-after">
          <ul class="inline cats filter-options">
            <li data-group="all" class="active">ALL</li>
            <li data-group="java">JAVA</li>
            <li data-group="jsp">JSP / SERVLET</li>
            <li data-group="spring">SPRING</li>
            <li data-group="html">HTML/CSS</li>
            <li data-group="javascript">JAVASCRIPT</li>
          </ul>
          <div class="grid-items portfolio-section preload">
            <article class="item column four" data-groups='["all", "java"]'>
              <figure><img src="/img/calwMachine.png" alt=""></figure>
              <a class="overlay" href="https://github.com/opzyra/CalwMachine" target="_blank">
                <div class="overlay-content">
                  <div class="post-type"><i class="icon icon-search"></i></div>
                  <h2>CalwMachine</h2>
                  <p>Java Swing Component<br>랜덤 추첨 애플리케이션</p>
                </div>
              </a>
            </article>
            <article class="item column eight" data-groups='["all", "java", "jsp"]'>
              <figure><img src="/img/atsumari.png" alt=""></figure>
              <a class="overlay" href="https://github.com/opzyra/Atsumari" target="_blank">
                <div class="overlay-content">
                  <div class="post-type"><i class="icon icon-search"></i></div>
                  <h2>Atsumari</h2>
                  <p>JSP/Servlet MVC Model1<br>모임중계 플랫폼 웹 애플리케이션</p>
                </div>
              </a>
            </article>
            <article class="item column four" data-groups='["all", "javascript"]'>
              <figure><img src="/img/callsearch.png" alt=""></figure>
              <a class="overlay" href="https://github.com/opzyra/CallSearch" target="_blank">
                <div class="overlay-content">
                  <div class="post-type"><i class="icon icon-search"></i></div>
                  <h2>CallSearch</h2>
                  <p>ES5 + NodeJS + Express<br>화물정보 크롤링 애플리케이션</p>
                </div>
              </a>
            </article>
            <article class="item column eight" data-groups='["all", "java", "spring"]'>
              <figure><img src="/img/endorphin.png" alt=""></figure>
              <a class="overlay" href="https://github.com/opzyra/Endorphin" target="_blank">
                <div class="overlay-content">
                  <div class="post-type"><i class="icon icon-search"></i></div>
                  <h2>Endorphin</h2>
                  <p>Spring Web MVC<br>개발자 이력서 생성 웹 애플리케이션</p>
                </div>
              </a>
            </article>
            <article class="item column eight" data-groups='["all", "html", "javascript"]'>
              <figure><img src="/img/fcallvan.png" alt=""></figure>
              <a class="overlay" href="https://fcallvan.github.io/" target="_blank">
                <div class="overlay-content">
                  <div class="post-type"><i class="icon icon-search"></i></div>
                  <h2>Fcallvan</h2>
                  <p>Bootstrap + jQuery<br>구글 애널리틱스 연동 개인 사업자 랜딩 페이지</p>
                </div>
              </a>
            </article>
            <article class="item column four" data-groups='["all", "java", "spring"]'>
              <figure><img src="/img/pm.png" alt=""></figure>
              <a class="overlay" href="https://github.com/opzyra/ProjectManager" target="_blank">
                <div class="overlay-content">
                  <div class="post-type"><i class="icon icon-search"></i></div>
                  <h2>ProjectManager</h2>
                  <p>Springboot + JPA<br>간단한 프로젝트 관리 웹 애플리케이션</p>
                </div>
              </a>
            </article>
            <div class="shuffle-sizer four"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
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
        title: 'Codepresso | Portfolio',
        keywords: '웹개발, 프론트엔드, 백엔드, 개발자 블로그, 포트폴리오',
        description: 'WEB Developer HYUN HO - A place to study solid code like espresso',
        url: 'https://codepresso.net',
        image: 'https://codepresso.net/img/og.png'
      }
    }
  }
}
</script>

<style>
</style>
