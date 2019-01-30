<template>
  <div class="devlog">
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
      <TopicList></TopicList>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopicList from '../components/TopicList'
import topic from '../api/topic'
import feed from '../api/feed'

export default {
  components: {
    TopicList
  },
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
      topicCount: 0,
      feedCount: 0,
      page: 1,
      topics: [],
      feeds: [],
      loading: false,
      style: {
        margin: '0 auto',
        marginTop: '30px'
      },
      meta: {
        title: 'Codepresso | DevLog',
        keywords: '웹개발, 프론트엔드, 백엔드, 개발자 블로그, 포트폴리오',
        description: 'WEB Developer HYUN HO - A place to study solid code like espresso',
        url: 'https://codepresso.net',
        image: 'https://codepresso.net/img/og.png'
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
    moveTopicDetail (idx) {
      this.$router.push(`/devlog/topic/${idx}`)
    },
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
