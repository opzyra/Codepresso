<template>
  <div>
    <div class="post-area clear-after">
      <article class="article" role="main">
        <h5 class="meta-post"><time v-text="dateFormat(feed.regDate)"></time> - Feed
          <div class="inline m-r-8 m-l-8"><i class="mdi mdi-cursor-default-click m-r-3"></i><span v-text="feed.hit"></span></div>
          <div class="inline m-r-8"><i class="mdi mdi-link-variant m-r-3"></i><span v-text="feed.refers.length"></span></div>
          <div class="inline"><i class="mdi mdi-comment-processing-outline m-r-3"></i><span v-text="comment.length"></span></div>
        </h5>
        <h1 v-text="feed.title"></h1>
        <div class="update-btn" v-if="role === 'ROLE_ADMIN'">
          <router-link :to="`/devlog/feed/editor/${idx}`" tag="a" class="button transparent blue xs m-r-0"><i class="mdi mdi-square-edit-outline"></i>수정</router-link>
        </div>
        <viewer
        :value="feed.contents"
        @load="onEditorLoad"
        />
      </article>

    </div><!-- post-area -->

    <div class="meta-post">
      <a v-for="(item, idx) in feed.tags" :key="idx" href="#" class="m-r-10 tags" v-text="item.name"></a>
    </div>
    <!--
    <div class="meta-social">
      <ul class="inline center">
        <li><a href="#" class="twitter-share border-box"><i class="fa fa-twitter fa-lg"></i></a></li>
        <li><a href="#" class="facebook-share border-box"><i class="fa fa-facebook fa-lg"></i></a></li>
        <li><a href="#" class="pinterest-share border-box"><i class="fa fa-pinterest fa-lg"></i></a></li>
      </ul>
    </div>
    -->
    <div class="related clear-after" v-if="feed.refers != null && feed.refers.length != 0">
      <h4>Reference Documents</h4>
      <carousel :autoplay="true" :nav="false" ref="owl">
        <div class="item" v-for="(item, idx) in feed.refers" :key="idx">
          <figure>
            <img v-if="item.image != ''" :src="item.image" :alt="item.title" class="owl-item-image">
            <img v-else src="/img/default_thumbnail.png" :alt="item.title" class="owl-item-image">
          </figure>
          <a class="overlay" :href="item.url" target="_blank">
            <div class="overlay-content">
              <div class="post-type"><i class="icon icon-search"></i></div>
              <h2 v-text="item.title"></h2>
            </div>
          </a>
        </div>
      </carousel>
    </div>

    <div class="comment-section">
      <h3 id="comments"><span v-text="commentCount"></span> Comments</h3>
      <div class="comment-login" v-if="!role">
        <router-link to="/login" tag="a">로그인</router-link> 후 댓글을 작성 할 수 있습니다.
      </div>
      <div id="post-comment" class="clear-after" v-else>
        <form class="comment-form">
          <textarea-autosize
            :placeholder="`${name}님 생각을 적어주세요 !`"
            v-model="contents"
            :min-height="50"
            class="plain buffer"
          ></textarea-autosize>
          <div class="text-right">
            <a class="button transparent blue xs nav-item active m-r-0" @click="writeComment"><i class="mdi mdi-lead-pencil"></i>댓글 작성</a>
          </div>
        </form>
      </div>
      <ul class="comment-list plain">
        <li class="comment" v-for="(item, idx) in comment" :key="idx">
          <div class="single-comment">
            <div class="comment-author">
              <img v-if="item.account.avatar === null || item.account.avatar === ''" src="/img/default_thumbnail.png" class="avatar" :alt="item.account.name">
              <img v-else :src="item.account.avatar" class="avatar" :alt="item.account.name">
              <cite><a v-text="item.account.name"></a></cite>
            </div>
            <div class="comment-meta">
              <time v-text="dateFormat(item.regDate)"></time>
              <span v-if="commentCommand(item.account.email)">
                <a v-if="writerCheck(item.account.email)" class="reply" @click="editComment(item.idx)"><i class="mdi mdi-square-edit-outline"></i></a>
                <a class="reply" @click="deleteComment(item.idx)"><i class="mdi mdi-delete-empty"></i></a>
              </span>
            </div>
            <p v-html="multiLineReplace(item.contents)" :ref="`p${item.idx}`" :class="['comment-p', `p${item.idx}`]"></p>
            <div style="display:none;" :class="['comment-d', `d${item.idx}`]">
              <textarea-autosize
              :placeholder="`${name}님 생각을 적어주세요 !`"
              :value="item.contents"
              :min-height="100"
              :class="['plain', 'buffer', 'full', `t${item.idx}`]"
              />
            <div class="text-right">
              <a class="button transparent blue xs nav-item active m-r-0 m-b-0" @click="updateComment(item.idx)"><i class="mdi mdi-square-edit-outline"></i>수정</a>
              <a class="button transparent xs nav-item active m-r-0 m-b-0" @click="cancleEditComment(item.idx)"><i class="mdi mdi-close"></i>취소</a>
            </div>
          </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import { Viewer } from '@toast-ui/vue-editor'
