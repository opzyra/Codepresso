<template>
  <div class="warp">
    <h2 v-text="slideTitle"></h2>
    <div class="close" @click="closePanel"><i class="mdi mdi-window-close"></i></div>

    <div class="m-t-10"><i class="mdi mdi-image-outline m-r-5"></i>썸네일 지정</div>
    <div class="thumbnail">
      <button class="thumbnail-button" @click="uploadClick"><i class="mdi mdi-upload m-r-5"></i>업로드</button>
      <button class="thumbnail-remove-button" @click="removeThumbnail" v-if="thumbnailProps"><i class="mdi mdi-delete-empty m-r-5"></i>삭제</button>
      <input type="file" name="thumbnail" ref="thumbnail" style="visibility:hidden;" @change="thumbnailUpload">
      <div class="thumbnail-preview">
        <img :src="thumbnailProps">
        <img src="/static/img/default-img.png" v-if="thumbnailProps === null" style="width: 165px;">
      </div>
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
      <button @click="writeTopic" class="write-button"><i class="mdi mdi-lead-pencil m-r-5"></i><span v-text="slideSubmitText"></span></button>
    </div>
  </div>
</template>

<script>
import image from '../api/image'
import topic from '../api/topic'

export default {
  components: {
  },
  props: ['simplemde', 'thumbnail', 'access', 'title', 'contents', 'description', 'feeds'],
  data () {
    return {
      thumbnailProps: null,
      descriptionProps: '',
      accessProps: '',
      slideTitle: '새 토픽 작성하기',
      slideSubmitText: '작성하기'
    }
  },
  created () {
    this.thumbnailProps = this.thumbnail
    this.descriptionProps = this.description
    this.accessProps = this.access
    if (this.$route.params.idx) {
      this.slideTitle = '토픽 수정하기'
      this.slideSubmitText = '수정하기'
    }
  },
  methods: {
    closePanel () {
      this.$emit('closePanel', { thumbnail: this.thumbnailProps, access: this.accessProps, description: this.descriptionProps })
    },
    removeThumbnail () {
      this.thumbnailProps = null
    },
    uploadClick () {
      this.$refs.thumbnail.click()
    },
    thumbnailUpload (event) {
      let files = event.target.files
      if (files.length === 0) return

      let form = new FormData()
      form.append('thumbnail', files[0])

      image.upload('/image/thumbnail', form).then(data => {
        let img = 'https://codepresso.net' + data.path
        this.thumbnailProps = img
      }).catch(() => {
        this.$swal({title: '서버 장애', text: '이미지 업로드에 실패하였습니다.', type: 'error', confirmButtonText: '확인'})
      })
    },
    writeTopic () {
      const { title, contents, thumbnailProps, accessProps, descriptionProps, feeds } = this

      if (title === '') {
        this.$swal({title: '필드 오류', text: '제목을 입력해주세요.', type: 'error', confirmButtonText: '확인'})
        return
      }

      if (contents === '') {
        this.$swal({title: '필드 오류', text: '내용을 입력해주세요.', type: 'error', confirmButtonText: '확인'})
        return
      }

      if (descriptionProps === '') {
        this.$swal({title: '필드 오류', text: '간단 설명을 입력해주세요.', type: 'error', confirmButtonText: '확인'})
        return
      }

      if (!this.$route.params.idx) {
        topic.createOne({ title, contents, thumbnail: thumbnailProps, access: accessProps, description: descriptionProps, feeds })
          .then(res => {
            this.$swal({title: '작성 완료', text: '토픽이 작성되었습니다.', type: 'success', confirmButtonText: '확인'}).then(sres => {
              this.$router.push(`/devlog/topic/${res.idx}`)
            })
          }).catch()
      } else {
        topic.updateOne({ idx: this.$route.params.idx, title, contents, thumbnail: thumbnailProps, access: accessProps, description: descriptionProps, feeds })
          .then(res => {
            this.$swal({title: '수정 완료', text: '토픽이 수정되었습니다.', type: 'success', confirmButtonText: '확인'}).then(sres => {
              this.$router.push(`/devlog/topic/${res.idx}`)
            })
          }).catch()
      }
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
.vue-simple-suggest {
  padding: 0.5rem 0rem;
  position: relative;
}
.vue-simple-suggest .auto-wrapper .auto-input {
  width: 100%;
  margin: 0px;
  max-width: 100%;
  padding: 0px 10px;
  border-radius: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.vue-simple-suggest .suggestions {
  border-radius: 0px;
  border: 1px solid #aaa;
  background-color: #fff;
  opacity: 1;
  z-index: 1000;
  text-indent: 10px;
  width: 100%;
  position: absolute;
}
.suggestions {
  /* It's improtant to have a cpecific pivot point for transition:*/
  opacity: 1;
}

.vue-simple-suggest-enter-active.suggestions,
.vue-simple-suggest-leave-active.suggestions {
  /* Transition length here:*/
  transition: opacity .2s;
}

.vue-simple-suggest-enter.suggestions,
.vue-simple-suggest-leave-to.suggestions {
  /* Transition rule for 'disengaged' element:*/
  opacity: 0;
}
.z-1000 {
  z-index: 1000;
}
.hover {
  background-color: #4158d0;
  color: #fff;
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
