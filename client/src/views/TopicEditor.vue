<template>
  <div>
    <div>
      <div class="markdown-header">
        <div class="title-area">
          <div class="icon-area">
            <i class="mdi mdi-arrow-left back-button" @click="back"></i>
          </div>
          <input placeholder="제목을 입력해주세요" v-model="title" id="editorTitle">
        </div>
      </div>
      <markdown-editor v-model="contents" preview-class="markdown-body" ref="markdownEditor" :configs="configs" :highlight="true"></markdown-editor>
    </div>
    <quick-menu :menu-count="count" :icon-class="icons" :menu-url-list="list" :background-color="backgroundColor" :color="color" :position="position" :is-open-new-tab="isOpenNewTab" @process="process"></quick-menu>
    <input type="file" name="image" ref="image" style="visibility:hidden;" @change="imageUpload">
    <slideout-panel></slideout-panel>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import quickMenu from 'vue-quick-menu'
import { vueSlideoutPanelService } from 'vue2-slideout-panel'

import image from '../api/image'
import topic from '../api/topic'

window.hljs = hljs

export default {
  components: {
    markdownEditor,
    quickMenu
  },
  data () {
    return {
      simplemde: null,
      title: '',
      contents: '',
      configs: {
        autoDownloadFontAwesome: true,
        autofocus: false,
        placeholder: '토픽의 내용을 적어주세요'
      },

      count: 4,
      icons: ['mdi mdi-lead-pencil', 'mdi mdi-image-plus', 'mdi mdi-link-variant', 'mdi mdi-database-import'],
      list: [{ 'isLink': false }, { 'isLink': false }, { 'isLink': false }, { 'isLink': false }],
      backgroundColor: '#4158d0',
      color: '#ffffff',
      position: 'bottom-right',
      isOpenNewTab: false,

      feeds: [],
      access: true,
      thumbnail: null,
      description: ''
    }
  },
  created () {
    // if(!!localStorage.smde_codepresso) {
    //   this.contents = localStorage.smde_codepresso
    // }
    if (this.$route.params.idx) {
      topic.findByPk(this.$route.params.idx).then(res => {
        const topic = res.topic
        this.title = topic.title
        this.contents = topic.contents
        this.feeds = topic.feeds
        this.access = topic.access
        this.thumbnail = topic.thumbnail
        this.description = topic.description
      })
    }
  },
  mounted () {
    this.simplemde = this.$refs.markdownEditor.simplemde
    this.simplemde.cleanBlock()
    this.simplemde.toggleFullScreen()
    if (window.innerWidth > 768) {
      this.simplemde.toggleSideBySide()
    }

    setTimeout(() => this.simplemde.value(this.contents), 1500)
    setInterval(() => {
      this.autoTitle()
    }, 500)
  },
  methods: {
    back () {
      history.back()
    },
    autoTitle () {
      if (window.innerWidth > 768 && !!this.$el.querySelector('#preview-title')) {
        this.$el.querySelector('#preview-title').innerHTML = this.title === '' ? '제목을 입력해주세요' : this.title
      }
    },
    process (param) {
      switch (param) {
        case 0: {
          this.showTopicWriteSlide()
          break
        }
        case 1: {
          this.$refs.image.click()
          break
        }
        case 2: {
          this.showFeedSlide()
          break
        }
        case 3: {
          this.showTempSlide()
          break
        }
      }
      // this.contents = '바꾼다'
    },
    imageUpload (event) {
      let files = event.target.files
      if (files.length === 0) return

      let form = new FormData()
      form.append('image', files[0])

      image.upload('/image', form).then(data => {
        let mark = this.simplemde.value()
        let fileName = data.fileName
        let img = 'https://codepresso.net' + data.path
        let newMark = mark + `![${fileName}](${img})`
        this.simplemde.value(newMark)
        document.querySelector('.core-menu').click()
      }).catch(() => {
        this.$swal({title: '서버 장애', text: '이미지 업로드에 실패하였습니다.', type: 'error', confirmButtonText: '확인'})
      })
    },
    showTopicWriteSlide () {
      const panel = vueSlideoutPanelService.show({
        component: 'topic-write-slide',
        width: '500px',
        keepAlive: false,
        disableBgClick: true,
        props: {
          simplemde: this.simplemde,
          feeds: this.feeds,
          thumbnail: this.thumbnail,
          title: this.title,
          contents: this.contents,
          access: this.access,
          description: this.description
        }
      })

      panel.promise
        .then(results => {
          this.feeds = results.feeds
          this.thumbnail = results.thumbnail
          this.access = results.access
          this.description = results.description
          console.log('Results for panel 1:', results)
        })
    },
    showFeedSlide () {
      const panel = vueSlideoutPanelService.show({
        component: 'feed-slide',
        width: '500px',
        keepAlive: false,
        disableBgClick: true,
        props: {
          feeds: this.feeds,
          simplemde: this.simplemde
        }
      })

      panel.promise
        .then(results => {
          this.feeds = results.feeds
          console.log('Results for panel 1:', results)
        })
    },
    showTempSlide () {
      const panel1Handle = vueSlideoutPanelService.show({
        component: 'temp-slide',
        width: '500px',
        keepAlive: true,
        disableBgClick: true,
        props: {}
      })

      panel1Handle.promise
        .then(results => {
          console.log('Results for panel 1:', results)
        })
    }
  }
}
</script>

