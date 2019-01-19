<template>
  <div class="warp">
    <h2>참고 자료</h2>
    <div class="close" @click="closePanel"><i class="mdi mdi-window-close"></i></div>
    <form @submit.prevent="referInsert" class="m-t-15">
      <input class="ref-input" placeholder="주소를 입력하세요" v-model="url">
    </form>
    <div class="card-list">
      <div class="card" v-for="(item, idx) in refers" :key="idx">
        <div class="white-area">
          <div class="post-info">
            <h3><span v-text="item.title"></span></h3>
            <div class="date"><a v-text="item.url" :href="item.url" target="_blank"></a></div>
          </div>
          <button class="remove-button" @click="referRemove(item, idx)"><i class="mdi mdi-delete-empty"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import refer from '../api/refer'

export default {
  props: ['refers', 'simplemde'],
  data () {
    return {
      url: ''
    }
  },
  methods: {
    referRemove (item, idx) {
      this.refers.splice(idx, 1)
    },
    closePanel () {
      this.$emit('closePanel', { refers: this.refers })
    },
    referInsert () {
      // eslint-disable-next-line
      const regex = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/
      if (this.url === '') {
        this.$swal({ title: '도메인 오류', text: '참고 URL을 입력해주세요.', type: 'error', confirmButtonText: '확인' })
        return
      }

      if (!regex.test(this.url)) {
        this.$swal({ title: '도메인 오류', text: 'URL의 형태가 올바르지 않습니다.', type: 'error', confirmButtonText: '확인' })
        return
      }

      let url = this.url
      refer.findOrCreate({ url }).then(res => {
        if (!this.referCheck(res)) {
          this.refers.push(res)
          this.url = ''
        }
      })
    },
    referCheck (refer) {
      let flag = false
      this.refers.forEach((e, i) => {
        if (e.url === refer.url) {
          flag = true
        }
      })
      return flag
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
.warp .card-list {
  margin-bottom: 2rem;
}
.warp .card-list .card {
  border: 1px solid #dee2e6;
  color: #212529;
}
.warp .white-area {
  padding: 1rem 0.75rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
.warp .white-area .post-info {
  flex: 1 1;
}
.warp .white-area .post-info h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}
.warp .white-area .post-info h3 a {
  text-decoration: none;
}
.warp .white-area .post-info .date {
  color: #495057;
  font-size: .875rem;
  margin-top: .25rem;
}
.warp .white-area .remove-button {
  width: 1.25rem;
  height: 2rem;
  font-size: 1.25rem;
  color: #e9ecef;
  border-radius: 1.5rem;
  border: 2px solid #e9ecef;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;
  background: #ffffff;
  margin-left: 10px;
}
.warp .white-area .remove-button:hover {
  color: #4158d0;
  border: 2px solid #4158d0;
}
.warp .card+.card {
  margin-top: 1.5rem;
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

.warp .ref-input {
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
  margin-bottom: 1.5rem;
}

.white-area .active {
  background-color: #4158d0 !important;
  color: #fff !important;
}
.white-area .active:hover {
  background-color: #4158d0 !important;
  color: #fff !important;
  border: 2px solid #fff !important;
}

</style>