import { mapGetters } from 'vuex'

import comment from '../api/comment'
import { centerOverlay } from '../assets'

import moment from 'moment'

export default {
  components: {
    carousel,
    Viewer
  },
  metaInfo () {
    return {
      title: this.meta.title,
      meta: [
        { property: 'keywords', content: this.meta.keywords },
        { property: 'description', content: this.description },
        { property: 'author', content: this.meta.url },

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
  props: ['feed', 'idx'],
  data () {
    return {
      contents: '',
      commentCount: 0,
      comment: [],
      meta: {
        title: 'Codepresso | DevLog',
        keywords: '웹개발, 프론트엔드, 백엔드, 개발자 블로그, 포트폴리오',
        description: 'WEB Developer HYUN HO - A place to study solid code like espresso',
        url: 'https://codepresso.net',
        image: 'https://codepresso.net/img/og.png'
      }
    }
  },
  created () {
    this.fetchComment()
    this.setMeta()
  },
  mounted () {
    centerOverlay()
  },
  computed: {
    ...mapGetters('auth', ['role', 'name', 'email'])
  },
  methods: {
    fetchComment () {
      let idx = this.idx
      comment.findAndCountByPk({ idx }).then(res => {
        this.commentCount = res.count
        this.comment = res.rows
      })
    },
    setMeta () {
      this.meta.title = this.feed.title
      this.meta.description = this.feed.description
      this.meta.keywords = (() => {
        let keywords = []
        this.feed.tags.forEach(e => {
          keywords.push(e.name)
        })
        return keywords.toString()
      })()
    },
    writeComment () {
      let { contents } = this
      if (contents === '') {
        this.$swal({ title: '필드 오류', text: '댓글 내용을 입력해주세요.', type: 'error', confirmButtonText: '확인' })
        return
      }
      // if (this.xssCheck(contents)) {
      //   this.$swal({title: '필드 오류', text: '<, >, \', ", & 문자는 허용되지 않습니다.', type: 'error', confirmButtonText: '확인'})
      //   return
      // }
      comment.createOne({ contents, feedIdx: this.idx }).then(res => {
        this.contents = ''
        this.fetchComment()
      })
    },
    xssCheck (data) {
      let rs = false
      if (data.indexOf('<') >= 0) rs = true
      else if (data.indexOf('>') >= 0) rs = true
      else if (data.indexOf('"') >= 0) rs = true
      else if (data.indexOf("'") >= 0) rs = true
      else if (data.indexOf('&') >= 0) rs = true
      else if (data.indexOf('/') >= 0) rs = true

      return rs
    },
    xssClean (data) {
      // eslint-disable-next-line
      return data.replace(/\&/g, '&amp;')
        // eslint-disable-next-line
        .replace(/\</g, '&lt;')
        // eslint-disable-next-line
        .replace(/\>/g, '&gt;')
        // eslint-disable-next-line
        .replace(/\"/g, '&quot;')
        // eslint-disable-next-line
        .replace(/\'/g, '&#x27')
        // eslint-disable-next-line
        .replace(/\//g, '&#x2F')
    },
    multiLineReplace (data) {
      return data.replace(/(\n|\r\n)/g, '<br>')
    },
    commentCommand (writer) {
      let { role, email } = this
      if (role === 'ROLE_ADMIN') return true
      else if (writer === email) return true
      return false
    },
    writerCheck (writer) {
      let { email } = this
      if (writer === email) return true
      else return false
    },
    displayEditMode () {
      document.querySelectorAll('.comment-p').forEach(e => {
        e.style.display = 'inherit'
      })
      document.querySelectorAll('.comment-d').forEach(e => {
        e.style.display = 'none'
      })
    },
    editComment (idx) {
      this.displayEditMode()
      document.querySelector(`.p${idx}`).style.display = 'none'
      document.querySelector(`.d${idx}`).style.display = 'inherit'
    },
    cancleEditComment (idx) {
      this.displayEditMode()
      document.querySelector(`.t${idx}`).value = document.querySelector(`.p${idx}`).innerText
    },
    updateComment (idx) {
      let contents = document.querySelector(`.t${idx}`).value
      comment.updateOne({ idx, contents }).then(res => {
        this.displayEditMode()
        this.fetchComment()
      }).catch(() => {
        this.displayEditMode()
      })
    },
    deleteComment (idx) {
      this.$swal({
        title: '댓글 삭제',
        text: '복구가 불가능합니다. 삭제하시겠습니까?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.value) {
          comment.deleteOne({ idx }).then(res => {
            this.displayEditMode()
            this.fetchComment()
          })
        }
      })
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
    },
    dateFormat (date) {
      return moment(date).format('YYYY. MM. DD HH:mm:ss')
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
.feed-warp .full {
  max-width: 100%;
  width: 100%;
  background-color: rgba(255,255,255,0.15);
  font-size: 0.889em !important;
}
</style>
