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

    <div id="main" class="single single-post feed-warp">
      <section class="row-beetle section ">
        <div class="row-beetle-content buffer-left buffer-right buffer-bottom">
          <div id="post-nav">
            <ul class="clear-after reset plain">
              <li id="prev-items" class="post-nav">
                <a v-if="prev != 0" @click="moveFeed(prev)">
                  <i class="fa fa-chevron-left"></i><span class="label">Prev</span>
                </a>
              </li>
              <li id="all-items" class="post-nav" @click="moveTopicMain"><a><i class="icon icon-images"></i></a></li>
              <li id="next-items" class="post-nav">
                <a v-if="next != 0" @click="moveFeed(next)">
                  <span class="label">Next</span><i class="fa fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </div>
          <fade-transition origin="center" mode="out-in" :duration="1000">
            <FeedDetail :feed="feed" :idx="idx" v-if="reload"></FeedDetail>
          </fade-transition>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import feed from '../api/feed'

import FeedDetail from '../components/FeedDetail'

export default {
  components: {
    FeedDetail
  },
  data () {
    return {
      feed: {},
      idx: 0,
      prev: 0,
      next: 0,
      reload: false
    }
  },
  watch: {
    '$route': {
      deep: true,
      handler: function (to, from) {
        this.reload = false
        this.idx = to.params.idx
        this.featchFeed(this.idx)
      }
    }
  },
  created () {
    this.idx = this.$route.params.idx
    this.featchFeed(this.idx)
  },
  methods: {
    featchFeed (idx) {
      feed.findByPk(idx).then(res => {
        if (res === null) this.$router.push('/not-found')
        this.feed = res.feed
        this.prev = res.page.prev
        this.next = res.page.next
        this.reload = true
      })
    },
    moveTopicMain () {
      this.$router.push('/devlog')
    },
    moveFeed (idx) {
      this.reload = false
      this.idx = idx
      this.$router.push(`/devlog/feed/${idx}`)
    }
  }
}
</script>

<style>
.feed-warp .meta-post .tags {
  margin: 0px;
  display: -ms-inline-flexbox;
  display: inline-flex;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #495057;
  padding: .5rem;
  font-size: .75rem;
  font-weight: 500;
  line-height: .75rem;
  border-radius: 4px;
}
.feed-warp .comment-login {
  font-size: 15px;
  margin-bottom: 1.5rem;
}
.feed-warp .comment-login a {
  color: #4158d0;
  text-decoration: none;
}
.feed-warp .comment-login a:hover {
  text-decoration: underline;
}
.feed-warp .update-btn {
  position: absolute;
  top: -8px;
  right: 0px;
}
.feed-warp .article {
  position: relative;
}
</style>
