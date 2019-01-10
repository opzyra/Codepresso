<template>
  <div class="warp">
    <h2 v-text="slideTitle"></h2>
    <div class="close" @click="closePanel"><i class="mdi mdi-window-close"></i></div>
    <div class="m-t-10"><i class="mdi mdi-pound m-r-5"></i>태그 설정</div>
    <form @submit.prevent="input">
      <input class="tag-input" placeholder="태그를 입력하세요" v-model="tag">
    </form>
    <div class="tag-list">
      <span class="tag-item" v-for="(item, idx) in tags" :key="idx">
        <div class="name" v-text="item.name"></div>
        <div class="remove-button" @click="removeTag(idx)">
          <i class="mdi mdi-window-close"></i>
        </div>
      </span>
    </div>

    <div class="m-t-10"><i class="mdi mdi-calendar-text m-r-5"></i>간단 설명</div>
    <div class="description">
      <textarea v-model="descriptionProps"></textarea>
    </div>

    <div class="m-t-10">
      <i class="mdi mdi-lock m-r-5"></i><span class="m-r-10">공개 설정</span>
      <toggle-button v-model="accessProps" :value="accessProps" color="#333" :sync="true" :labels="{checked: '전체 공개', unchecked: '나만 보기'}" :width="100" :height="26" :fontSize="14" style="margin-top: -5px;"/>
    </div>

    <div class="m-t-20 write">
      <button @click="writeFeed" class="write-button"><i class="mdi mdi-lead-pencil m-r-5"></i><span v-text="slideSubmitText"></span></button>
    </div>
  </div>
</template>

<script>
import VueSimpleSuggest from 'vue-simple-suggest'
import tag from '../api/tag'
import feed from '../api/feed'

export default {
  components: {
    VueSimpleSuggest
  },
  props: ['simplemde', 'tags', 'description', 'access', 'refers', 'title', 'contents'],
  data () {
    return {
      tag: '',
      descriptionProps: '',
      accessProps: null,
      selected: '',
      slideTitle: '새 피드 작성하기',
      slideSubmitText: '작성하기'
    }
  },
  created () {
    this.descriptionProps = this.description
    this.accessProps = this.access
    if (this.$route.params.idx) {
      this.slideTitle = '피드 수정하기'
      this.slideSubmitText = '수정하기'
    }
  },
  methods: {
    closePanel () {
      this.$emit('closePanel', { tags: this.tags, description: this.descriptionProps, access: this.accessProps })
    },
    removeTag (idx) {
      this.tags.splice(idx, 1)
    },
    input () {
      if (this.tag === '') return
      let keyword = this.tag
      if (!this.tagContainKeyword(keyword)) {
        tag.findOrCreate({ name: keyword }).then(res => {
          this.tag = ''
          this.tags.push(res)
        })
      } else {
        this.tag = ''
        this.$swal({title: '중복 태그', text: '이미 등록된 태그 입니다.', type: 'error', confirmButtonText: '확인'})
      }
    },
    uploadClick () {
      this.$refs.thumbnail.click()
    },
    writeFeed () {
      const { title, contents, accessProps, descriptionProps, tags, refers } = this

      if (title === '') {
        this.$swal({title: '필드 오류', text: '제목을 입력해주세요.', type: 'error', confirmButtonText: '확인'})
        return
      }

      if (contents === '') {
        this.$swal({title: '필드 오류', text: '내용을 입력해주세요.', type: 'error', confirmButtonText: '확인'})
        return
      }

      if (!this.$route.params.idx) {
        feed.createOne({ title, contents, access: accessProps, description: descriptionProps, tags, refers })
          .then(res => {
            this.$swal({title: '작성 완료', text: '피드가 작성되었습니다.', type: 'success', confirmButtonText: '확인'}).then(sres => {
              this.$router.push(`/devlog/feed/${res.idx}`)
            })
          })
      } else {
        feed.updateOne({ idx: this.$route.params.idx, title, contents, access: accessProps, description: descriptionProps, tags, refers })
          .then(res => {
            this.$swal({title: '수정 완료', text: '피드가 수정되었습니다.', type: 'success', confirmButtonText: '확인'}).then(sres => {
              this.$router.push(`/devlog/feed/${res.idx}`)
            })
          })
      }
    },
    tagContainKeyword (keyword) {
      let isContain = false
      if (this.tags.length === 0) return isContain
      this.tags.forEach(e => {
        if (e.name === keyword) isContain = true
      })
      return isContain
    }
  }
}
</script>

<style>
.warp {
  padding: 20px;
}
.warp h2 {
  margin: 0;
  font-weight: 500;
  font-size: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ced4da;
}
.warp .close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 16px;
}
.warp .close:hover {
  color: #4158d0;
  cursor: pointer;
}
.warp .tag-input {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #cde;
  border-radius: 3px;
  color: black;
  background: white;
  outline: none;
  -webkit-transition: all .1s;
  transition: all .1s;
  -webkit-transition-delay: .05s;
  transition-delay: .05s;
  max-width: 100%;
  margin-bottom: 0.5rem;
}

.tag-list .tag-item {
  display: -ms-inline-flexbox;
  display: inline-flex;
  padding: .25rem .75rem;
  margin: .375rem .375rem .375rem 0rem;
  background: #fff;
  border: 1px solid #ced4da;
  color: #343a40;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 1.0625rem;
  cursor: pointer;
}

.tag-list .tag-item:hover {
  border: 1px solid #4158d0;
}

.tag-list .tag-item .name {
  font-size: .875rem;
  font-weight: 500;
}

.tag-list .tag-item .remove-button {
  margin-left: .5rem;
  color: #868e96;
  font-size: .625rem;
}

.thumbnail {
  padding: 1rem 0rem;
}
.thumbnail .thumbnail-button {
  display: -ms-inline-flexbox;
  display: -webkit-inline-box;
  display: inline-flex;
  padding: .25rem .75rem;
  margin: .0rem .375rem .375rem 0rem;
  background: #333;
  border: 1px solid #ced4da;
  color: #fff;
  -ms-flex-align: center;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
}

.thumbnail .thumbnail-remove-button {
  display: -ms-inline-flexbox;
  display: -webkit-inline-box;
  display: inline-flex;
  padding: .25rem .75rem;
  margin: .0rem .375rem .375rem 0rem;
  background: #fff;
  border: 1px solid #ced4da;
  color: #343a40;
  -ms-flex-align: center;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
}

.thumbnail-preview {
  width: 100%;
  margin-top: 10px;
}

.thumbnail-preview img {
  margin: 0 auto;
  border-radius: 25%;
  width: 165px;
}

.description textarea {
  resize: none;
  background: #fff;
  outline: none;
  width: 100%;
  font-size: 1rem;
  padding: .5rem;
}

.write .write-button {
  display: block;
  padding: .5rem 0rem;
  margin: .0rem .375rem .375rem 0rem;
  background: #4158d0;
  border: 1px solid #ced4da;
  color: #fff;
  -ms-flex-align: center;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}
</style>
