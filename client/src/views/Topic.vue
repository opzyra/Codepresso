<template>
  <div>
    <div id="intro-wrap">
      <div id="intro" class="preload darken">
        <div class="intro-item" style="background-image: url(/img/warp-02.png);">
          <div class="caption">
            <h2>DevLog</h2>
            <p>개발과 관련된 다양한 생각을 기록하는 공간</p>
          </div>
          <div class="photocaption">
            <h4>Shot by <a href="https://www.freepik.com/" target="_blank">Freepik Vectors</a></h4>
          </div>
        </div>
      </div>
    </div>

    <div id="main" class="single single-post topic-detail">
      <section class="row-beetle section ">
        <div class="row-beetle-content buffer-left buffer-right buffer-bottom">
          <div id="post-nav">
            <ul class="clear-after reset plain">
              <li id="prev-items" class="post-nav">
                <a v-if="prev != 0" @click="moveTopic(prev)">
                  <i class="fa fa-chevron-left"></i><span class="label">Prev</span>
                </a>
              </li>
              <li id="all-items" class="post-nav" @click="moveTopicMain"><a><i class="icon icon-images"></i></a></li>
              <li id="next-items" class="post-nav">
                <a v-if="next != 0" @click="moveTopic(next)">
                  <span class="label">Next</span><i class="fa fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </div>
          <fade-transition origin="center" mode="out-in" :duration="1000">
            <TopicDetail :topic="topic" :idx="idx" v-if="reload"></TopicDetail>
          </fade-transition>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import topic from '../api/topic'

import TopicDetail from '../components/TopicDetail'

export default {
  components: {
    TopicDetail
  },
  data () {
    return {
      idx: 0,
      prev: 0,
      next: 0,
      topic: [],
      reload: false
    }
  },
  computed: {
    ...mapGetters('auth', ['role'])
  },
  created () {
    this.idx = this.$route.params.idx
    this.featchTopic(this.idx)
  },
  watch: {
    '$route': {
      deep: true,
      handler: function (to, from) {
        this.reload = false
        this.idx = to.params.idx
        this.featchTopic(this.idx)
      }
    }
  },
  methods: {
    featchTopic (idx) {
      topic.findByPk(idx).then(res => {
        if (res === null) this.$router.push('/not-found')
        this.topic = res.topic
        this.prev = res.page.prev
        this.next = res.page.next
        this.reload = true
      })
    },
    convertThumbnail (path) {
      return path.replace('thumb', 'image')
    },
    moveTopicMain () {
      this.$router.push('/devlog')
    },
    moveTopic (idx) {
      this.reload = false
      this.fade = !this.fade
      this.idx = idx
      this.$router.push(`/devlog/topic/${idx}`)
    },
    onEditorLoad () {
      setTimeout(() => {
        const a = document.querySelector('.tui-editor-contents').querySelectorAll('a')
        a.forEach(e => {
          let pathName = e.pathname
          if (pathName.indexOf('/devlog/feed/') === 0) {
            e.setAttribute('href', 'javascript:void(0)')
            e.addEventListener('click', () => {
              this.$router.push(pathName)
            })
          } else {
            e.setAttribute('target', '_blank')
          }
        })
      }, 500)
    }
  }
}
</script>

<style>
.topic-detail .contents-thumbnail img {
  width: 100%;
}
.topic-detail .update-btn {
  position: absolute;
  top: 0px;
  right: 0px;
}
.topic-detail .article {
  position: relative;
}
</style>
