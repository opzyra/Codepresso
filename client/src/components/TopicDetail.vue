<template>
  <div>
    <div class="post-area clear-after">
      <article class="article" role="main">
        <h5 class="meta-post"><time v-text="dateFormat(topic.regDate)"></time> - Topic
          <div class="inline m-l-8 m-r-8"><i class="mdi mdi-cursor-default-click m-r-3"></i><span v-text="topic.hit"></span></div>
          <div class="inline"><i class="mdi mdi-link-variant m-r-3"></i><span v-text="topic.feeds.length"></span></div>
        </h5>
        <h1 v-text="topic.title"></h1>
        <div class="update-btn" v-if="role === 'ROLE_ADMIN'">
          <router-link :to="`/devlog/topic/editor/${idx}`" tag="a" class="button transparent blue xs"><i class="mdi mdi-square-edit-outline"></i>수정</router-link>
        </div>
        <div class="contents-thumbnail">
          <img v-if="topic.thumbnail != null" :src="convertThumbnail(topic.thumbnail)" :alt="topic.title">
        </div>
        <viewer
        :value="topic.contents"
        @load="onEditorLoad"
        />
      </article>
    </div>
  </div>
</template>

<script>
import { Viewer } from '@toast-ui/vue-editor'
import { mapGetters } from 'vuex'

import moment from 'moment'

export default {
  components: {
    Viewer
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
  props: ['topic', 'idx'],
  data () {
    return {
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
    this.setMeta()
  },
  methods: {
    setMeta () {
      this.meta.title = this.topic.title
      this.meta.description = this.topic.description
      this.meta.keywords = this.topic.title
    },
    convertThumbnail (path) {
      return path.replace('thumb', 'image')
    },
    onEditorLoad () {
      setTimeout(() => {
        const a = document.querySelector('.tui-editor-contents').querySelectorAll('a')
        a.forEach(e => {
          let pathName = e.pathname
          if (pathName.indexOf('/devlog/feed/') === 0) {
            e.addEventListener('click', () => {
              event.preventDefault()
              this.$router.push(pathName)
            })
          } else {
            e.setAttribute('target', '_blank')
          }
        })
      }, 500)
    },
    dateFormat (date) {
      return moment(date).format('YYYY. MM. DD HH:mm:ss')
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
