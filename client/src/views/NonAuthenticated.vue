<template>
  <div id="notfound">
    <link href="/css/not-found.css" rel="stylesheet" />
    <div class="notfound">
      <div class="notfound-404">
        <h3>Oops! Non Authenticated</h3>
        <h1><span>4</span><span>0</span><span>1</span></h1>
      </div>
      <h2>해당 페이지를 접근할 수 있는 권한이 없습니다.</h2>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo () {
    return {
      title: this.meta.title,
      meta: [
        { property: 'keywords', content: this.meta.keywords },
        { property: 'description', content: this.meta.description },
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
  data () {
    return {
      meta: {
        title: 'Codepresso',
        keywords: '웹개발, 프론트엔드, 백엔드, 개발자 블로그, 포트폴리오',
        description: 'WEB Developer HYUN HO - A place to study solid code like espresso',
        url: 'https://codepresso.net',
        image: 'https://codepresso.net/img/og.png'
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/css/not-found.css';
</style>
