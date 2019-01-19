<template>
  <div>
    <div id="main" class="blog list-style">
      <section class="row-beetle section">
        <div class="row-beetle-content buffer-left buffer-right buffer-bottom clear-after" style="padding-top: 3%;">
          <div class="column nine">
            <!--<transition-group name="list" tag="div"></transition-group>-->
            <article class="clear-after" v-for="(item, idx) in topics" :key="idx">
              <div class="column three">
                <figure>
                  <img v-if="item.thumbnail != null" :src="item.thumbnail" :alt="item.title">
                  <img v-else src="/img/default_thumbnail.png" :alt="item.title">
                </figure>
              </div>
              <div class="column nine last">
                <h2><router-link :to="`/devlog/topic/${item.idx}`" tag="a" v-text="item.title"></router-link></h2>
                <h5 class="meta-post"><time v-text="dateFormat(item.regDate)"></time> - Codepresso Topic Written By <a href="https://github.com/opzyra" target="_blank">opzyra</a></h5>
                <p v-text="item.description"></p>
              </div>
            </article>

            <figure id="pagination" class="pagination">

            </figure>
          </div>
          <aside role="complementary" class="sidebar column three last">
            <div class="widget widget_search">
              <form role="search">
                <span class="pre-input"><i class="icon icon-search"></i></span>
                <input type="text" placeholder="Search..." value="" class="plain buffer">
              </form>
            </div>
            <div class="widget">
              <h4>About the DevLog</h4>
              <div class="textwidget">
                개발에 대한 모든 자료, 생각을 정리하는 기록저장소입니다.
              </div>
            </div>
            <div class="widget">
              <h4>Recent Feeds</h4>
              <ul class="plain">
                <li v-for="(item, idx) in feeds" :key="idx" class="text-hidden">
                  <router-link :to="`/devlog/feed/${item.idx}`" tag="a" v-text="item.title"></router-link>
                </li>
              </ul>
            </div>
            <div class="widget" v-if="role === 'ROLE_ADMIN'">
              <h4>Management</h4>
              <ul class="plain">
                <li><router-link to="/devlog/topic/editor" tag="a">Topic Editor</router-link></li>
                <li><router-link to="/devlog/feed/editor" tag="a">Feed Editor</router-link></li>
              </ul>
            </div>
          </aside>
        </div><!-- row-content -->
      </section>
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <div slot="spinner"></div>
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { mapGetters } from 'vuex'

import topic from '../api/topic'
import feed from '../api/feed'

import moment from 'moment'

export default {
  components: {
    InfiniteLoading
  },
  data () {
    return {
      topicCount: 0,
      feedCount: 0,
      page: 1,
      topics: [],
      feeds: [],
      loading: false,
      style: {
        margin: '0 auto',
        marginTop: '30px'
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['role'])
  },
  created () {
    topic.findAndCountAll(1, 7).then(res => {
      this.topicCount = res.count
      this.topics = this.topics.concat(res.rows)
    })
    feed.findAndCountAll(5).then(res => {
      this.feeds = res.rows
      this.feedCount = res.count
    })
  },
  methods: {
    infiniteHandler ($state) {
      this.loading = true
      let limit = this.page * 8
      topic.findAndCountAll(limit, 7).then(res => {
        if (res.rows.length) {
          this.page += 1
          this.topicCount = res.count
          setTimeout(() => {
            this.topics.push(...res.rows)
            $state.loaded()
            this.loading = false
          }, Math.floor(Math.random() * Math.floor(2000)))
        } else {
          $state.complete()
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    dateFormat (date) {
      return moment(date).format('YYYY. MM. DD HH:mm:ss')
    }
  }
}
</script>

<style>
.list-enter-active,
.list-leave-active,
.list-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}
.devlog .text-hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
