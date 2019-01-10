<template>
  <div>
    <div class="post-area clear-after">
      <article class="article" role="main">
        <h5 class="meta-post"><time>{{ topic.regDate | moment('YYYY. MM. DD HH:mm:ss') }}</time> - Codepresso Topic Written By <a href="https://github.com/opzyra" target="_blank">opzyra</a></h5>
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

export default {
  components: {
    Viewer
  },
  props: ['topic', 'idx'],
  computed: {
    ...mapGetters('auth', ['role'])
  },
  methods: {
    convertThumbnail (path) {
      return path.replace('thumb', 'image')
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
