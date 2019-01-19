<template>
  <div class="warp">
    <h2>연관 피드</h2>
    <div class="close" @click="closePanel"><i class="mdi mdi-window-close"></i></div>
    <vue-simple-suggest
    v-model="chosen"
    placeholder="피드를 검색하세요"
    mode="select"
    :controls="controls"
    :list="simpleSuggestionList"
    :styles="autoCompleteStyle"
    :destyled=true
    :filter-by-query="true"
    @select="select"
    >
    </vue-simple-suggest>
    <div class="card-list">
      <div class="card" v-for="(item, idx) in feeds" :key="idx">
        <div class="white-area">
          <div class="post-info">
            <h3><a href="javascript:void(0)" v-text="item.title"></a></h3>
            <div class="date">{{ item.regDate | moment('from', 'now') }}</div>
          </div>
          <button class="remove-button" :class="[feedActive(item) ? 'active' : '']" @click="feedInsert(item, idx)"><i class="mdi mdi-link-variant"></i></button>
          <button class="remove-button" @click="feedRemove(item, idx)"><i class="mdi mdi-delete-empty"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSimpleSuggest from 'vue-simple-suggest'
import feed from '../api/feed'

export default {
  components: {
    VueSimpleSuggest
  },
  created () {
    feed.findAll().then(res => {
      this.queryResult = res
    })
  },
  props: ['feeds', 'simplemde'],
  data () {
    return {
      chosen: '',
      autoCompleteStyle: {
        vueSimpleSuggest: 'position-relative',
        inputWrapper: 'auto-wrapper',
        defaultInput: 'auto-input',
        suggestions: 'position-absolute list-group z-1000',
        suggestItem: 'list-group-item'
      },
      controls: {
        selectionUp: [38],
        selectionDown: [40],
        select: [13],
        hideList: [27],
        autocomplete: [32, 13]
      },
      queryResult: []
    }
  },
  methods: {
    feedRemove (item, idx) {
      this.feeds.splice(idx, 1)
      let mark = this.simplemde.value()
      let tag = '/devlog/feed/' + item.idx
      let markdown = `\\[${item.title}\\]\\(${tag}\\)\n`
      let regx = new RegExp(markdown, 'gi')
      let newMark = mark.replace(regx, '')
      this.simplemde.value(newMark)
    },
    feedInsert (feed, idx) {
      let mark = this.simplemde.value()
      let tag = '/devlog/feed/' + feed.idx

      if (mark.indexOf(tag) === -1) {
        let newMark = mark + `[${feed.title}](${tag})\r\n`
        this.simplemde.value(newMark)
        this.feeds[idx].active = true
      } else {
        let markdown = `\\[${feed.title}\\]\\(${tag}\\)\n`
        let regx = new RegExp(markdown, 'gi')
        let newMark = mark.replace(regx, '')
        this.simplemde.value(newMark)
      }
    },
    feedActive (feed) {
      let mark = this.simplemde.value()
      let tag = '/devlog/feed/' + feed.idx
      let markdown = `[${feed.title}](${tag})`
      if (mark.indexOf(markdown) >= 0) {
        return true
      }
      return false
    },
    simpleSuggestionList () {
      return this.queryResult.map(v => v.title)
    },
    closePanel () {
      this.$emit('closePanel', { feeds: this.feeds })
    },
    select (param) {
      if (param) {
        let feed = this.queryResult.filter(v => v.title === param)[0]
        if (!this.feedCheck(feed)) this.feeds.push(feed)
      }
    },
    feedCheck (feed) {
      let flag = false
      this.feeds.forEach((e, i) => {
        if (e.title === feed.title) {
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

.vue-simple-suggest {
  padding: 1rem 0rem;
  position: relative;
}
.vue-simple-suggest .auto-wrapper .auto-input {
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
  margin-bottom: 0px;
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
.z-1000 {
  z-index: 1000;
}
.hover {
  background-color: #4158d0;
  color: #fff;
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
</style>