<style>
@import 'github-markdown-css';
@import '../assets/css/atom-one-light.css';
.CodeMirror-fullscreen {
  top: 65px !important;
}
.back-button:hover {
  cursor: pointer;
  opacity: 0.6;
}
.editor-toolbar {
  display: none !important;
}
.editor-preview-side {
  border-top: 0px !important;
}
.editor-statusbar {
  display: none !important;
}
.markdown-header {
  height: 65px;
  background: #4158d0;
}
.markdown-body img {
  max-width: 100%;
  display: block;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  pointer-events: none;
}
.title-area {
  flex: 1 1;
  margin-left: 1rem;
  margin-right: 1rem;
  display: -ms-flexbox;
  display: flex;
  padding-top: 8px;
}
.title-area input {
  -ms-flex: 1 1 !important;
  flex: 1 1 !important;
  background: none !important;
  outline: 0 !important;
  border: none !important;
  font-size: 1.25rem !important;
  color: #fff !important;
  margin-top: 6px !important;
  max-width: 100% !important;
}
.icon-area {
  font-size: 28px;
  margin-right: 12px;
  color: white;
}
.quick-menu {
  z-index: 10;
}
#editorTitle::-webkit-input-placeholder { /* 크롬 4–56 */
    color: #ffffff;
}
#editorTitle::-moz-placeholder { /* 파이어폭스 4–18 */
   color: #ffffff;
   opacity:  1;
}
#editorTitle::-moz-placeholder { /* 파이어폭스 19–50 */
   color: #fffffa;
   opacity:  1;
}
#editorTitle::-ms-input-placeholder { /* 인터넷 익스플로러 10+ */
   color:  #ffffff;
}
#editorTitle::placeholder { /* 파이어폭스 51+, 크롬 57+ */
   color: #ffffff;
   opacity:  1;
}
.editor-preview-active-side {
  padding: 0px 20px !important;
  margin-top: 95px !important;
  border-top: 0px !important;
}
.editor-preview-title {
  height: 80px;
  overflow-y: hidden;
  border-bottom: 0px solid #ddd;
  padding: 20px !important;
  position: fixed;
  bottom: 0;
  width: 50%;
  top: 65px;
  right: 0;
  z-index: 9;
  border: 1px solid #ddd;
  background: #fafafa;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-bottom: 0px;
}
.CodeMirror .cm-spell-error:not(.cm-url):not(.cm-comment):not(.cm-tag):not(.cm-word) {
    background: none !important;
}
</style>
